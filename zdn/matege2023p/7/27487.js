(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			type: 'function',
			boundariesOfGraph: {
				minX: sl(-11,-5),
				maxX: sl(5,10),
				minY: -9,
				maxY: 8,
				stepForX: sl(3,4),
				stepForY: 0.3,
			},
			questionsF: {
				main: 'integer_points',
				conditions: ['derivative_is_positive', 'derivative_is_negative'],
				variants: ['sum', 'production', 'number', 'largest', 'smallest'],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 2,
			numberOfRoots: {min:2, max:10}, 
			numberOfExtremes: {min: 2, max:10}, 
			extremumsIsInteger: {
				int: 'no',
				tolerance: 0.2
			},
			/*rootsIsInteger: {
				int: 'yes',
				tolerance: 0.2
			},*/
		});
	}, 10000);
})();
