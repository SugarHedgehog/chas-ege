(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1,20).pm();
		let forbidMinY = false;
		let forbidMaxY = false;

		if (nabor.preferences && "26724" in nabor.preferences) {
			switch (nabor.preferences["26724"][0]) {
				case 'minimum':
					forbidMaxY = true;
					break;
				case 'maximum':
					forbidMinY = true;
					break;
			}
		}
		NAtask.setLocalExtremumTask({
			expr: '(' + sl(1,10) + 'x^2 - ' + a + 'x +' + a + ')e^(x + ' + sl(-30,30) + ')' ,
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
		});
	}, 20);
})();
//26724
