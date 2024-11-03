(function() {
	retryWhileError(function() {
		'use strict';
		let key = "26726";
		let sign = ['+', '-'];
		sign = usePreference(key, [{
			preference: 'positive_pow',
			preferenceValue: ['+'],
		}, {
			preference: 'negative_pow',
			preferenceValue: ['-'],
		}], sign);

		NAtask.setLocalExtremumTask({
			expr:
				'(' + ['x', sl(1,20)].joinPlusMinus() + ')^2 *' +
				'e^(' + [sign.iz()+'x', sl(1,20).pm()].shuffleJoin('+') + ')',
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
	}, 20);
})();
//26726
