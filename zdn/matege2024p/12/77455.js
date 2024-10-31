(function() {
	retryWhileError(function() {
		'use strict';
		let xsqrtx = ['x^(3/2)', 'x sqrt(x)'];
		let forbidMinY = false;
		let forbidMaxY = false;

		let key = "77455";
		if (nabor.preferences && key in nabor.preferences) {
			switch (nabor.preferences[key][0]) {
				case 'pow':
					xsqrtx = ['x^(3/2)'];
					break;
				case 'sqrt':
					xsqrtx = ['x sqrt(x)'];
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
		NAtask.setLocalExtremumTask({
			expr: [
				'' + sl(1, 5) + xsqrtx.iz(),
				sl(1, 20) + 'x',
				sl(0, 100)
			].joinPlusMinus(),
			authors: ['Николай Авдеев'],
			forbidMinY: forbidMinY,
			forbidMaxY: forbidMaxY,
		});
	}, 200);
})();
//77455
