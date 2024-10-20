(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict';

		let minX = sl(-11, -5),
			maxX = sl(5, 10),
			minY = -9,
			maxY = 8;

		let stepForX = 4;

		let {
			func, painFunc
		} = createSpline({
			type: 'function',
			minX: minX,
			maxX: maxX,
			minY: minY,
			maxY: maxY,
			stepForX: stepForX,
			stepForY: 1,
			extremumsIsInteger: {
				int: 'yes',
				tolerance: 0.15
			},
			numberOfExtremes: {
				min: 3,
				max: 100
			},
			minimumDifferenceBetweenExtremes: 2,
		});

		let points = [];
		const epsilon = sl(stepForX * 0.1, stepForX * 0.5, 0.1);
		for (let x = minX + epsilon; x <= maxX - epsilon; x += 2) {
			if (Math.abs(painFunc(x)) > 1 && Math.abs(x) > 1 && !isCloseToInteger(x, 0.2)) {
				points.push(x);
			}
		}
		
		genAssert(points.length>3);

		let answer, condition;
		if (0) {
			condition = 'отрицательна';
			answer = findDecreasingIntervals(func, minX, maxX);
		} else {
			condition = 'положительна';
			answer = findIncreasingIntervals(func, minX, maxX);
		}
		answer = answer.flatMap((elem) => findPointsInIntervals(points, elem));

		let xs;
		if (points.length > 5) {
						xs = 'x_1, x_2, x_3, \\dots, x_' + points.length;
					} else {
						xs = points.map((_, index) => 'x_' + (index + 1)).join(', ');
					}

		let paint1 = paintSpline({
			func: painFunc,
			minX: minX,
			maxX: maxX,
			minY: minY,
			maxY: maxY,
			scale: 20,
			lineWidth: 0.07,
			definedOnInterval: false,
			points: points,
			lineDash:[6,2],
			markedPoints: {
				type: 'symbol',
				step: 2,
				fontMarkedPoints: "16px liberation_sans",
				lineWidthMarkedPoints: 0.12,
				numberOfPoints: {
					min: 4,
					max: 4
				},
			}
		});
		NAtask.setTask({
			text: 'На рисунке изображён график некоторой функции $F(x)$ одной из первообразных некоторой функции $f(x)$ и отмечены  '+ chislitlx(points.length, 'точка')+' на оси абсцисс ' +
				': $'+xs+'$. В скольких из этих точек функция $f(x)$ ' + condition + '.',
			answers: answer.length,
			authors: 'Суматохина Александра',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 20000);
})();

//https://ege314.ru/7-proizvodnaya-i-pervoobraznaya-ege/reshenie-1942/
