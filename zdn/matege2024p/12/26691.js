(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 3);
		let b = sl(1, 50);
		let c = sl(1, 15);
		let d = b / a + a + sl(1, 10);
		let e = -b / a - a - sl(1, 10);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];
		let maxmin = sl1();
		let forbidMinY = false;
		let forbidMaxY = false;
		let key = "26691";

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
			expr: '' + '(' + a + 'x' + arr1[sl1()] + b + ')' + 'e^(' + arr1[maxmin] + 'x' + arr2[sl1()] + c + ')',
			leftEnd: '' + e,
			rightEnd: '' + d,
			primaryStep: 1 / 6,
			forbiddenAnswers: [0,'-0'],
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
		});
	}, 10000);
})();
//26691

