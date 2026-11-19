(function() {
	retryWhileError(function() {
		'use strict';
		let key = "77455";
		let preference1 = ['pow', 'sqrt'];
		let preference2 = ['maximum', 'minimum'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

		let xsqrtx = ['x^(3/2)', 'x sqrt(x)'][rand1];
		let [forbidMinY, forbidMaxY] = [1 - rand2, rand2];

		NAtask.setLocalExtremumTask({
			expr: [
				'' + sl(1, 5) + xsqrtx,
				sl(1, 20) + 'x',
				sl(0, 100)
			].joinPlusMinus(),
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
			preference: [preference1, preference2],
		});
	}, 200);
})();
//77455
