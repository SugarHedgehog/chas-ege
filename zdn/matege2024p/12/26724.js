(function() {
	retryWhileError(function() {
		'use strict';
		let key = "26724";
		let preference = ['maximum', 'minimum'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let [forbidMinY, forbidMaxY] = [1 - rand, rand];

		let a = sl(1,20).pm();

		NAtask.setLocalExtremumTask({
			expr: '(' + sl(1,10) + 'x^2 - ' + a + 'x +' + a + ')e^(x + ' + sl(-30,30) + ')' ,
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
			preference: preference,
		});
	}, 20);
})();
//26724
