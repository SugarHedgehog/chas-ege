(function() {
	retryWhileError(function() {
		'use strict';
		let key = "26717";
		let preference1 = ['trivial', 'not_trivial'];
		let preference2 = ['maximum', 'minimum'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);
		let [forbidMinY, forbidMaxY] = [1 - rand2, rand2];
		let a = sl(2, 20);
		let b = sl(1, 15);
		let c = a;
		
		let pow = [a + 'log(x+' + b + ')', 'log((x+' + b + ')^' + c + ')'][rand1];
		let k = sl(-10, 10);
		
		if (sl1()) {
			k = 0;
			a = 1;
		}
		let l = sl(-b + 1, -0.5, 0.5);
		let arr1 = ['+', '-'].shuffle();	

		NAtask.setMinimaxFunctionTask({
			expr: arr1[0] + pow + '+' + arr1[1] + c + 'x+' + k,
			leftEnd: '' + l,
			rightEnd: '0',
			primaryStep: 0.01,
			secondaryStep: 0.001,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
			preference: [preference1, preference2],
		});
	}, 1000);
})();

//26717
