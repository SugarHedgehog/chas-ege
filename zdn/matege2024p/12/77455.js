(function() {
	retryWhileError(function() {
		'use strict';
		let key = "77455";
		let xsqrtx = ['x^(3/2)', 'x sqrt(x)'];
		xsqrtx = usePreference(key, [{
			preference: 'pow',
			preferenceValue: ['x^(3/2)'],
		}, {
			preference: 'sqrt',
			preferenceValue: ['x sqrt(x)'],
		}], xsqrtx);

		NAtask.setLocalExtremumTask({
			expr: [
				'' + sl(1, 5) + xsqrtx.iz(),
				sl(1, 20) + 'x',
				sl(0, 100)
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
//77455
