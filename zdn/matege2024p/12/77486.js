(function() {
	retryWhileError(function() {
		'use strict';
		let key = "77486";

		let pow = sl(2,30);
		pow = usePreference(key, [{
			preference: 'positive_pow',
			preferenceValue: pow,
		}, {
			preference: 'negative_pow',
			preferenceValue: -pow,
		}], pow.pm());

		NAtask.setLocalExtremumTask({
			expr: [
				'' + sl(1,30).pm() + 'x',
				'ln((x +' + sl(1,30).pm() +')^' + pow + ')',
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
//77486
