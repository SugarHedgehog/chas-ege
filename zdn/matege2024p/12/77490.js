(function() {
	retryWhileError(function() {
		'use strict';
		let key = "77490";
		NAtask.setLocalExtremumTask({
			expr: [
				'' + sl(0.5,4,0.5).pm() + 'x^2',
				'' +  sl(1,30).pm() + 'x',
				'' +  sl(1,30).pm() + 'ln(x)',
				'' +  sl(1,30).pm(),
			].joinPlusMinus(),
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
	}, 200);
})();
//77490
