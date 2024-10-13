(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict';

		let minX = sl(-11, -5),
			maxX = sl(5, 10),
			minY = -9,
			maxY = 8;

		let stepForX = 4;
		let subSegment = getRandomSubSegment(minX + 1, maxX - 1, stepForX);

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
				min: 5,
				max: 100
			},
			minimumDifferenceBetweenExtremes: 4,
		});

		let paint1 = paintSpline({
			func: painFunc,
			minX: minX,
			maxX: maxX,
			minY: minY,
			maxY: maxY,
			scale: 20,
			lineWidth: 0.07,
		});
		NAtask.setTask({
			text: 'На рисунке изображён график $y = F (x )$ одной из первообразных некоторой функции ' +
				'$f (x )$, определённой на интервале $('+minX+';'+maxX+')$. ' +
				'Пользуясь рисунком, определите количество целочисленных решений уравнения $f (x)= 0$ на отрезке $[' +
				subSegment[0] + ';' + subSegment[1] + ']$.',
			answers: extremumsX(func, subSegment[0] - stepForX * 0.1, subSegment[1] + stepForX * 0.1).length,
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

//323077: 323081 323083 323171 323173 323175 323177 323179 509572 509919 523988 524015 548505 559595 323085 323087 323089 323091 323093 323095 323097 323099 323101 323103 323105 323107 323109 323111 323113 323115 323117 323119 323121 323123 323125 323127 323129 323131 323133 323135 323137 323139 323141 323143 323145 323147 323149 323151 323153 323155 323157 323159 323161 323163 323165 323167 323169 323181
