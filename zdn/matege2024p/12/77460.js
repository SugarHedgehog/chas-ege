(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(1, 30, 0.5).pm();
		let b = sl(1, 30, 0.5);
		let c = sl(1, 15);
		let d = c + sl(3, 30);
		let arr1 = ['+', '-'];
		let arr2 = ['-', '+'];
		let maxmin = sl1();
		let xsqrtx = ['x^(3/2)', 'x sqrt(x)'];
		let forbidMinY = false;
		let forbidMaxY = false;

		let key = "77460";
		if (nabor.preferences && key in nabor.preferences) {
			switch (nabor.preferences[key][0]) {
				case 'pow':
					xsqrtx = ['x^(3/2)'];
					break;
				case 'sqrt':
					xsqrtx = ['x sqrt(x)'];
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
		NAtask.setMinimaxFunctionTask({
			expr: '' + a + arr1[maxmin] + b + ' x ' + arr2[maxmin] + xsqrtx.iz(),
			leftEnd: '' + c,
			rightEnd: '' + d,
			primaryStep: 1,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
			forbidMinY: forbidMinY,
			forbidMaxY: forbidMaxY,
		});
	}, 10000);
})();
//77460

