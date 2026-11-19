(function() {
	retryWhileError(function() {
		'use strict';
		let key = "315835";
		let preference1 = ['linear', 'not_linear'];
		let preference2 = ['maximum', 'minimum'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);
		let [forbidMinY, forbidMaxY] = [1 - rand2, rand2];

		let a = sl(1, 9);
		let b = sl(1, 50);
		let c = sl(1, 100);
		let arr1 = ['+', '-'];
		let linear = [arr1.iz() + c + 'x', ''][rand1];

		NAtask.setMinimaxFunctionTask({
			expr: a + 'x^5' + arr1.iz() + b + 'x^3' + linear,
			leftEnd: '-' + sl(4, 20),
			rightEnd: '' + sl(0, 2).pm(),
			primaryStep: 1,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
			preference: [preference1, preference2],
		});
	}, 10);
})();
//315835

