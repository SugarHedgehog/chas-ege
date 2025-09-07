(function () {
	retryWhileError(function () {
		'use strict';
		let key = '2674101';
		let preference = ['positive_degree', 'negative_degree'];
		let rand = getSelectedPreferenceFromList(key, preference);

		var a = sluchch(2, 9),
			c = slKrome(a, 2, 9),
			b = slKrome(isZ, 0.1, 4.9, 0.1),
			f = sluchch(1, 4),
			d = slKrome(f, 1, 4),
			g = sluchch(1, [f, d].minE() - 1);

		genAssert(!(b + f).isZ());

		let aPow = ((b + f) * (-1).pow(rand)).toFixedLess(6);
		let cPow = (b + d).toFixedLess(6);
		let acPow = (b + g).toFixedLess(6);

		NAtask.setEvaluationTask({
			expr: [
				'(' + [a + '^' + aPow, a * c + '^' + acPow].shuffleJoin('*') + ')',
				'(' + c + '^' + cPow + ')',
			].shuffleJoin(' / '),
			//forbiddenAnswers: [0],
			authors: ['Николай Авдеев'],
		});

	}, 1000);
})();
//2674101
