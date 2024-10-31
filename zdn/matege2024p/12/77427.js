(function () {
	retryWhileError(function () {
		'use strict';
		let linear = [['+', '-'].iz() + sl(1, 100) + 'x ', ''];
		let forbidMinY = false;
		let forbidMaxY = false;

		if (nabor.preferences && "77427" in nabor.preferences) {
			switch (nabor.preferences["77427"][0]) {
				case 'linear':
					linear = [['+', '-'].iz() + sl(1, 100) + 'x '];
					break;
				case 'not_linear':
					linear = [''];
					break;
			}
			switch (nabor.preferences["77427"][1]) {
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
				// TODO: Do something with 1x
				'' /*+ ['',sl(2,4).pm()].iz()*/ + 'x^3 ' +
				['+', '-'].iz() + sl(1, 100) + 'x^2 ' + linear.iz() +
				['+', '-'].iz() + sl(1, 1000),
			authors: ['Николай Авдеев'],
			forbidMinY: forbidMinY,
			forbidMaxY: forbidMaxY,
		});
	}, 2000);
})();
//77427
