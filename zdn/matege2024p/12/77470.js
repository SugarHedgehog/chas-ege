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
		let key = "77470";

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

