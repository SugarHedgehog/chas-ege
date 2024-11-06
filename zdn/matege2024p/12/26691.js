(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 3);
		let b = sl(1, 50);
		let c = sl(1, 15);
		let d = b / a + a + sl(1, 10);
		let e = -b / a - a - sl(1, 10);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];
		let key = "26691";
		
		let v = usePreference(key, [{
			preference: 'exp',
			preferenceValue: 1,
		}, {
			preference: 'cExp',
			preferenceValue: sl(2,10),
		}], sl(1,10));
		let sign = usePreference(key, [{
			preference: 'positive_pow',
			preferenceValue: v,
		}, {
			preference: 'negative_pow',
			preferenceValue: -(v.abs()),
		}], [v, -(v.abs())].iz());

		NAtask.setMinimaxFunctionTask({
			expr: '' + '(' + a + 'x' + arr1.iz() + b + ')' + 'e^(' + sign + 'x' + arr2.iz() + c + ')',
			leftEnd: '' + e,
			rightEnd: '' + d,
			primaryStep: 1 / 6,
			forbiddenAnswers: [0,'-0'],
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
//26691

