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
 *
 * Roads:
 *  - buildRoadNetwork connects all main buildings via a minimal spanning tree (by Manhattan metric),
 *    routing each edge with BFS on the 12x16 grid while avoiding buildings (both main and accessory).
 *  - generateMap returns both buildings and roads.
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
 *   cellScale?: number,
 *   buildingNames?: string[],
 *   gardenAccessoryRange?: [number, number],
 *   accessoryPlacementAttempts?: number,
 *   bannedSectors?: number[]
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
    cellScale = 1,
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
      const count = randInt(
        Math.min(gardenAccessoryRange[0], gardenAccessoryRange[1]),
        Math.max(gardenAccessoryRange[0], gardenAccessoryRange[1])
      );

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

/* =========================
   Roads and pathfinding
   ========================= */

/**
 * Create a blocked grid (true = blocked) from building rectangles.
 * Blocks cells occupied by any building (main or accessory).
 * @param {number} gridW
 * @param {number} gridH
 * @param {Array<{rect:{x:number,y:number,w:number,h:number}}>} buildings
 */
function makeBlockedGrid(gridW, gridH, buildings) {
  const blocked = Array.from({ length: gridH }, () => Array(gridW).fill(false));
  for (const b of buildings) {
    const { x, y, w, h } = b.rect;
    for (let yy = y; yy < y + h; yy++) {
      for (let xx = x; xx < x + w; xx++) {
        if (yy >= 0 && yy < gridH && xx >= 0 && xx < gridW) {
          blocked[yy][xx] = true;
        }
      }
    }
  }
  return blocked;
}

/**
 * BFS shortest path on grid avoiding blocked cells.
 * Returns array of cells [{x,y},...] from start to goal, inclusive.
 * If no path, returns empty array.
 * @param {{x:number,y:number}} start
 * @param {{x:number,y:number}} goal
 * @param {boolean[][]} blocked
 * @param {number} gridW
 * @param {number} gridH
 */
function bfsPath(start, goal, blocked, gridW, gridH) {
  const key = (x, y) => `${x},${y}`;
  const q = [];
  const visited = new Set();
  const parent = new Map();

  const enqueue = (x, y) => {
    const k = key(x, y);
    if (visited.has(k)) return;
    visited.add(k);
    q.push({ x, y });
  };

  if (
    start.x < 0 || start.x >= gridW || start.y < 0 || start.y >= gridH ||
    goal.x < 0 || goal.x >= gridW || goal.y < 0 || goal.y >= gridH
  ) return [];

  if (blocked[start.y][start.x] || blocked[goal.y][goal.x]) {
    // cannot start or end on blocked
    return [];
  }

  enqueue(start.x, start.y);

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (q.length) {
    const cur = q.shift();
    if (cur.x === goal.x && cur.y === goal.y) {
      // reconstruct
      const path = [];
      let k = key(cur.x, cur.y);
      while (k) {
        const [sx, sy] = k.split(",").map(Number);
        path.push({ x: sx, y: sy });
        k = parent.get(k);
      }
      path.reverse();
      return path;
    }

    for (const [dx, dy] of dirs) {
      const nx = cur.x + dx;
      const ny = cur.y + dy;
      if (nx < 0 || nx >= gridW || ny < 0 || ny >= gridH) continue;
      if (blocked[ny][nx]) continue;
      const nk = key(nx, ny);
      if (!visited.has(nk)) {
        parent.set(nk, key(cur.x, cur.y));
        enqueue(nx, ny);
      }
    }
  }

  return [];
}

/**
 * Find a "gate" cell adjacent to a building rectangle to attach a road.
 * Prefers cells directly outside the rectangle on left/right/top/bottom near center.
 * If all are blocked, searches nearest free via BFS from perimeter-adjacent candidates.
 * @param {{x:number,y:number,w:number,h:number}} rect
 * @param {boolean[][]} blocked
 * @param {number} gridW
 * @param {number} gridH
 * @returns {{x:number,y:number}|null}
 */
function findGateCell(rect, blocked, gridW, gridH) {
  const cx = rect.x + Math.floor(rect.w / 2);
  const cy = rect.y + Math.floor(rect.h / 2);

  // Helper to iterate positions along an edge, from center outward
  function positionsAlongEdge(start, end, fixed, horizontal) {
    const arr = [];
    const mid = horizontal ? cy : cx;
    for (let t = start; t <= end; t++) arr.push(t);
    arr.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
    return arr.map((t) => (horizontal ? { x: fixed, y: t } : { x: t, y: fixed }));
  }

  // Candidate cells just outside each side
  const leftX = rect.x - 1;
  const rightX = rect.x + rect.w;
  const topY = rect.y - 1;
  const bottomY = rect.y + rect.h;

  const candidates = [];

  if (leftX >= 0) {
    candidates.push(
      ...positionsAlongEdge(rect.y, rect.y + rect.h - 1, leftX, true)
    );
  }
  if (rightX < gridW) {
    candidates.push(
      ...positionsAlongEdge(rect.y, rect.y + rect.h - 1, rightX, true)
    );
  }
  if (topY >= 0) {
    candidates.push(
      ...positionsAlongEdge(rect.x, rect.x + rect.w - 1, topY, false)
    );
  }
  if (bottomY < gridH) {
    candidates.push(
      ...positionsAlongEdge(rect.x, rect.x + rect.w - 1, bottomY, false)
    );
  }

  // First, any immediately free candidate
  for (const p of candidates) {
    if (!blocked[p.y][p.x]) return p;
  }

  // Fallback: BFS from candidates to nearest free cell
  const key = (x, y) => `${x},${y}`;
  const q = [];
  const visited = new Set();
  for (const p of candidates) {
    const k = key(p.x, p.y);
    if (!visited.has(k)) {
      visited.add(k);
      q.push(p);
    }
  }
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  while (q.length) {
    const cur = q.shift();
    if (!blocked[cur.y][cur.x]) {
      return cur;
    }
    for (const [dx, dy] of dirs) {
      const nx = cur.x + dx;
      const ny = cur.y + dy;
      if (nx < 0 || nx >= gridW || ny < 0 || ny >= gridH) continue;
      const nk = key(nx, ny);
      if (!visited.has(nk)) {
        visited.add(nk);
        q.push({ x: nx, y: ny });
      }
    }
  }

  return null;
}

/**
 * Build a minimal spanning tree (Prim) over gate points using Manhattan distance.
 * @param {{x:number,y:number}[]} points
 * @returns {Array<[number, number]>} list of undirected edges as index pairs (i,j) into points
 */
function buildMST(points) {
  const n = points.length;
  if (n <= 1) return [];

  const inTree = Array(n).fill(false);
  const dist = Array(n).fill(Infinity);
  const parent = Array(n).fill(-1);

  dist[0] = 0;

  for (let it = 0; it < n; it++) {
    // pick u not in tree with minimal dist
    let u = -1;
    let best = Infinity;
    for (let i = 0; i < n; i++) {
      if (!inTree[i] && dist[i] < best) {
        best = dist[i];
        u = i;
      }
    }
    if (u === -1) break;
    inTree[u] = true;

    // update neighbors
    for (let v = 0; v < n; v++) {
      if (inTree[v]) continue;
      const d =
        Math.abs(points[u].x - points[v].x) +
        Math.abs(points[u].y - points[v].y);
      if (d < dist[v]) {
        dist[v] = d;
        parent[v] = u;
      }
    }
  }

  const edges = [];
  for (let v = 1; v < n; v++) {
    if (parent[v] !== -1) edges.push([v, parent[v]]);
  }
  return edges;
}

/**
 * Connect all main buildings with roads.
 * - Picks a "gate" cell adjacent to each main building.
 * - Builds MST over gates and routes each edge via BFS avoiding buildings.
 * @param {{
 *   buildings: Array<{id:string, role:string, rect:{x:number,y:number,w:number,h:number}}},
 *   gridWidth: number,
 *   gridHeight: number
 * }} params
 * @returns {{
 *   roads: Array<{ from:string, to:string, cells:Array<{x:number,y:number}>, length:number }>,
 *   gates: Record<string, {x:number,y:number}>
 * }}
 */
function buildRoadNetwork({ buildings, gridWidth, gridHeight }) {
  const mains = buildings.filter((b) => b.role === "main");
  const blocked = makeBlockedGrid(gridWidth, gridHeight, buildings);

  // Gates for each main
  const gates = {};
  const gatePoints = [];
  for (const b of mains) {
    const gate = findGateCell(b.rect, blocked, gridWidth, gridHeight);
    if (!gate) {
      // As a last resort, put gate at nearest in-bounds unblocked cell to rect center
      const cx = Math.max(0, Math.min(gridWidth - 1, b.rect.x + Math.floor(b.rect.w / 2)));
      const cy = Math.max(0, Math.min(gridHeight - 1, b.rect.y + Math.floor(b.rect.h / 2)));
      let fallback = null;
      outer: for (let r = 0; r < gridWidth + gridHeight; r++) {
        for (let dx = -r; dx <= r; dx++) {
          const dy = r - Math.abs(dx);
          const candidates = [
            { x: cx + dx, y: cy + dy },
            { x: cx + dx, y: cy - dy },
          ];
          for (const p of candidates) {
            if (p.x >= 0 && p.x < gridWidth && p.y >= 0 && p.y < gridHeight && !blocked[p.y][p.x]) {
              fallback = p;
              break outer;
            }
          }
        }
      }
      if (!fallback) continue;
      gates[b.id] = fallback;
      gatePoints.push(fallback);
    } else {
      gates[b.id] = gate;
      gatePoints.push(gate);
    }
  }

  // Build MST over gate points (keep index mapping to building ids)
  const idByIndex = mains.map((b) => b.id);
  const edgesIdx = buildMST(gatePoints);

  // For each edge, route BFS path
  const roads = [];
  for (const [i, j] of edgesIdx) {
    const fromId = idByIndex[i];
    const toId = idByIndex[j];
    const start = gatePoints[i];
    const goal = gatePoints[j];

    let path = bfsPath(start, goal, blocked, gridWidth, gridHeight);

    // If BFS failed (extremely unlikely), fall back to simple L-shape ignoring obstacles (but still clamped)
    if (!path.length) {
      const intermediate = { x: goal.x, y: start.y };
      const l1 = lineBetween(start, intermediate, gridWidth, gridHeight);
      const l2 = lineBetween(intermediate, goal, gridWidth, gridHeight);
      path = [...l1, ...l2.slice(1)];
    }

    // Mark road cells as passable (they already are), allowing reuse
    roads.push({
      from: fromId,
      to: toId,
      cells: path,
      length: path.length,
    });
  }

  return { roads, gates };
}

/**
 * Returns 4-connected line cells between two points (inclusive).
 * @param {{x:number,y:number}} a
 * @param {{x:number,y:number}} b
 * @param {number} gridW
 * @param {number} gridH
 * @returns {{x:number,y:number}[]}
 */
function lineBetween(a, b, gridW, gridH) {
  const path = [];
  let x = a.x, y = a.y;
  while (x !== b.x) {
    x += x < b.x ? 1 : -1;
    if (x >= 0 && x < gridW && y >= 0 && y < gridH) path.push({ x, y });
  }
  while (y !== b.y) {
    y += y < b.y ? 1 : -1;
    if (x >= 0 && x < gridW && y >= 0 && y < gridH) path.push({ x, y });
  }
  // include start at beginning
  return [{ x: a.x, y: a.y }, ...path];
}

/**
 * High-level helper: generate both buildings and roads connecting all main buildings.
 * @param {Parameters<typeof generateBuildings>[0] & { withRoads?: boolean }} config
 * @returns {{
 *   buildings: ReturnType<typeof generateBuildings>,
 *   roads: Array<{ from:string, to:string, cells:Array<{x:number,y:number}>, length:number }>,
 *   gates: Record<string, {x:number,y:number}>
 * }}
 */
function generateMap(config = {}) {
  const {
    gridWidth = 12,
    gridHeight = 16,
  } = config;

  const buildings = generateBuildings(config);
  const { roads, gates } = buildRoadNetwork({
    buildings,
    gridWidth,
    gridHeight,
  });

  return { buildings, roads, gates };
}

/* =========================
   Exports / Globals / Demo
   ========================= */

// CommonJS exports (Node)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    defineSectors,
    placeBuildingInSector,
    generateBuildings,
    getBuildingNames,
    // Roads:
    buildRoadNetwork,
    generateMap,
  };
}

// Browser globals (optional convenience)
if (typeof window !== "undefined") {
  window.defineSectors = defineSectors;
  window.placeBuildingInSector = placeBuildingInSector;
  window.generateBuildings = generateBuildings;
  window.getBuildingNames = getBuildingNames;
  // Roads:
  window.buildRoadNetwork = buildRoadNetwork;
  window.generateMap = generateMap;
}

// If run directly via Node: print demo output.
if (typeof require !== "undefined" && require.main === module) {
  const { buildings, roads } = generateMap({
    numBuildings: 6,
    minW: 1,
    minH: 1,
    margin: 0,
    fillSector: false,
    cellScale: 1, // try 0.5 .. 2
    gardenAccessoryRange: [1, 2],
    bannedSectors: [7],
  });

  console.log(JSON.stringify({ buildings, roads }, null, 2));
}
