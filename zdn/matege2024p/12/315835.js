(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 9);
		let b = sl(1, 50);
		let c = sl(1, 100);
		let d = sl(1, 100);
		let arr1 = ['+', '-'];
		let key = "315835";
		let linear = [arr1.iz() + c + 'x', arr1.iz() + d];
		linear = usePreference(key, [{
			preference: 'linear',
			preferenceValue: [['+', '-'].iz() + sl(1, 100) + 'x '],
		}, {
			preference: 'not_linear',
			preferenceValue: [''],
		}], linear);

		NAtask.setMinimaxFunctionTask({
			expr: a + 'x^5' + arr1.iz() + b + 'x^3' + linear.iz(),
			leftEnd: '-' + sl(4, 20),
			rightEnd: '' + sl(0, 2).pm(),
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
	}, 10);
})();
//315835

