(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '5541';
		let preference = ['angleInTriangle', 'angleBetweenHightAndBisector'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let angle = sl(2, 35);
		let condition = [['больший острый', 45 + angle], ['меньший', 45 - angle]].iz();

		let paint1 = function (ctx) {
			ctx.lineWidth = om.primaryLineWidth;

			let angle = Math.PI / 2.9;

			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawLine(10, 250, 390 - 8, 250);
			let ver = ctx.drawLineAtAngle(10, 250, -angle, 200 - 25);
			ctx.drawLineAtAngle(ver.x, ver.y, -angle + Math.PI / 2, 350 - 20);
			//биссектриса
			ctx.strokeStyle = om.primaryBrandColors[0];
			let bis = ctx.drawLineAtAngle(ver.x, ver.y, (-angle + Math.PI / 2) + Math.PI / 4, 160 + 2);
			//высота
			ctx.strokeStyle = om.primaryBrandColors[1];
			ctx.drawLine(ver.x, ver.y, ver.x, 250);
			//угол
			ctx.drawLine(ver.x, 250 - 20, ver.x + 20, 250 - 20);
			ctx.drawLine(ver.x + 20, 250 - 20, ver.x + 20, 250);

			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.arcBetweenSegments([10, 250, ver.x, ver.y, bis.x, bis.y], 30);
			ctx.arcBetweenSegments([390 - 8, 250, ver.x, ver.y, bis.x, bis.y], 38);

		};

		NAtask.setTask({
			questions: [[{
				text: 'В прямоугольном треугольнике угол между высотой и биссектрисой, ' +
					'проведёнными из вершины прямого угла, равен $' + angle + '^{\\circ}$. ' +
					'Найдите ' + condition[0] + ' угол прямоугольного треугольника.',
				answers: condition[1],
			}, {
				text: condition[0].toZagl() + ' угол прямоугольного треугольника равен $' + condition[1] + '^{\\circ}$. ' +
					'Найдите величину угла между высотой и биссектрисой, проведёнными из вершины прямого угла.',
				answers: angle,
			}][rand]],
			postquestion: ' Ответ дайте в градусах.',
			preference,
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//5541
