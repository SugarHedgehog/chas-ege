(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1,20).pm();
		let forbidMinY = false;
		let forbidMaxY = false;
		let key = "26713";

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
		NAtask.setLocalExtremumTask({
			expr:
				'(' + ['x', a].joinPlusMinus() + ') *' +
				'e^(' + ['x', a].joinPlusMinus() + ')',
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
		});
	}, 20);
})();
//26713
