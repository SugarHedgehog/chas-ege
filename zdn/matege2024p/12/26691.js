(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 3);
		let b = sl(1, 50);
		let c = sl(1, 15);
		let d = b / a + a + sl(1, 10);
		let e = -b / a - a - sl(1, 10);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];
		let maxmin = sl1();
		let key = "26691";

		NAtask.setMinimaxFunctionTask({
			expr: '' + '(' + a + 'x' + arr1[sl1()] + b + ')' + 'e^(' + arr1[maxmin] + 'x' + arr2[sl1()] + c + ')',
			leftEnd: '' + e,
			rightEnd: '' + d,
			primaryStep: 1 / 6,
			forbiddenAnswers: [0,'-0'],
			authors: ['Алендарь Сергей'],
			forbidMinY: usePreference(key, {
				preference: 'maximum',
				preferenceValue: true,
			}, false),
			forbidMaxY: usePreference(key, {
				preference: 'minimum',
				preferenceValue: true,
			}, false),
		});
	}, 10000);
})();
//26691

