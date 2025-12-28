(function() {
	retryWhileError(function() {
		'use strict';
		let key = "282862";
		let preference = ['maximum', 'minimum'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let [forbidMinY, forbidMaxY] = [1 - rand, rand];

		let a = sl(1, 30);
		let b = slKrome(a, 1, 30);
		let c = sl(-15, 15, 0.5);
		let d = c + sl(3, 30, 0.5);
		let arr = ['+', '-'];
		
		NAtask.setMinimaxFunctionTask({
			expr: ['(x' + arr.iz() + a + ')^2','(' + ' x ' + arr.iz() + b + ')'].shuffle().join('') + arr.iz() + sl(1, 10),
			leftEnd: '' + c,
			rightEnd: '' + d,
			primaryStep: 0.1,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
			preference: preference,
		});
	}, 10000);
})();
//282862

