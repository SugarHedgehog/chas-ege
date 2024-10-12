(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			type: 'derivative',
			boundariesOfGraph: {
				minX: sl(-11,-5),
				maxX: sl(5,10),
				minY: -9,
				maxY: 8,
				stepForX: sl(6,8),
				stepForY: 2,
			},
			questionsF: {
				main: 'point',
				conditions: ['tangent_to_graph'],
				variants: ['abscissa',],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 4,
			numberOfRoots: {min:0, max:1}, 
			numberOfExtremes: {min: 0, max:0}, 
		});
	}, 10000);
})();

//40130 40131 514459 515184 515185 515186 515187 515188 515189 515190 515191 530666
