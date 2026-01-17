(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		'use strict';
		let key = '319157';
		let preference = ['areaOfTriangle', 'areaOfTrapezoid'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let letters = latbukv.slice(0, 4).concat('M');
		let randMimus = sl1();

		let par = new Parallelogram({
			lengths: {
				lengthAB: sl(5, 10),
				lengthBC: sl(5, 10)
			},
			angles: {
				angle: {
					angleA: Math.PI / (6) * [-1, 1][randMimus],
				},
			},
		});
		genAssertAlmostInteger(par.area());

		par.addVertexToConnectionMatrix(par.segmentAB.middle(), 'E');
		par.connectVerticesInConnectionMatrix([3, 4]);
		let points = autoScale(par.vertices);

		let paint1 = function (ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, par.connectionMatrix);
			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[4].x, points[4].y, 7, 1);
			ctx.strokeInMiddleOfSegment(points[1].x, points[1].y, points[4].x, points[4].y, 7, 1);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2 || i > 3) && randMimus ? 25 : -5)));
		};

		NAtask.setTask({
			text: 'Площадь параллелограмма $ABCD$ равна $' + par.area().ts() +
				'$. Точка $M$ – середина стороны $AB$. Найдите площадь ',
			questions: [[{
				text: 'треугольника $' + ['A', 'M', 'D'].shuffleJoin() + '$.',
				answers: par.area() * 0.25,
			},
			{
				text: 'трапеции $BCDM$.',
				answers: par.area() * 0.75,
			}][rand]],
			preference: preference,
		});
		NAtask.modifiers.variativeABC(letters); //расставляем случайные буквы
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//https://ege.sdamgia.ru/problem?id=319057
//https://oge.sdamgia.ru/problem?id=349612
//Антипова Татьяна
