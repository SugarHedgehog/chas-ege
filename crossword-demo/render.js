/**
 * Render script for index.html:
 * - draws grid, sector labels, buildings
 * - builds and draws roads connecting all main buildings
 * Relies on functions exposed by test.js:
 *   - Prefer window.generateMap(); fallback to window.generateBuildings() + window.buildRoadNetwork()
 */

(function () {
  // Grid definition
  const GRID_W = 12;
  const GRID_H = 16;
  const ROWS = [6, 6, 4];
  const COLS_PARTS = 3;

  // UI bindings once DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    const btnRegen = document.getElementById('regen');
    const chkFillSector = document.getElementById('fillSector');
    const inputMargin = document.getElementById('margin');
    const inputMinW = document.getElementById('minW');
    const inputMinH = document.getElementById('minH');

    const onChange = () => regenerateAndRender();
    btnRegen.addEventListener('click', onChange);
    chkFillSector.addEventListener('change', onChange);
    inputMargin.addEventListener('change', onChange);
    inputMinW.addEventListener('change', onChange);
    inputMinH.addEventListener('change', onChange);

    regenerateAndRender();
  });

  function getCellSize() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--cell-size').trim();
    const v = parseInt(raw, 10);
    return Number.isFinite(v) && v > 0 ? v : 30;
  }

  // HiDPI setup
  function setupCanvas(canvas, cssWidth, cssHeight) {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.style.width = cssWidth + 'px';
    canvas.style.height = cssHeight + 'px';
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }

  function drawGrid(ctx, cellSize) {
    const wPx = GRID_W * cellSize;
    const hPx = GRID_H * cellSize;

    ctx.clearRect(0, 0, wPx, hPx);

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, wPx, hPx);

    // Thin grid
    const gridColor = css('--grid-color', '#e0e0e0');
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= GRID_W; x++) {
      const px = x * cellSize + 0.5;
      ctx.moveTo(px, 0);
      ctx.lineTo(px, hPx);
    }
    for (let y = 0; y <= GRID_H; y++) {
      const py = y * cellSize + 0.5;
      ctx.moveTo(0, py);
      ctx.lineTo(wPx, py);
    }
    ctx.stroke();

    // Sector boundaries
    const sectorColor = css('--sector-color', '#888');
    ctx.strokeStyle = sectorColor;
    ctx.lineWidth = 2;

    // Vertical boundaries: 0,4,8,12
    [0, 4, 8, 12].forEach(cx => {
      const px = cx * cellSize + 1;
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, hPx);
      ctx.stroke();
    });

    // Horizontal boundaries: 0,6,12,16
    [0, 6, 12, 16].forEach(ry => {
      const py = ry * cellSize + 1;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(wPx, py);
      ctx.stroke();
    });
  }

  function drawSectorLabels(ctx, cellSize) {
    const colWidthCells = GRID_W / COLS_PARTS; // 4
    const labelFill = css('--label-fill', '#1a1a1a');
    const labelStroke = css('--label-stroke', '#ffffff');

    const fontPx = Math.max(12, Math.round(cellSize * 0.6));
    ctx.save();
    ctx.font = `600 ${fontPx}px system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let y0 = 0;
    for (let r = 0; r < ROWS.length; r++) {
      const hCells = ROWS[r];
      const cy = (y0 + hCells / 2) * cellSize;
      for (let c = 0; c < COLS_PARTS; c++) {
        const x0 = c * colWidthCells;
        const cx = (x0 + colWidthCells / 2) * cellSize;
        const id = r * COLS_PARTS + c;
        const text = `S${id} (r${r},c${c})`;
        ctx.lineWidth = Math.max(2, Math.round(cellSize * 0.15));
        ctx.strokeStyle = labelStroke;
        ctx.strokeText(text, cx, cy);
        ctx.fillStyle = labelFill;
        ctx.fillText(text, cx, cy);
      }
      y0 += hCells;
    }

    ctx.restore();
  }

  function drawBuildings(ctx, buildings, cellSize) {
    const fill = css('--building-fill', '#4caf50');
    const stroke = css('--building-stroke', '#2e7d32');

    for (const b of buildings) {
      const { x, y, w, h } = b.rect;
      const px = x * cellSize;
      const py = y * cellSize;
      const pw = w * cellSize;
      const ph = h * cellSize;

      // Color tweak for roles
      const roleFill = b.role === 'accessory' ? withAlpha(fill, 0.7) : fill;

      ctx.fillStyle = roleFill;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 2;
      ctx.fillRect(px, py, pw, ph);
      ctx.strokeRect(px + 0.5, py + 0.5, pw - 1, ph - 1);

      // Optional: draw name centered on main buildings
      if (b.role === 'main') {
        ctx.save();
        ctx.fillStyle = '#000';
        ctx.font = `bold ${Math.max(10, Math.round(cellSize * 0.4))}px system-ui, -apple-system, Segoe UI`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.name, px + pw / 2, py + ph / 2);
        ctx.restore();
      }
    }
  }

  function drawRoads(ctx, roads, gates, cellSize) {
    if (!roads || !roads.length) return;

    const roadColor = '#6d4c41'; // brown-ish
    const roadWidth = Math.max(2, Math.round(cellSize * 0.25));
    const gateColor = '#ff6d00';

    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = roadColor;
    ctx.lineWidth = roadWidth;

    for (const r of roads) {
      const pts = r.cells;
      if (!pts || pts.length === 0) continue;

      ctx.beginPath();
      for (let i = 0; i < pts.length; i++) {
        const cx = pts[i].x * cellSize + cellSize / 2;
        const cy = pts[i].y * cellSize + cellSize / 2;
        if (i === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }

    // Draw gates as small dots
    if (gates) {
      ctx.fillStyle = gateColor;
      const r = Math.max(2, Math.round(cellSize * 0.18));
      for (const id in gates) {
        const g = gates[id];
        const gx = g.x * cellSize + cellSize / 2;
        const gy = g.y * cellSize + cellSize / 2;
        ctx.beginPath();
        ctx.arc(gx, gy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  function formatOutput(buildings, roads) {
    const lines = [];
    lines.push('Main buildings:');
    for (const b of buildings.filter(x => x.role === 'main')) {
      const r = b.rect;
      lines.push(`- ${b.name} [S${b.sectorId} r${b.sectorRow} c${b.sectorCol}] x:${r.x} y:${r.y} w:${r.w} h:${r.h} area:${r.area}`);
    }
    if (roads && roads.length) {
      lines.push('');
      lines.push('Roads:');
      for (const rd of roads) {
        lines.push(`- ${rd.from} -> ${rd.to}, len=${rd.length}`);
      }
    }
    return lines.join('\n');
  }

  function regenerateAndRender() {
    const fillSector = document.getElementById('fillSector').checked;
    const margin = parseInt(document.getElementById('margin').value || '0', 10);
    const minW = parseInt(document.getElementById('minW').value || '1', 10);
    const minH = parseInt(document.getElementById('minH').value || '1', 10);

    // Prefer generateMap if available
    let buildings = [];
    let roads = [];
    let gates = {};

    if (typeof window.generateMap === 'function') {
      const { buildings: b, roads: r, gates: g } = window.generateMap({
        gridWidth: GRID_W,
        gridHeight: GRID_H,
        colsParts: COLS_PARTS,
        rowsHeights: ROWS,
        numBuildings: 6,
        minW,
        minH,
        margin,
        fillSector,
        cellScale: 1,
        gardenAccessoryRange: [1, 2],
        bannedSectors: [7],
      });
      buildings = b;
      roads = r;
      gates = g || {};
    } else {
      // Fallback to generateBuildings + buildRoadNetwork
      if (typeof window.generateBuildings !== 'function') {
        console.error('generateMap or generateBuildings is required from test.js');
        return;
      }
      buildings = window.generateBuildings({
        gridWidth: GRID_W,
        gridHeight: GRID_H,
        colsParts: COLS_PARTS,
        rowsHeights: ROWS,
        numBuildings: 6,
        minW,
        minH,
        margin,
        fillSector,
        cellScale: 1,
        gardenAccessoryRange: [1, 2],
        bannedSectors: [7],
      });

      if (typeof window.buildRoadNetwork === 'function') {
        const res = window.buildRoadNetwork({
          buildings,
          gridWidth: GRID_W,
          gridHeight: GRID_H,
        });
        roads = res.roads;
        gates = res.gates || {};
      } else {
        // No roads support available
        roads = [];
      }
    }

    // Draw
    const canvas = document.getElementById('grid');
    const cellSize = getCellSize();
    const cssW = GRID_W * cellSize;
    const cssH = GRID_H * cellSize;
    const ctx = setupCanvas(canvas, cssW, cssH);

    drawGrid(ctx, cellSize);
    drawRoads(ctx, roads, gates, cellSize);
    drawBuildings(ctx, buildings, cellSize);
    drawSectorLabels(ctx, cellSize);

    // Output
    const output = document.getElementById('output');
    output.textContent = formatOutput(buildings, roads);
  }

  function css(varName, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return v || fallback;
  }

  function withAlpha(hex, alpha) {
    // Accept #rrggbb
    if (!/^#([0-9a-f]{6})$/i.test(hex)) return hex;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
})();
