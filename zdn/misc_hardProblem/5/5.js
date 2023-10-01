(function() {
	retryWhileError(function() {
		'use strict';

		let a = slKrome([30,45,60,15,75],1, 89);
		let constant1 = [
			[sl(1, 100).pm(), sl(2, 100)].join('/'), sl(2, 100).pm()
		].iz();
		let constant2 = [
			[sl(1, 100).pm(), sl(2, 100)].join('/'), sl(2, 100).pm()
		].iz();

		NAtask.setEvaluationTask({
			expr: [-constant1+'*cosdeg('+2*a+')',(-4*constant1)+'*sindegpow('+a/2+',2)*(cosdeg('+a+')+1)',constant2].shuffle().slag().plusminus(),
			//askAboutFraction: true,
			authors: ['Александра Суматохина'],
		});
	}, 1000);
})();
//Это не обзад
//5


