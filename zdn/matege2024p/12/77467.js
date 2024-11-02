(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1,20);

		let key = "77467";
		let frac = ['x', '(x^2 + ' + a*a + ')'];
		frac = usePreference(key, [{
			preference: 'xfrac',
			preferenceValue: frac.join('/'),
		}, {
			preference: 'fracx',
			preferenceValue: frac.reverse().join('/'),
		}], frac);

		NAtask.setLocalExtremumTask({
			expr: ['-',''].iz() + '(' + frac + ')',
			extremums: [-a, a],
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
	}, 2);
})();
//77467
