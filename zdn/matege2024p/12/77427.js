(function() {
	retryWhileError(function() {
		'use strict';

		let key = "77427";
		let preference1 = ['linear', 'not_linear'];
		let preference2 = ['maximum', 'minimum'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);
		let linear = [['+', '-'].iz() + sl(1, 100) + 'x ', ''][rand1];
		let [forbidMinY, forbidMaxY] = [1 - rand2, rand2];

		NAtask.setLocalExtremumTask({
			expr:
			// TODO: Do something with 1x
				'' /*+ ['',sl(2,4).pm()].iz()*/ + 'x^3 ' + ['+', '-'].iz() + sl(1, 100) + 'x^2 ' + linear + ['+', '-'].iz() +
				sl(1, 1000),
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
			preference: [preference1, preference2],
		});
	}, 2000);
})();
//77427
