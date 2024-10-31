(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 9);
		let b = sl(1, 50);
		let c = sl(1, 100);
		let d = sl(1, 100);
		let arr1 = ['+', '-'];
		let linear = [arr1.iz() + c + 'x', arr1.iz() + d];
		let forbidMinY = false;
		let forbidMaxY = false;
		let key = "315835";

		if (nabor.preferences && key in nabor.preferences) {
			switch (nabor.preferences[key][0]) {
				case 'linear':
					linear = [arr1.iz() + c + 'x'];
					break;
				case 'not_linear':
					linear = [arr1.iz() + d];
					break;
			}
			switch (nabor.preferences[key][1]) {
				case 'minimum':
					forbidMaxY = true;
					break;
				case 'maximum':
					forbidMinY = true;
					break;
			}
		}
		NAtask.setMinimaxFunctionTask({
			expr: a + 'x^5' + arr1.iz() + b + 'x^3' + linear.iz(),
			leftEnd: '-' + sl(4, 20),
			rightEnd: '' + sl(0, 2).pm(),
			primaryStep: 1,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
		});
	}, 10);
})();
//315835

