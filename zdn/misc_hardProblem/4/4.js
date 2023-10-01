(function() {
	retryWhileError(function() {
		'use strict';

		let a = slKrome([30,45,60,15,75],1, 89);
		let constant1 = [
			[sl(1, 100).pm(), sl(2, 100)].join('/'), sl(2, 100).pm()
		].iz();

		NAtask.setEvaluationTask({
			expr: constant1+'('+['tg','ctg'].iz()+'deg('+a+')*tgdeg('+(90+a)+'))/(2*sindegpow('+a+',4)+2*cosdegpow('+a+',4)+sindegpow('+2*a+',2))',
			//askAboutFraction: true,
			authors: ['Александра Суматохина'],
		});
	}, 1000);
})();
//Это не обзад
//4



