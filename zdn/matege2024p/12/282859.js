(function() {
	retryWhileError(function() {
		'use strict';
		let key = "282859";
		let preference = ['maximum', 'minimum'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let [forbidMinY, forbidMaxY] = [1 - rand, rand];

		NAtask.setLocalExtremumTask({
			expr:
				'(' + ['x', sl(1,20)].joinPlusMinus() + ')^2 ' +
				'(' + ['x', sl(1,20)].joinPlusMinus() + ') + ' +
				sl(0,20).pm(),
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
			preference: preference,
		});
	}, 20);
})();
//282859
