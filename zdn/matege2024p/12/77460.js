(function() {
	retryWhileError(function() {
		'use strict';
		let key = "77460";
		let preference1 = ['pow', 'sqrt'];
		let preference2 = ['maximum', 'minimum'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

		let xsqrtx = ['x^(3/2)', 'x sqrt(x)'][rand1];
		let [forbidMinY, forbidMaxY] = [1 - rand2, rand2];
		
		let a = sl(1, 30, 0.5).pm();
		let b = sl(1, 30, 0.5);
		let c = sl(1, 15);
		let d = c + sl(3, 30);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];
		let maxmin = sl1();

		NAtask.setMinimaxFunctionTask({
			expr: '' + a + arr1[maxmin] + b + ' x ' + arr2[maxmin] + xsqrtx,
			leftEnd: '' + c,
			rightEnd: '' + d,
			primaryStep: 1,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
			preference: [preference1, preference2],
		});
	}, 10000);
})();
//77460

