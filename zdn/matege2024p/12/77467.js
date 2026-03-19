(function() {
	retryWhileError(function() {
		'use strict';
		let key = "77467";
		let preference1 = ['xfrac', 'fracx'];
		let preference2 = ['maximum', 'minimum'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

		let a = sl(1,20);
		let frac = ['x', '(x^2 + ' + a*a + ')'];
		if(!rand1){
			frac = frac.join('/');
		} else {
			frac = frac.reverse().join('/');
		}
		let [forbidMinY, forbidMaxY] = [1 - rand2, rand2];

		NAtask.setLocalExtremumTask({
			expr: ['-',''].iz() + '(' + frac + ')',
			extremums: [-a, a],
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
			preference: [preference1, preference2],
		});
	}, 2);
})();
//77467
