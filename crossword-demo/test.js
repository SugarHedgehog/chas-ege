/**
 * Random placement of 6 buildings into 9 sectors on a 12x16 grid.
 * Grid:
 *  - width: 12 columns
 *  - height: 16 rows
 * Sectors:
 *  - 3 columns of equal width (4 cols each)
 *  - 3 rows with heights [6, 6, 4]
 *
 * Coordinates are in grid cells:
 *  - x in [0..11], y in [0..15], w,h >=1
 */

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
 * Pick k unique random items from an array using Fisher-Yates.
 * @template T
 * @param {T[]} arr
 * @param {number} k
 * @returns {T[]}
 */
function pickKRandom(arr, k) {
  if (k > arr.length) throw new Error("k cannot be greater than array length");
  const copy = arr.slice();
  // Partial Fisher-Yates shuffle for first k elements
  for (let i = 0; i < k; i++) {
    const j = i + Math.floor(Math.random() * (copy.length - i));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, k);
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
    // No space left after margins; fallback to minimum 1x1 at the sector origin
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
 * Generate N buildings randomly placed in distinct sectors of the 3x3 layout.
 * @param {{
 *   gridWidth?: number,
 *   gridHeight?: number,
 *   colsParts?: number,
 *   rowsHeights?: number[],
 *   numBuildings?: number,
 *   minW?: number,
 *   minH?: number,
 *   margin?: number,
 *   fillSector?: boolean
 * }} [config]
 * @returns {Array<{
 *   sectorId:number,
 *   sectorCol:number,
 *   sectorRow:number,
 *   rect:{x:number,y:number,w:number,h:number,area:number}
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
  } = config;

  const sectors = defineSectors(gridWidth, gridHeight, colsParts, rowsHeights);
  if (numBuildings > sectors.length) {
    throw new Error(
      `numBuildings cannot exceed number of sectors (${sectors.length})`
    );
  }

  const chosen = pickKRandom(sectors, numBuildings);
  return chosen.map((sector) => {
    const rect = placeBuildingInSector(sector, { minW, minH, margin, fillSector });
    const area = rect.w * rect.h;
    return {
      sectorId: sector.id,
      sectorCol: sector.col,
      sectorRow: sector.row,
      rect: { ...rect, area },
    };
  });
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

// CommonJS exports (optional, in case you want to import these in other files)
if (typeof module !== "undefined") {
  module.exports = {
    defineSectors,
    placeBuildingInSector,
    generateBuildings,
  };
}

// If run directly: print demo output.
if (typeof require !== "undefined" && require.main === module) {
  const buildings = generateBuildings({
    numBuildings: 6,
    minW: 1,
    minH: 1,
    margin: 0, // set >0 to keep padding from sector borders
    fillSector: false, // set to true if building must occupy the whole sector
  });

  console.log(buildings);
}

// Example usage (uncomment to test):
const buildings = generateBuildings({
    numBuildings: 6,
    minW: 1,
    minH: 1,
    margin: 0,       // set >0 to keep padding from sector borders
    fillSector: false // set to true if building must occupy the whole sector
});

console.log(buildings);
