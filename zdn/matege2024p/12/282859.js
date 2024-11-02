(function() {
	retryWhileError(function() {
		'use strict';
		let forbidMinY = false;
		let forbidMaxY = false;
		let key = "282859";

		NAtask.setLocalExtremumTask({
			expr:
				'(' + ['x', sl(1,20)].joinPlusMinus() + ')^2 ' +
				'(' + ['x', sl(1,20)].joinPlusMinus() + ') + ' +
				sl(0,20).pm(),
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
//282859
