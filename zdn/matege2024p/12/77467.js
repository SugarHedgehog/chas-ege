(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1,20);

		let frac = ['x', '(x^2 + ' + a*a + ')'];
		let forbidMinY = false;
		let forbidMaxY = false;

		if (nabor.preferences && "77467" in nabor.preferences) {
			switch (nabor.preferences["77467"][0]) {
				case 'x/(x^2+c)':
					frac = frac.join('/');
					break;
				case '(x^2+c)/x':
					frac = frac.reverse().join('/');
					break;
			}
			switch (nabor.preferences["77467"][1]) {
				case 'minimum':
					forbidMaxY = true;
					break;
				case 'maximum':
					forbidMinY = true;
					break;
			}
		}

		NAtask.setLocalExtremumTask({
			expr: ['-',''].iz() + '(' +  + ')',
			extremums: [-a, a],
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
		});
	}, 2);
})();
//77467
