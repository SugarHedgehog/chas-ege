(function() {
	retryWhileError(function() {
		'use strict';
		let power = sl(3, 5);
		let base = sl(2, 5);
		
		let [power1, power2, power3] = arrayOfUniqueValues(3, 2, 10);

		let num1 = base.pow(power1);
		let num2 = base.pow(power2);
		let num3 = base.pow(power3);

		genAssert(num1 < 100000, 'Иначе полезет scientific notation');
		genAssert(num2 < 100000, 'Иначе полезет scientific notation');
		genAssert(num3 < 100000, 'Иначе полезет scientific notation');

		NAtask.setEvaluationTask({
			expr: 'nthRoot(' + num1 + ',' + power + ')' + ['*', ''].iz() + 'nthRoot(' + num2 + ',' + power + ')/nthRoot(' +
				num3 + ',' + power + ')',
			//forbiddenAnswers: [0],
			authors: ['Суматохина Александра'],
		});
	}, 1000);
})();

// 26746 62313 62385 62315 62317 62319 62321 62323 62325 62327 62329 62331 62333 62335 62337 62341 62343 62345 62347 62349 62351 62353 62355 62357 62359 62361 62363 62365 62367 62369 62371 62373 62375 62377 62379 62381 62383
