(function() {
	retryWhileError(function() {
		'use strict';
		let key = "26695";
		let preference1 = ['sin', 'cos'];
		let preference2 = ['maximum', 'minimum'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);
		let arr2 = ['sin', 'cos'][rand1];
		let [forbidMinY, forbidMaxY] = [1 - rand2, rand2];

		
		let a = sl(1, 99);
		let b = sl(a+1, 100);
		let c = sl(1, 100);
		let arr1 = ['+', '-'];
		let maxmin1 = sl1();

		NAtask.setMinimaxFunctionTask({
			expr: arr1[maxmin1] + a + arr2 + '(x)' + arr1.iz() + b + 'x' + arr1.iz() + c,
			leftEnd: ['-pi/2', '-3pi/2', '0'].iz(),
			rightEnd: ['pi/2', '3pi/2', '0'].iz(),
			primaryStep: 0.1,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
			preference: [preference1, preference2],
		});
	}, 10000);
})();
//26695

