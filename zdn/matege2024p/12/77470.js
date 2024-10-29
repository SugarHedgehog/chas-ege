(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 14);
		let b = a * a;
		let d = sl(-15, 15);
		let e = d + sl(3, 30);

		let frac = ['x', '(x^2 + ' + b + ')'];
		let forbidMinY = false;
		let forbidMaxY = false;

		if (nabor.preferences && "77470" in nabor.preferences) {
			switch (nabor.preferences["77470"][0]) {
				case 'xfrac':
					frac = frac.join('/');
					break;
				case 'fracx':
					frac = frac.reverse().join('/');
					break;
			}
			switch (nabor.preferences["77470"][1]) {
				case 'minimum':
					forbidMaxY = true;
					break;
				case 'maximum':
					forbidMinY = true;
					break;
			}
		}

		NAtask.setMinimaxFunctionTask({
			expr: ['','-'].iz() + '('+ frac +')',
			leftEnd: '' + d,
			rightEnd: '' + e,
			primaryStep: 0.1,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
		});
	}, 10000);
})();
//77470

