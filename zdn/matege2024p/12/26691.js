(function() {
	retryWhileError(function() {
		'use strict';
		let key = '26691';
		let preference1 = ['exp', 'cExp'];
		let preference2 = ['positive_pow', 'negative_pow'];
		let preference3 = ['maximum', 'minimum'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);
		let rand3 = getSelectedPreferenceFromList(key, preference3);
		let v = [1, sl(2,10)][rand1];
		let sign = [v, -v][rand2];
		let [forbidMinY, forbidMaxY] = [1 - rand3, rand3];
		
		let a = sl(1, 3);
		let b = sl(1, 50);
		let c = sl(1, 15);
		let d = b / a + a + sl(1, 10);
		let e = -b / a - a - sl(1, 10);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];

		NAtask.setMinimaxFunctionTask({
			expr: '' + '(' + a + 'x' + arr1.iz() + b + ')' + 'e^(' + sign + 'x' + arr2.iz() + c + ')',
			leftEnd: '' + e,
			rightEnd: '' + d,
			primaryStep: 1 / 6,
			forbiddenAnswers: [0,'-0'],
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
			preference: [preference1, preference2, preference3],
		});
	}, 10000);
})();
//26691

