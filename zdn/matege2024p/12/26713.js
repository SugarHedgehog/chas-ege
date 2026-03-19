(function() {
	retryWhileError(function() {
		'use strict';
		let key = "26713";
		let preference1 = ['positive_pow', 'negative_pow'];
		let preference2 = ['maximum', 'minimum'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);
		let a = sl(1,20).pm();
		let expression = [['x', a].shuffleJoin('+'), ['-x', a].shuffleJoin('+')][rand1];
		let [forbidMinY, forbidMaxY] = [1 - rand2, rand2];
		
		NAtask.setLocalExtremumTask({
			expr:
				'(' + ['x', a].joinPlusMinus() + ') *' +
				'e^(' + expression + ')',
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
			extremums: [a, a+1, -a, a-1, -a+1, -a-1],
			preference: [preference1, preference2],
		});
	}, 20);
})();
//26713
