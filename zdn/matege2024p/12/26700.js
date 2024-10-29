(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(2, 20, 2);
		let b = sl(1, 100);
		let c = sl(1, 50);
		let arr1 = ['+', '-'];
		let arr2 = ['sin', 'cos'];
		if (nabor.preferences && "26700" in nabor.preferences) {
			switch (nabor.preferences["26700"][0]) {
				case 'cos':
					arr2 = ['cos'];
					break;
				case 'sin':
					arr2 = ['sin'];
					break;
			}
			switch (nabor.preferences["26700"][1]) {
				case 'minimum':
					forbidMaxY = true;
					break;
				case 'maximum':
					forbidMinY = true;
					break;
			}
		}
		NAtask.setMinimaxFunctionTask({
			expr: a + arr2.iz() + '(x)' + arr1.iz() + b + 'x/pi' + arr1.iz() + c,
			leftEnd: ['-2pi/3', '-5pi/6'].iz(),
			rightEnd: '0',
			primaryStep: 0.1,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
		});
	}, 10000);
})();
//26700

