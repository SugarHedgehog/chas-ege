/**
 * Random placement of buildings into 9 sectors on a 12x16 grid.
 * Grid:
 *  - width: 12 columns
 *  - height: 16 rows
 * Sectors:
 *  - 3 columns of equal width (4 cols each)
 *  - 3 rows with heights [6, 6, 4]
 *
 * Coordinates are in grid cells:
 *  - x in [0..11], y in [0..15], w,h >=1
 * Each returned building includes:
 *  - id, role ("main" | "accessory"), optional groupId (for accessories grouped with "огород")
 *  - name
 *  - rect.areaCells (in cells)
 *  - rect.area (scaled by cellScale^2)
 * Special rules:
 *  - Object named "огород" always fills its sector (ignores margin/min sizes).
 *  - In the sector with "огород", place 1–2 extra accessory objects (from optional pool) inside the same sector.
 *    Accessories do not overlap each other (best-effort).
 * Constraint:
 *  - Sector 7 is banned by default and will not be used for main placements (configurable via bannedSectors).
 */

const OPTIONAL_POOL = ["будка", "клумба", "пруд", "бассейн"];

/**
 * Define 3x3 sectors on the grid.
 * @param {number} gridWidth - total columns (default 12)
 * @param {number} gridHeight - total rows (default 16)
 * @param {number} colsParts - number of equal-width columns of sectors (default 3)
 * @param {number[]} rowsHeights - heights of sector rows (must sum to gridHeight) (default [6,6,4])
 * @returns {Array<{id:number, col:number, row:number, x:number, y:number, w:number, h:number}>}
 */
function defineSectors(
  gridWidth = 12,
  gridHeight = 16,
  colsParts = 3,
  rowsHeights = [6, 6, 4]
) {
  const sumHeights = rowsHeights.reduce((a, b) => a + b, 0);
  if (sumHeights !== gridHeight) {
    throw new Error(
      `rowsHeights must sum to gridHeight. Got sum=${sumHeights}, gridHeight=${gridHeight}`
    );
  }
  if (gridWidth % colsParts !== 0) {
    throw new Error(
      `gridWidth must be divisible by colsParts for equal-width sectors. ${gridWidth} % ${colsParts} != 0`
    );
  }

  const colWidth = gridWidth / colsParts;

  const sectors = [];
  let y0 = 0;
  for (let r = 0; r < rowsHeights.length; r++) {
    const rowHeight = rowsHeights[r];
    let x0 = 0;
    for (let c = 0; c < colsParts; c++) {
      const id = r * colsParts + c;
      sectors.push({
        id,
        col: c,
        row: r,
        x: x0,
        y: y0,
        w: colWidth,
        h: rowHeight,
      });
      x0 += colWidth;
    }
    y0 += rowHeight;
  }
  return sectors;
}

/**
 * Pick k unique random items from an array using a partial Fisher-Yates shuffle.
 * @template T
 * @param {T[]} arr
 * @param {number} k
 * @returns {T[]}
 */
function pickKRandom(arr, k) {
  if (k > arr.length) throw new Error("k cannot be greater than array length");
  const copy = arr.slice();
  for (let i = 0; i < k; i++) {
    const j = i + Math.floor(Math.random() * (copy.length - i));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, k);
}

/**
 * Random integer in [min, max] inclusive.
 * @param {number} min
 * @param {number} max
 */
function randInt(min, max) {
  if (max < min) return min;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Place one building rectangle inside a sector.
 * @param {{x:number,y:number,w:number,h:number}} sector
 * @param {{minW?:number,minH?:number,margin?:number,fillSector?:boolean}} [options]
 * @returns {{x:number,y:number,w:number,h:number}} building rect in grid coordinates
 */
function placeBuildingInSector(sector, options = {}) {
  const { minW = 1, minH = 1, margin = 0, fillSector = false } = options;

  if (fillSector) {
    return { x: sector.x, y: sector.y, w: sector.w, h: sector.h };
  }

  const usableW = Math.max(0, sector.w - 2 * margin);
  const usableH = Math.max(0, sector.h - 2 * margin);

  if (usableW < 1 || usableH < 1) {
    return { x: sector.x, y: sector.y, w: 1, h: 1 };
  }

  const minWidth = Math.min(minW, usableW);
  const minHeight = Math.min(minH, usableH);

  const w = randInt(minWidth, usableW);
  const h = randInt(minHeight, usableH);

  const x = randInt(sector.x + margin, sector.x + sector.w - margin - w);
  const y = randInt(sector.y + margin, sector.y + sector.h - margin - h);

  return { x, y, w, h };
}

/**
 * Axis-aligned rectangle overlap test.
 * @param {{x:number,y:number,w:number,h:number}} a
 * @param {{x:number,y:number,w:number,h:number}} b
 */
function rectsOverlap(a, b) {
  return !(
    a.x + a.w <= b.x ||
    b.x + b.w <= a.x ||
    a.y + a.h <= b.y ||
    b.y + b.h <= a.y
  );
}

/**
 * Place N non-overlapping accessory rectangles within a sector.
 * Best-effort: tries up to `maxAttemptsPerRect` for each rect.
 * @param {{x:number,y:number,w:number,h:number}} sector
 * @param {number} count
 * @param {{minW?:number,minH?:number,margin?:number,maxAttemptsPerRect?:number}} [options]
 * @returns {{x:number,y:number,w:number,h:number}[]}
 */
function placeAccessoryRectsInSector(
  sector,
  count,
  options = {}
) {
  const { minW = 1, minH = 1, margin = 0, maxAttemptsPerRect = 50 } = options;
  const placed = [];

  for (let i = 0; i < count; i++) {
    let attempt = 0;
    let rect = null;
    while (attempt < maxAttemptsPerRect) {
      const candidate = placeBuildingInSector(sector, {
        minW,
        minH,
        margin,
        fillSector: false,
      });

      let overlaps = false;
      for (const p of placed) {
        if (rectsOverlap(candidate, p)) {
          overlaps = true;
          break;
        }
      }
      if (!overlaps) {
        rect = candidate;
        break;
      }
      attempt++;
    }
    // If couldn't find a non-overlapping spot, accept the last candidate (may overlap).
    if (!rect) {
      rect = placeBuildingInSector(sector, { minW, minH, margin, fillSector: false });
    }
    placed.push(rect);
  }

  return placed;
}

/**
 * Build a list of building names.
 * Required: жилой дом, баня, теплица, сарай, огород
 * Plus random picks from: будка, клумба, пруд, бассейн to reach numBuildings.
 * If numBuildings < 5, returns first numBuildings from the required list.
 * If numBuildings > 9, extra names will repeat from the optional pool.
 * @param {number} numBuildings
 * @returns {string[]}
 */
function getBuildingNames(numBuildings) {
  const required = ["жилой дом", "баня", "теплица", "сарай", "огород"];
  const optionalPool = OPTIONAL_POOL;

  if (numBuildings <= required.length) {
    return required.slice(0, numBuildings);
  }

  const needOptional = numBuildings - required.length;

  if (needOptional <= optionalPool.length) {
    const picks = pickKRandom(optionalPool, needOptional);
    return required.concat(picks);
  }

  const all = required.concat(optionalPool);
  const extras = [];
  while (all.length + extras.length < numBuildings) {
    extras.push(optionalPool[Math.floor(Math.random() * optionalPool.length)]);
  }
  return all.concat(extras);
}

/**
 * Choose accessory names for the garden ("огород").
 * Prefers unique picks from OPTIONAL_POOL, avoiding names already used as main names.
 * Falls back to random with repetition if needed.
 * @param {number} count
 * @param {Set<string>} used
 * @returns {string[]}
 */
function getAccessoryNames(count, used = new Set()) {
  const available = OPTIONAL_POOL.filter((n) => !used.has(n));
  const picks = [];
  if (count <= available.length) {
    return pickKRandom(available, count);
  }
  picks.push(...available);
  while (picks.length < count) {
    picks.push(OPTIONAL_POOL[Math.floor(Math.random() * OPTIONAL_POOL.length)]);
  }
  return picks.slice(0, count);
}

/**
 * Generate buildings randomly placed in distinct sectors of the 3x3 layout.
 * Special rules:
 *  - any building with name "огород" fills its sector (full cell)
 *  - and spawns 1..2 accessory objects (from OPTIONAL_POOL) within the same sector
 * Constraint:
 *  - sector 7 cannot be used (unless you override bannedSectors)
 *
 * @param {{
 *   gridWidth?: number,
 *   gridHeight?: number,
 *   colsParts?: number,
 *   rowsHeights?: number[],
 *   numBuildings?: number,
 *   minW?: number,
 *   minH?: number,
 *   margin?: number,
 *   fillSector?: boolean,
 *   cellScale?: number, // scale (price) of one grid cell side in units, e.g. 0.5..2; area uses cellScale^2
 *   buildingNames?: string[], // optional explicit main names; if omitted, generated as per rules above
 *   gardenAccessoryRange?: [number, number], // inclusive min/max count of accessories for "огород" (default [1,2])
 *   accessoryPlacementAttempts?: number, // attempts per accessory to avoid overlaps (default 50)
 *   bannedSectors?: number[] // sectors that cannot be used for main placements (default [7])
 * }} [config]
 * @returns {Array<{
 *   id:string,
 *   role:'main'|'accessory',
 *   groupId?:string,
 *   sectorId:number,
 *   sectorCol:number,
 *   sectorRow:number,
 *   name:string,
 *   rect:{x:number,y:number,w:number,h:number,areaCells:number,area:number}
 * }>}
 */
function generateBuildings(config = {}) {
  const {
    gridWidth = 12,
    gridHeight = 16,
    colsParts = 3,
    rowsHeights = [6, 6, 4],
    numBuildings = 6,
    minW = 1,
    minH = 1,
    margin = 0,
    fillSector = false,
    cellScale = 1, // "цена деления клетки": 1 клетка = cellScale единиц по каждой оси
    buildingNames,
    gardenAccessoryRange = [1, 2],
    accessoryPlacementAttempts = 50,
    bannedSectors = [7],
  } = config;

  if (typeof cellScale !== "number" || !isFinite(cellScale) || cellScale <= 0) {
    throw new Error(`cellScale must be a positive number. Got: ${cellScale}`);
  }

  const sectors = defineSectors(gridWidth, gridHeight, colsParts, rowsHeights);

  // Filter out banned sectors
  const banned = new Set(bannedSectors);
  const availableSectors = sectors.filter((s) => !banned.has(s.id));

  if (numBuildings > availableSectors.length) {
    throw new Error(
      `numBuildings (${numBuildings}) cannot exceed available sectors (${availableSectors.length}) after excluding banned sectors [${[...banned].join(", ")}]`
    );
  }

  const names =
    Array.isArray(buildingNames) && buildingNames.length
      ? buildingNames.slice(0, numBuildings)
      : getBuildingNames(numBuildings);

  const chosenSectors = pickKRandom(availableSectors, numBuildings);
  const shuffledNames = pickKRandom(names, names.length);

  /** @type {ReturnType<typeof generateBuildings>} */
  const result = [];
  let uid = 0;
  const usedMainNames = new Set(shuffledNames);

  for (let i = 0; i < chosenSectors.length; i++) {
    const sector = chosenSectors[i];
    const name = shuffledNames[i] ?? `Здание ${i + 1}`;
    const isGarden = name === "огород";

    const fillThis = fillSector || isGarden;
    const rect = placeBuildingInSector(sector, {
      minW,
      minH,
      margin,
      fillSector: fillThis,
    });

    const areaCells = rect.w * rect.h;
    const area = areaCells * cellScale * cellScale;

    const groupId = isGarden ? `garden:${sector.id}` : undefined;

    // Push the main building
    result.push({
      id: `b${uid++}`,
      role: "main",
      groupId,
      sectorId: sector.id,
      sectorCol: sector.col,
      sectorRow: sector.row,
      name,
      rect: { ...rect, areaCells, area },
    });

    // If garden, spawn accessories within the same sector
    if (isGarden) {
      const [accMin, accMax] = gardenAccessoryRange;
      const count = randInt(Math.min(accMin, accMax), Math.max(accMin, accMax));

      const accessoryNames = getAccessoryNames(count, usedMainNames);

      const accessoryRects = placeAccessoryRectsInSector(sector, count, {
        minW,
        minH,
        margin,
        maxAttemptsPerRect: accessoryPlacementAttempts,
      });

      for (let j = 0; j < count; j++) {
        const accRect = accessoryRects[j];
        const accAreaCells = accRect.w * accRect.h;
        const accArea = accAreaCells * cellScale * cellScale;

        result.push({
          id: `b${uid++}`,
          role: "accessory",
          groupId,
          sectorId: sector.id,
          sectorCol: sector.col,
          sectorRow: sector.row,
          name: accessoryNames[j],
          rect: { ...accRect, areaCells: accAreaCells, area: accArea },
        });
      }
    }
  }

  return result;
}

// CommonJS exports (Node)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    defineSectors,
    placeBuildingInSector,
    generateBuildings,
    getBuildingNames,
  };
}

// Browser globals (optional convenience)
if (typeof window !== "undefined") {
  window.defineSectors = defineSectors;
  window.placeBuildingInSector = placeBuildingInSector;
  window.generateBuildings = generateBuildings;
  window.getBuildingNames = getBuildingNames;
}

// If run directly via Node: print demo output.
if (typeof require !== "undefined" && require.main === module) {
  const buildings = generateBuildings({
    numBuildings: 6,
    minW: 1,
    minH: 1,
    margin: 0,
    fillSector: false,
    cellScale: 1, // try 0.5 .. 2
    gardenAccessoryRange: [1, 2],
    bannedSectors: [7],
  });

  console.log(buildings);
}
