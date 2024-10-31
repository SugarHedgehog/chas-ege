(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1,20);

		let frac = ['x', '(x^2 + ' + a*a + ')'];
		let forbidMinY = false;
		let forbidMaxY = false;
		let key = "77467";

		if (nabor.preferences && key in nabor.preferences) {
			switch (nabor.preferences[key][0]) {
				case 'xfrac':
					frac = frac.join('/');
					break;
				case 'fracx':
					frac = frac.reverse().join('/');
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
		}else{
			frac = frac.join('/');
		}

		NAtask.setLocalExtremumTask({
			expr: ['-',''].iz() + '(' + frac + ')',
			extremums: [-a, a],
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
		});
	}, 2);
})();
//77467
