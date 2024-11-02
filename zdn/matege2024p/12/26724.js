(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1,20).pm();
		let key = "26724";

		NAtask.setLocalExtremumTask({
			expr: '(' + sl(1,10) + 'x^2 - ' + a + 'x +' + a + ')e^(x + ' + sl(-30,30) + ')' ,
			authors: ['Николай Авдеев'],
			forbidMinY: usePreference(key, {
				preference: 'maximum',
				preferenceValue: true,
			}, false),
			forbidMaxY: usePreference(key, {
				preference: 'minimum',
				preferenceValue: true,
			}, false),
		});
	}, 20);
})();
//26724
