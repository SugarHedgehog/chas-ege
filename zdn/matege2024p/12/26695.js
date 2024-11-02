(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 100);
		let b = sl(1, 100);
		let c = sl(1, 100);
		let arr1 = ['+', '-'];
		let maxmin1 = sl1();

		let key = "26695";
		let arr2 = ['sin', 'cos'];
		arr2 = usePreference(key, [{
			preference: 'sin',
			preferenceValue: ['sin'],
		}, {
			preference: 'cos',
			preferenceValue: ['cos'],
		}], arr2);

		NAtask.setMinimaxFunctionTask({
			expr: arr1[maxmin1] + a + arr2.iz() + '(x)' + arr1.iz() + b + 'x' + arr1.iz() + c,
			leftEnd: ['-pi/2', '-3pi/2', '0'].iz(),
			rightEnd: ['pi/2', '3pi/2', '0'].iz(),
			primaryStep: 0.1,
			secondaryStep: 0.0001,
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
//26695

