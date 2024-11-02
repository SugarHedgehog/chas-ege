(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 30, 0.5).pm();
		let b = sl(1, 30, 0.5);
		let c = sl(1, 15);
		let d = c + sl(3, 30);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];
		let maxmin = sl1();

		let key = "77460";
		let xsqrtx = ['x^(3/2)', 'x sqrt(x)'];
		xsqrtx = usePreference(key, [{
			preference: 'pow',
			preferenceValue: ['x^(3/2)'],
		}, {
			preference: 'sqrt',
			preferenceValue: ['x sqrt(x)'],
		}], xsqrtx);

		NAtask.setMinimaxFunctionTask({
			expr: '' + a + arr1[maxmin] + b + ' x ' + arr2[maxmin] + xsqrtx.iz(),
			leftEnd: '' + c,
			rightEnd: '' + d,
			primaryStep: 1,
			secondaryStep: 0.001,
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
//77460

