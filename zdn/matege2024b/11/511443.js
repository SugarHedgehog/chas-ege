(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let preference = ['radius_larger', 'radius_smaller'];
		let smaller = getSelectedPreferenceFromList('511443', preference) === 1;
		let k = sl(15, 40, 5) / 10;
		let h = sl(2, 20) * (smaller ? 4 : k * k);
		let ans = smaller ? h * k * k : h / (k * k);
		let factorText = 'в ' + chislitlx(k, 'раз', '$v');


		let paintCylinder = function (ct) {
			let cx = 120;
			let topY = 50;
			let bottomY = 200;
			let radiusX = 60;
			let radiusY = 15;
			let waterY = 140;

			let edgeColor = om.secondaryBrandColors.iz();
			let liquidColor = om.transparentBrandColors.iz();

			ct.lineWidth = 2;
			ct.strokeStyle = edgeColor;

			// Заливка воды одним контуром, чтобы полупрозрачный цвет
			// нигде не накладывался сам на себя (приём из 514063)
			ct.beginPath();
			ct.moveTo(cx - radiusX, waterY);
			ct.lineTo(cx - radiusX, bottomY);
			ct.ellipse(cx, bottomY, radiusX, radiusY, 0, Math.PI, 0, true);
			ct.lineTo(cx + radiusX, waterY);
			ct.ellipse(cx, waterY, radiusX, radiusY, 0, 0, Math.PI, true);
			ct.closePath();
			ct.fillStyle = liquidColor;
			ct.fill();

			// Верхний эллипс (открытый верх)
			ct.drawEllipse(cx, topY, radiusX, radiusY);

			// Боковые стенки
			ct.drawLine(cx - radiusX, topY, cx - radiusX, bottomY);
			ct.drawLine(cx + radiusX, topY, cx + radiusX, bottomY);

			// Поверхность воды: передняя дуга сплошная, задняя пунктирная
			ct.beginPath();
			ct.ellipse(cx, waterY, radiusX, radiusY, 0, 0, Math.PI);
			ct.stroke();
			ct.setLineDash([5, 3]);
			ct.beginPath();
			ct.ellipse(cx, waterY, radiusX, radiusY, 0, Math.PI, 2 * Math.PI);
			ct.stroke();
			ct.setLineDash([]);

			// Дно: передняя дуга сплошная, задняя пунктирная
			ct.beginPath();
			ct.ellipse(cx, bottomY, radiusX, radiusY, 0, 0, Math.PI);
			ct.stroke();
			ct.setLineDash([5, 3]);
			ct.beginPath();
			ct.ellipse(cx, bottomY, radiusX, radiusY, 0, Math.PI, 2 * Math.PI);
			ct.stroke();
			ct.setLineDash([]);

			// Двунаправленная стрелка с обозначением h: охватывает столб
			// жидкости, т.е. от поверхности воды до дна сосуда
			let arrowX = cx + radiusX + 30;
			ct.strokeStyle = edgeColor;
			ct.drawArrow(arrowX, bottomY, arrowX, waterY);
			ct.drawArrow(arrowX, waterY, arrowX, bottomY);

			// Буква h
			ct.fillStyle = edgeColor;
			ct.font = 'italic 20px serif';
			ct.fillText('h', arrowX + 10, (waterY + bottomY) / 2 + 7);
		};

		NAtask.setTask({
			text: 'Вода в сосуде цилиндрической формы находится на уровне $h = ' + h + '$ см. На каком уровне окажется вода, если её перелить в другой цилиндрический сосуд, у которого радиус основания ' + factorText + ' ' + (smaller ? 'меньше' : 'больше') + ', чем у данного? Ответ дайте в сантиметрах.',
			answers: ans,
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 300,
			paint: paintCylinder,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/problem?id=511443
