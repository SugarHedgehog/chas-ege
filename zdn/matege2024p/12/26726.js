(function() {
	retryWhileError(function() {
		'use strict';
		let key = "26726";

		NAtask.setLocalExtremumTask({
			expr:
				'(' + ['x', sl(1,20)].joinPlusMinus() + ')^2 *' +
				'e^(' + ['x', sl(1,20)].joinPlusMinus() + ')',
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
//26726
