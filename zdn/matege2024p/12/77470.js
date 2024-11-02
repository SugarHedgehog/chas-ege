(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 14);
		let b = a * a;
		let d = sl(-15, 15);
		let e = d + sl(3, 30);

		let key = "77470";
		let frac = ['x', '(x^2 + ' + b + ')'];
		frac = usePreference(key, [{
			preference: 'xfrac',
			preferenceValue: frac.join('/'),
		}, {
			preference: 'fracx',
			preferenceValue: frac.reverse().join('/'),
		}], frac);

		NAtask.setMinimaxFunctionTask({
			expr: ['','-'].iz() + '('+ frac +')',
			leftEnd: '' + d,
			rightEnd: '' + e,
			primaryStep: 0.1,
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
//77470

