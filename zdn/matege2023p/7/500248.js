(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			definedOnInterval: false,
			type: 'function',
			boundariesOfGraph: {
				minX: sl(-11,-5),
				maxX: sl(5,10),
				minY: -9,
				maxY: 8,
				stepForX: 4,
				stepForY: 0.3,
			},
			questionsF: {
				main: 'marked_points',
				conditions: ['derivative_is_negativeg', 'derivative_is_positive'],
				variants: ['number'],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
				font: "16px liberation_sans",
				markedPoints:{
					type: 'symbol',/*['symbol', 'number'].iz()*/
					step: 2,
					fontMarkedPoints: "16px liberation_sans",
					numberOfPoints: {min:4, max:10}
				}
			},
			minimumDifferenceBetweenExtremes: 1,
			numberOfRoots: {min:0, max:0}, 
			numberOfExtremes: {min: 0, max:10}, 
			extremumsIsInteger: {
				int: 'yes',
				tolerance: 0.2
			},
		});
	}, 10000);
})();
//500248
//Демонстрационный вариант ФИПИ
