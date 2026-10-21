(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let pyramid = [
			{ name: 'Хефрена', side: 210, height: 136 },
			{ name: 'Снофру', side: 220, height: 104 },
			{ name: 'Хеопса', side: 230, height: 147 },
		].iz();
		let pyramidName = pyramid.name, A = pyramid.side, H = pyramid.height;
		let scale = sl(1, 10);
		let a = A * scale / 10;
		let ans = H * scale / 10;

		let aStr = String(a).replace('.', ',');

		// Статичная иллюстрация: правильная четырёхугольная пирамида,
		// невидимые рёбра (левое и заднее рёбра основания, заднее боковое) — пунктиром
		let paint1 = function (ct) {
			ct.translate(12, 72);
			ct.scale(20, -20);
			ct.lineWidth = 2 / 20;
			ct.drawRightPyramid4({
				edge: 5,
				height: 5 * H / A,
			}, [1, 3, 6], [5 / 20, 2 / 20]);
		};

		NAtask.setTask({
			text: 'Пирамида ' + pyramidName + ' имеет форму правильной четырёхугольной пирамиды, ' +
				'сторона основания которой равна $' + A + '$ м, а высота — $' + H + '$ м. ' +
				'Сторона основания точной музейной копии этой пирамиды равна $' + aStr + '$ см. ' +
				'Найдите высоту музейной копии. Ответ дайте в сантиметрах.',
			answers: ans,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 220,
			height: 190,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/problem?id=510709
// ФИПИ: 471700; аналоги: F0C5E1, 358BBC, 8F48C7, 0B333A, 20DB77, D58E2A, 2D3EB2, 197E18.
