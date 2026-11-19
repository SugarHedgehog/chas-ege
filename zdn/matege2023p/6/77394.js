(function() {
	retryWhileError(function() {
		'use strict';
		let key = '77394';
		let preference = ['same_base', 'diff_base', 'pow_base'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let base1 = sl(2, 10 - rand);
		let base2;

		switch (rand) {
		case 0:
			base1 = base1.pow(sl(1, 2));
			base2 = base1;
			break;
		case 1:
			base2 = base1.pow(2);
			break;
		case 2:
			base2 = base1.pow(2);
			base1 = base1.pow(3);
		}

		if (rand > 0)
			[base1, base2] = [base1, base2].shuffle();

		NAtask.setEvaluationTask({
			expr: 'divideColon(' + [
				'(' + base1 + '^' + sl(2, 20) + ')' + '^' + sl(2, 20),
				base2 + '^' + sl(2, 100),
			].shuffle().join() + ')',
			forbiddenAnswers: [0],
			authors: ['Николай Авдеев'],
		});
	}, 1000);
})();

//77394
