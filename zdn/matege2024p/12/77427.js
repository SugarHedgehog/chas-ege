(function() {
	retryWhileError(function() {
		'use strict';

		let key = "77427";
		let linear = [['+', '-'].iz() + sl(1, 100) + 'x ', ''];
		linear = usePreference(key, [{
			preference: 'linear',
			preferenceValue: [['+', '-'].iz() + sl(1, 100) + 'x '],
		}, {
			preference: 'not_linear',
			preferenceValue: [''],
		}], linear);

		NAtask.setLocalExtremumTask({
			expr:
			// TODO: Do something with 1x
				'' /*+ ['',sl(2,4).pm()].iz()*/ + 'x^3 ' + ['+', '-'].iz() + sl(1, 100) + 'x^2 ' + linear.iz() + ['+', '-'].iz() +
				sl(1, 1000),
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
	}, 2000);
})();
//77427
