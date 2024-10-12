(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			type: 'derivative',
			boundariesOfGraph: {
				minX: sl(-5,-0),
				maxX: sl(2,5),
				minY: -9,
				maxY: 8,
				stepForX: 4,
				stepForY: 1,
			},
			questionsF: {
				main: 'point',
				conditions: ['tangent_to_graph_const'],
				variants: ['abscissa',],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 1,
			numberOfRoots: {min:0, max:10}, 
			numberOfExtremes: {min: 0, max:1}, 
		});
	}, 10000);
})();

//40130 40131 514459 515184 515185 515186 515187 515188 515189 515190 515191 530666
