    // Параметры сетки
    const GRID_W = 12;
    const GRID_H = 16;
    const ROWS = [6, 6, 4]; // секции по высоте
    const COLS_PARTS = 3;   // секции по ширине (равные)

    // Инициализация canvas с учетом devicePixelRatio для четких линий
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

      // Фон
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, wPx, hPx);

      // Тонкая сетка 12x16
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--grid-color').trim() || '#e0e0e0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= GRID_W; x++) {
        const px = x * cellSize + 0.5; // 0.5 для crisp-линий
        ctx.moveTo(px, 0);
        ctx.lineTo(px, hPx);
      }
      for (let y = 0; y <= GRID_H; y++) {
        const py = y * cellSize + 0.5;
        ctx.moveTo(0, py);
        ctx.lineTo(wPx, py);
      }
      ctx.stroke();

      // Толстые линии для границ секторов
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--sector-color').trim() || '#888';
      ctx.lineWidth = 2;

      // Вертикальные границы (каждые 4 колонки: 0,4,8,12)
      [0, 4, 8, 12].forEach(cx => {
        const px = cx * cellSize + 1; // сдвиг для визуальной ровности
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, hPx);
        ctx.stroke();
      });

      // Горизонтальные границы по [6, 12, 16]
      [0, 6, 12, 16].forEach(ry => {
        const py = ry * cellSize + 1;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(wPx, py);
        ctx.stroke();
      });
    }

    // Подписи секторов: S{id} (rX,cY)
    function drawSectorLabels(ctx, cellSize) {
      const colWidthCells = GRID_W / COLS_PARTS; // 12/3=4
      const rowHeightsCells = ROWS;               // [6,6,4]

      // Настройки шрифта: масштабируем от размера клетки
      const fontPx = Math.max(12, Math.round(cellSize * 0.6));
      ctx.save();
      ctx.font = `600 ${fontPx}px system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const labelFill = getComputedStyle(document.documentElement).getPropertyValue('--label-fill').trim() || '#1a1a1a';
      const labelStroke = getComputedStyle(document.documentElement).getPropertyValue('--label-stroke').trim() || '#ffffff';

      let y0 = 0;
      for (let r = 0; r < rowHeightsCells.length; r++) {
        const hCells = rowHeightsCells[r];
        const cy = (y0 + hCells / 2) * cellSize;

        for (let c = 0; c < COLS_PARTS; c++) {
          const x0 = c * colWidthCells;
          const cx = (x0 + colWidthCells / 2) * cellSize;
          const id = r * COLS_PARTS + c;

          const text = `S${id} (r${r},c${c})`;
          ctx.lineWidth = Math.max(2, Math.round(cellSize * 0.15));
          ctx.strokeStyle = `${labelStroke}`;
          ctx.strokeText(text, cx, cy);
          ctx.fillStyle = `${labelFill}`;
          ctx.fillText(text, cx, cy);
        }

        y0 += hCells;
      }

      ctx.restore();
    }

    function drawBuildings(ctx, buildings, cellSize) {
      const fill = getComputedStyle(document.documentElement).getPropertyValue('--building-fill').trim() || '#4caf50';
      const stroke = getComputedStyle(document.documentElement).getPropertyValue('--building-stroke').trim() || '#2e7d32';

      for (const b of buildings) {
        const { x, y, w, h } = b.rect;
        const px = x * cellSize;
        const py = y * cellSize;
        const pw = w * cellSize;
        const ph = h * cellSize;

        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 2;
        ctx.fillRect(px, py, pw, ph);
        ctx.strokeRect(px + 0.5, py + 0.5, pw - 1, ph - 1);
      }
    }

    function formatOutput(buildings) {
      // Читаемый вывод координат
      return buildings
        .map(b => {
          const s = `sector(r=${b.sectorRow}, c=${b.sectorCol})`;
          const r = b.rect;
          return `${s} -> x:${r.x}, y:${r.y}, w:${r.w}, h:${r.h}`;
        })
        .join('\n');
    }

    function regenerateAndRender() {
      const fillSector = document.getElementById('fillSector').checked;
      const margin = parseInt(document.getElementById('margin').value || '0', 10);
      const minW = parseInt(document.getElementById('minW').value || '1', 10);
      const minH = parseInt(document.getElementById('minH').value || '1', 10);

      // Вызываем generateBuildings из подключенного test.js
      const buildings = window.generateBuildings({
        gridWidth: GRID_W,
        gridHeight: GRID_H,
        colsParts: COLS_PARTS,
        rowsHeights: ROWS,
        numBuildings: 6,
        minW,
        minH,
        margin,
        fillSector
      });

      // Рисуем
      const canvas = document.getElementById('grid');
      const cellSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--cell-size')) || 30;
      const cssW = GRID_W * cellSize;
      const cssH = GRID_H * cellSize;
      const ctx = setupCanvas(canvas, cssW, cssH);

      drawGrid(ctx, cellSize);
      drawBuildings(ctx, buildings, cellSize);
      drawSectorLabels(ctx, cellSize); // подписи поверх зданий для читаемости

      // Вывод координат
      document.getElementById('output').textContent = formatOutput(buildings);
    }

    // Кнопка перегенерации
    document.getElementById('regen').addEventListener('click', regenerateAndRender);
    document.getElementById('fillSector').addEventListener('change', regenerateAndRender);
    document.getElementById('margin').addEventListener('change', regenerateAndRender);
    document.getElementById('minW').addEventListener('change', regenerateAndRender);
    document.getElementById('minH').addEventListener('change', regenerateAndRender);

    // Стартовый рендер
    window.addEventListener('DOMContentLoaded', regenerateAndRender);
