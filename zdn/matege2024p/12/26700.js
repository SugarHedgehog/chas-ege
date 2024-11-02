(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 20, 2);
		let b = sl(1, 100);
		let c = sl(1, 50);
		let arr1 = ['+', '-'];
		let key = "26700";
		
		let arr2 = ['sin', 'cos'];
		arr2 = usePreference(key, [{
			preference: 'sin',
			preferenceValue: ['sin'],
		}, {
			preference: 'cos',
			preferenceValue: ['cos'],
		}], arr2);

		NAtask.setMinimaxFunctionTask({
			expr: a + arr2.iz() + '(x)' + arr1.iz() + b + 'x/pi' + arr1.iz() + c,
			leftEnd: ['-2pi/3', '-5pi/6'].iz(),
			rightEnd: '0',
			primaryStep: 0.1,
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
//26700

