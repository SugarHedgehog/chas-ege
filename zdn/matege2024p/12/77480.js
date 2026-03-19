(function() {
	retryWhileError(function() {
		'use strict';
		let key = "77480";
		let preference = ['maximum', 'minimum'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let [forbidMinY, forbidMaxY] = [1 - rand, rand];

		let a = sl(1, 3);
		let b = sl(1, 50);
		let c = sl(1, 15);
		let d = sl(1, 15);
		let e = c + sl(3, 30);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];
		let arr3 = ['-', ''];
		let maxmin = sl1();

		NAtask.setMinimaxFunctionTask({
			expr: '' + '(' + a + 'x^2' + arr1[maxmin] + b + 'x' + arr2[maxmin] + b + ')' +
				'e^(' + arr3[maxmin] + 'x' + [arr1[maxmin] + c, ''].iz() + ')',
			leftEnd: '' + d,
			rightEnd: '' + e,
			primaryStep: 1,
			secondaryStep: 0.01,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
			preference: preference,
		});
	}, 1000);
})();

//77480
