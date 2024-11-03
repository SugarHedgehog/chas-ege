(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1,20).pm();
		let key = "26713";
		let expression = [['x', a].shuffleJoin('+'), ['-x', a].shuffleJoin('+')];
		expression = usePreference(key, [{
			preference: 'positive_pow',
			preferenceValue: [['x', a].shuffleJoin('+')],
		}, {
			preference: 'negative_pow',
			preferenceValue: [['-x', a].shuffleJoin('+')],
		}], expression);

		NAtask.setLocalExtremumTask({
			expr:
				'(' + ['x', a].joinPlusMinus() + ') *' +
				'e^(' + expression.iz() + ')',
			authors: ['Николай Авдеев'],
			forbidMinY: usePreference(key, {
				preference: 'maximum',
				preferenceValue: true,
			}, false),
			forbidMaxY: usePreference(key, {
				preference: 'minimum',
				preferenceValue: true,
			}, false),
			extremums: [a, a+1, -a, a-1, -a+1, -a-1]
		});
	}, 20);
})();
//26713
