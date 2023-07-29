(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let angle = sl(2, 35);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;

			ctx.drawLine(10, 300, 390, 300);
			ctx.drawLine(10, 300, 150, 100);
			ctx.drawLine(150, 100, 390, 300);
			ctx.drawLine(150, 100, 390 / 2.2, 300);
			ctx.drawLine(150, 100, 150, 300);

			//прямой угол
			ctx.lineWidth = 1.2;
			ctx.drawLine(150 - 20, 300, 150 - 20, 300 - 20);
			ctx.drawLine(150, 300 - 20, 150 - 20, 300 - 20);

			ctx.beginPath();
			ctx.arc(150, 100, 50, 0.45 * Math.PI, 0.69 * Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(150, 100, 40, 0.22 * Math.PI, 0.45 * Math.PI);

			ctx.stroke();

		};

		NAtask.setTask({
			text: 'В прямоугольном треугольнике угол между высотой и биссектрисой, ' +
				'проведёнными из вершины прямого угла, равен $' + angle + '^{\\circ}$. ' +
				'Найдите меньший угол прямоугольного треугольника. Ответ дайте в градусах.',
			answers: 45 - angle,
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
