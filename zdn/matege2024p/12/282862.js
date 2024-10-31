(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 30);
		let b = slKrome(a, 1, 30);
		let c = sl(-15, 15, 0.5);
		let d = c + sl(3, 30, 0.5);
		let arr = ['+', '-'];
		let forbidMinY = false;
		let forbidMaxY = false;
		let key = "282862";

		if (nabor.preferences && key in nabor.preferences) {
			switch (nabor.preferences[key][0]) {
				case 'minimum':
					forbidMaxY = true;
					break;
				case 'maximum':
					forbidMinY = true;
					break;
			}
		}

		NAtask.setMinimaxFunctionTask({
			expr: ['(x' + arr.iz() + a + ')^2','(' + ' x ' + arr.iz() + b + ')'].shuffle().join('') + arr.iz() + sl(1, 10),
			leftEnd: '' + c,
			rightEnd: '' + d,
			primaryStep: 0.1,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
		});
	}, 10000);
})();
//282862

