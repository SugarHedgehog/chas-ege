(function() {
	retryWhileError(function() {
			NAinfo.requireApiVersion(0, 2);
			let prism = new RectangularPrismWithRightAngledTriangleAtBase({
				height: sl(1, 50),
				sideA: sl(1, 50),
				sideB: sl(1, 50)
			});

			let cyl = new Cylinder({
				radius: 0.5 * prism.sideC,
				height: prism.height
			});

			let rand = sl1();

			let paint1 = function(ctx) {
				let h = 400;
				let w = 400;

				ctx.scale = (60, 60);
				radius = 180;
				height = 300;
<<<<<<< HEAD
				ctx.translate(w / 2, h / 2);
				ctx.lineWidth = 2;
				ctx.strokeStyle = om.secondaryBrandColors;
=======
				ct.translate(200, 200);
				ct.lineWidth = 2;
				ct.strokeStyle = "#809DF2";

>>>>>>> 131829577 ([zdn] [fix] - more color)

				//цилиндр
				ctx.drawEllipse(0, -height / 2, radius, 40, 0, 0, 2 * Math.PI, true);
				ctx.drawEllipse(0, height / 2, radius, 40, 0, 0, Math.PI);

<<<<<<< HEAD
				ctx.setLineDash([4, 4]);
				ctx.drawEllipse(0, height / 2, radius, 40, 0, Math.PI, 2 * Math.PI);
=======
				ct.beginPath();
				ct.ellipse(0, height / 2, radius, 40, 0, 0, Math.PI);
				ct.stroke();

				ct.setLineDash([4, 4]);
				ct.beginPath();
				ct.ellipse(0, height / 2, radius, 40, 0, Math.PI, 2 * Math.PI);
				ct.stroke();
				ct.setLineDash([]);
>>>>>>> 131829577 ([zdn] [fix] - more color)

				ctx.setLineDash([]);
				//призма
<<<<<<< HEAD
				ctx.strokeStyle = om.primaryBrandColors.iz();
=======
				ct.strokeStyle = ["#D777F2", "#F2A2D6"].iz();

				ct.beginPath();
				ct.moveTo(-radius, -150);

>>>>>>> 131829577 ([zdn] [fix] - more color)
				//треугольник сверху
				ctx.drawLine(-radius, -153, 90, -116);
				ctx.drawLine(90, -116, radius, -153);
				ctx.drawLine(radius, -153, -radius, -153);

				//высота
				ctx.drawLine(90, -116, 90, height - 116);
				ctx.drawLine(-radius, -153, -radius, height - 153);
				ctx.drawLine(radius, -height / 2, radius, height / 2);

				//треугольник снизу
<<<<<<< HEAD
				ctx.setLineDash([4, 5]);
				ctx.drawLine(-radius, height - 153, 90, height - 116);
				ctx.drawLine(90, height - 116, radius, height - 153);
				ctx.drawLine(radius, height - 153, -radius, height - 153);
=======
				ct.setLineDash([4, 5]);
				ct.lineTo(90, height - 116);
				ct.lineTo(150, height - radius + 10);
				ct.lineTo(-radius, height - 150);
				ct.stroke();

				//высоты призмы
				ct.drawLine(150, height - radius + 10, 150, -radius + 10);
				ct.setLineDash([]);
				ct.drawLine(90, height - 116, 90, -116);

				//правая высота цилиндра
				ct.strokeStyle = "#809DF2";
				ct.moveTo(radius, 150);
				ct.lineTo(radius, -height + 150);
				ct.stroke();

>>>>>>> 131829577 ([zdn] [fix] - more color)
			};
			NAtask.setTask({
				text: 'В основании прямой призмы лежит прямоугольный треугольник с катетами $' + prism.sideA + '$ и $' + prism.sideB +
					'$. ' +
					'Боковые рёбра призмы равны $' + prism.height + '$. ' +
					'Найдите ',
				questions: [
					[{
						text: 'объём',
						answers: cyl.volume
					}, {
						text: 'площадь боковой поверхности',
						answers: cyl.sideSurfaceArea
					}, ][rand]
				],
				postquestion: ' цилиндра, описанного около этой призмы.',
			});
			NAtask.modifiers.multiplyAnswerByPI();
			NAtask.modifiers.allDecimalsToStandard(true);
			NAtask.modifiers.assertSaneDecimals();
			NAtask.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		},
		1000);

})();
//27049 4963 4965 4967 4969 72205 72207 72209 72211 72213 72215 72217 72219 72221 72223 72225 72227 72229 72231 72233 72235 72237 72239 72241 72243 72245 72247 72249 72251 72253
