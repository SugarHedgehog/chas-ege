(function() {
	retryWhileError(function() {
		'use strict';
		let a = sl(3, 50);
		let b = sl(1, 100);
		let k = [1,2].iz()
		let c = a*k/4;
		let arr1 = ['+', '-'];
		let maxmin1 = sl1();
		let maxmin2 = (maxmin1 + 1) % 2;

		let forbidMinY = false;
		let forbidMaxY = false;

		if (nabor.preferences && "26704" in nabor.preferences) {
			switch (nabor.preferences["26704"][0]) {
				case 'minimum':
					forbidMaxY = true;
					break;
				case 'maximum':
					forbidMinY = true;
					break;
			}
		}
		NAtask.setMinimaxFunctionTask({
			expr: arr1[maxmin1] + a + 'tan(x)' + arr1[maxmin2] + (a*k) + 'x' + arr1.iz()+c+' pi' + arr1.iz() + b,
			leftEnd: ['0','-pi/4','-pi/3'].iz(),
			rightEnd: ['0','pi/4','pi/3'].iz(),
			primaryStep: Math.PI/12,
			secondaryStep: Math.PI/1200,
			authors: ['Алендарь Сергей','Николай Авдеев'],
			forbidMinY,
			forbidMaxY,	
		});
	}, 10);
})();
//26704

