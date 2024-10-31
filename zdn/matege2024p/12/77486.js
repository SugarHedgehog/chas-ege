(function() {
	retryWhileError(function() {
		'use strict';
		let forbidMinY = false;
		let forbidMaxY = false;
		let pow = sl(2,30).pm();
		let key = "77486";

		if (nabor.preferences && key in nabor.preferences) {
			switch (nabor.preferences[key][0]) {
				case 'positive_pow':
					pow = pow.abs();
					break;
				case 'negative_pow':
					pow = (pow > 0) ? -pow : pow;
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
				'' + sl(1,30).pm() + 'x',
				'ln((x +' + sl(1,30).pm() +')^' + pow + ')',
				'' +  sl(1,30).pm(),
			].joinPlusMinus(),
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
		});
	}, 200);
})();
//77486
