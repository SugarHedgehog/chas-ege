(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		// FB2C42, 578969. Угол 60° фиксирован словесным прототипом.
		let radius = sl(2, 12);
		NAtask.setTask({
			text: 'Для печати на 3D-принтере двухцветного конуса используются три параметра: радиус основания, ' +
				'угол наклона образующей к основанию и точка смены цвета на образующей. ' +
				'В программу введены: радиус $' + radius + '$ см, угол $60^\\circ$, точка смены цвета — середина образующей. ' +
				'На каком расстоянии от вершины конуса будет отмечена точка смены цвета? Ответ дайте в сантиметрах.',
			answers: radius,
			analys: 'Длина образующей равна $l = r/\\cos 60^\\circ = 2r$. ' +
				'Расстояние от вершины до середины образующей равно $l/2 = r = ' + radius + '$ см.',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 320, height: 300,
			paint: function (ct) {
				let x = 160, top = 30, bottom = 255, r = 105, e = 25;
				ct.lineWidth = 2;
				ct.strokeStyle = om.secondaryBrandColors.iz();
				ct.drawLine(x, top, x - r, bottom);
				ct.drawLine(x, top, x + r, bottom);
				ct.drawEllipse(x, bottom, r, e, 0, 0, Math.PI);
				ct.setLineDash([5, 3]);
				ct.drawEllipse(x, bottom, r, e, 0, Math.PI, 2 * Math.PI);
				ct.drawLine(x, top, x, bottom);
				ct.drawLine(x, bottom, x + r, bottom);
				ct.setLineDash([]);
				ct.fillStyle = om.primaryBrandColors.iz();
				ct.drawFilledCircle(x + r / 2, (top + bottom) / 2, 4);
				ct.font = '18px serif';
				ct.fillText('M', x + r / 2 + 10, (top + bottom) / 2);
				ct.fillText('r', x + r / 2, bottom + 22);
				ct.fillText('60°', x + r - 45, bottom - 12);
			},
		});
	}, 1000);
})();
// ФИПИ: FB2C42 (0xFB2C42 = 16460866).
// Аналоги (578969): 578969.
