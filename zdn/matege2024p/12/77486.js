(function() {
	retryWhileError(function() {
		'use strict';
		let forbidMinY = false;
		let forbidMaxY = false;

		if (nabor.preferences && "77486" in nabor.preferences) {
			switch (nabor.preferences["77486"][0]) {
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
				'ln((x +' + sl(1,30).pm() +')^' + sl(2,30).pm() + ')',
				'' +  sl(1,30).pm(),
			].joinPlusMinus(),
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
		});
	}, 200);
})();
//77486
