(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		'use strict'
		let key = '173';
		let preference = ['findABC', 'findABD', 'findCAD'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let letters = om.latbukv.slice(0, 4);
		let circle = new Circle(new Point(0, 0), 180);

		let startAngleA = sl(10, 180).pm();
		let A = circle.pointOnCircle(startAngleA, { angleInDegrees: true });
		let deltaAB = sl(30, 80, 2);

		let startAngleB = startAngleA + deltaAB;
		let B = circle.pointOnCircle(startAngleB, { angleInDegrees: true });
		let deltaBC = slKrome(deltaAB, 30, 80, 2);

		let startAngleC = startAngleB + deltaBC;
		let C = circle.pointOnCircle(startAngleC, { angleInDegrees: true });
		let deltaCD = slKrome([deltaAB, deltaBC], 30, 80, 2);

		let startAngleD = startAngleC + deltaCD;
		let D = circle.pointOnCircle(startAngleD, { angleInDegrees: true });
		let deltaAD = 360 - deltaAB - deltaBC - deltaCD;

		let condition = [{
			name: 'ABC',
			value: 0.5 * (deltaCD + deltaAD)
		}, {
			name: 'ABD',
			value: 0.5 * deltaAD
		}, {
			name: 'CAD',
			value: 0.5 * deltaCD
		}];

		condition.push(condition.splice(rand, 1)[0]);

		let connectionMatrix = [
			[1],
			[1, 1],
			[1, 1, 1]
		];

		let points = [A, B, C, D];

		let paint = function (ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawArc(0, 0, 180, 0, 2 * Math.PI);
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.drawFigure(points, connectionMatrix);
			ctx.drawFilledCircle(0, 0, 3);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			ctx.textAlign = "center";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i > 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: 'Четырёхугольник $' + letters.slice().permuteCyclic(sl(1, 3)).join('') + '$ вписан в окружность. ' +
				'Угол $' + condition[0].name + '$ равен $' + condition[0].value + '^\\circ$, угол $' +
				condition[1].name + '$ равен $' + condition[1].value + '^\\circ$. ' +
				'Найдите угол $' + condition[2].name + '$. Ответ дайте в градусах.',
			answers: condition[2].value,
			preference,
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint,
		});
	}, 1000);
})();
//173
