(function() {
	retryWhileError(function() {
		'use strict';
		let forbidMinY = false;
		let forbidMaxY = false;

		if (nabor.preferences && "26726" in nabor.preferences) {
			switch (nabor.preferences["26726"][0]) {
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
				'(' + ['x', sl(1,20)].joinPlusMinus() + ')^2 *' +
				'e^(' + ['x', sl(1,20)].joinPlusMinus() + ')',
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
		});
	}, 20);
})();
//26726
