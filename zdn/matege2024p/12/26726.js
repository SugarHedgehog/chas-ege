(function() {
	retryWhileError(function() {
		'use strict';
		let key = "26726";
		let preference1 = ['positive_pow', 'negative_pow'];
		let preference2 = ['maximum', 'minimum'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

		let sign = ['+', '-'][rand1];
		let [forbidMinY, forbidMaxY] = [1 - rand2, rand2];

		NAtask.setLocalExtremumTask({
			expr:
				'(' + ['x', sl(1,20)].joinPlusMinus() + ')^2 *' +
				'e^(' + [sign+'x', sl(1,20).pm()].shuffleJoin('+') + ')',
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
			preference: [preference1, preference2],
		});
	}, 20);
})();
//26726
