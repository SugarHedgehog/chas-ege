(function() {
	retryWhileError(function() {
		'use strict';
		let key = "77470";
		let preference1 = ['xfrac', 'fracx'];
		let preference2 = ['maximum', 'minimum'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

		let a = sl(2, 14);
		let frac = ['x', '(x^2 + ' + a * a + ')'];
		if(!rand1){
			frac = frac.join('/');
		} else {
			frac = frac.reverse().join('/');
		}
		let [forbidMinY, forbidMaxY] = [1 - rand2, rand2];

		let d = sl(-15, 15);
		let e = d + sl(3, 30);

		NAtask.setMinimaxFunctionTask({
			expr: ['','-'].iz() + '('+ frac +')',
			leftEnd: '' + d,
			rightEnd: '' + e,
			primaryStep: 0.1,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
			preference: [preference1, preference2],
		});
	}, 10000);
})();
//77470

