(function() {
	retryWhileError(function() {
		'use strict';
		let key = "26700";
		let preference1 = ['sin', 'cos'];
		let preference2 = ['maximum', 'minimum'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);
		let arr2 = ['sin', 'cos'][rand1];
		let [forbidMinY, forbidMaxY] = [1 - rand2, rand2];

		let a = sl(1, 100, 2);
		let b = sl(4, 100);
		genAssert((b / (Math.PI * a)).abs() > 1);
		let c = sl(1, 50);
		let arr1 = ['+', '-'];

		NAtask.setMinimaxFunctionTask({
			expr: a + arr2 + '(x)' + arr1.iz() + b + 'x/pi' + arr1.iz() + c,
			leftEnd: ['-2pi/3', '-5pi/6'].iz(),
			rightEnd: '0',
			primaryStep: 0.1,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
			preference: [preference1, preference2],
		});
	}, 10000);
})();
//26700
