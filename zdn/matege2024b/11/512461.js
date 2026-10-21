(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let preference = ['base_side_larger', 'base_side_smaller'];
		let smaller = getSelectedPreferenceFromList('512461', preference) === 1;
		let k = sl(15, 40, 5) / 10;
		let h = sl(2, 20) * (smaller ? 4 : k * k);
		let ans = smaller ? h * k * k : h / (k * k);
		let factorText = 'в ' + chislitlx(k, 'раз', '$v');


		let paint1 = function (ct) {
			let edgeColor = om.secondaryBrandColors.iz();
			let colorRand = sl1();
			let waterColor = om.transparentBrandColors[colorRand];
			let waterLineColor = om.primaryBrandColors[colorRand];

			let width = 150;
			let vesselHeight = 140;
			let depth = 65;
			let angle = Math.acos(55 / 65);
			let waterHeight = 70;
			let depthX = depth * angle.cos();
			let depthY = depth * angle.sin();

			ct.save();
			ct.translate(60, 260);
			ct.scale(1, -1);

			ct.drawSection([
				[0, 0],
				[width, 0],
				[width, waterHeight],
				[0, waterHeight],
			], waterColor);

			ct.drawSection([
				[width, 0],
				[width + depthX, depthY - 1],
				[width + depthX, depthY + waterHeight],
				[width, waterHeight],
			], waterColor);

			ct.drawSection([
				[0, waterHeight],
				[width, waterHeight],
				[width + depthX, depthY + waterHeight],
				[depthX, depthY + waterHeight],
			], waterColor);

			ct.drawParallelepiped({
				width: width,
				height: vesselHeight,
				depth: depth,
				angle: angle,
				strokeStyle: edgeColor,
			}, [6, 8, 10], false, [5, 4]);

			ct.strokeStyle = waterLineColor;
			ct.lineWidth = 2;

			ct.drawLine(0, waterHeight, width, waterHeight);
			ct.drawLine(
				width,
				waterHeight,
				width + depthX,
				waterHeight + depthY
			);

			ct.setLineDash([5, 4]);
			ct.drawLine(
				0,
				waterHeight,
				depthX,
				waterHeight + depthY
			);
			ct.drawLine(
				depthX,
				waterHeight + depthY,
				width + depthX,
				waterHeight + depthY
			);
			ct.setLineDash([]);

			let arrowX = width + depthX + 18;

			ct.strokeStyle = edgeColor;
			ct.fillStyle = edgeColor;
			ct.drawArrow(arrowX, depthY + waterHeight,arrowX, depthY);
			ct.drawArrow(arrowX, depthY, arrowX, depthY + waterHeight);

			ct.scale(1, -1);
			ct.font = 'italic 20px serif';
			ct.fillText('h', arrowX + 8, -depthY - waterHeight / 2 + 7);

			ct.restore();
		};

		NAtask.setTask({
			text: 'Вода в сосуде, имеющем форму правильной четырёхугольной призмы, находится на уровне $' + h + '$ см. ' +
				'На каком уровне окажется вода, если её перелить в другой сосуд, имеющий форму правильной четырёхугольной призмы, ' +
				'у которого сторона основания ' + factorText + ' ' + (smaller ? 'меньше' : 'больше') + ', чем у данного? Ответ дайте в сантиметрах.',
			answers: ans,
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//Селена
//https://mathb-ege.sdamgia.ru/test?likes=512461
