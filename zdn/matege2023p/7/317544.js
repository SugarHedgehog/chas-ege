(function() {
	retryWhileError(function() {
		'use strict';
		let key = '27489';
		let preference1 = ['derivative_is_smallest', 'derivative_is_largest'];
		let preference2 = ['symbol', 'number'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

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
				conditions: [preference1[rand1]],
				variants: ['empty'],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
				font: "16px liberation_sans",
				markedPoints:{
					type: preference2[rand2],
					step: 2,
					fontMarkedPoints: "14px liberation_sans",
					numberOfPoints: {min:4, max:4}
				}
			},
			minimumDifferenceBetweenExtremes: 1,
			numberOfRoots: {min:0, max:0}, 
			numberOfExtremes: {min: 0, max:10}, 
			extremumsIsInteger: {
				int: 'yes',
				tolerance: 0.2
			},
			preference: preference,
		});
	}, 10000);
})();
//317544 318045 318055 318139 318047 318049 318051 318053 318057 318059 
//318061 318063 318065 318067 318069 318071 318073 318075 318077 318079 
//318081 318083 318085 318087 318089 318091 318093 318095 318097 318099 
//318121 318123 318125 318127 318129 318131 318133 318135 318137 318141 318143
