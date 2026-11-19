(function() {
	retryWhileError(function() {
		'use strict';
		let key = "315127";
		let preference = ['maximum', 'minimum'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let [forbidMinY, forbidMaxY] = [1 - rand, rand];

		let a = sl(2, 20, 2);
		let b = sl(1, 50);
		let l = sl(-5, 0);
		let r = l + sl(2, 5);
		let arr1 = ['+', '-'];
		
		NAtask.setMinimaxFunctionTask({
			expr: 'e^(2x)-' + a + 'e^x' + arr1.iz() + b,
			leftEnd: '' + l,
			rightEnd: '' + r,
			primaryStep: 1,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
			preference: preference,
		});
	}, 10000);
})();
//315127

