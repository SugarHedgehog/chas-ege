(function() {
	retryWhileError(function() {
		'use strict';
		let forbidMinY = false;
		let forbidMaxY = false;

		if (nabor.preferences && "77427" in nabor.preferences) {
			switch (nabor.preferences["77427"]) {
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
				'(' + ['x', sl(1,20)].joinPlusMinus() + ')^2 ' +
				'(' + ['x', sl(1,20)].joinPlusMinus() + ') + ' +
				sl(0,20).pm(),
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
		});
	}, 20);
})();
//282859
