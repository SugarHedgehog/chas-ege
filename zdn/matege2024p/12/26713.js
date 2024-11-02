(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1,20).pm();
		let key = "26713";

		NAtask.setLocalExtremumTask({
			expr:
				'(' + ['x', a].joinPlusMinus() + ') *' +
				'e^(' + ['x', a].joinPlusMinus() + ')',
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
//26713
