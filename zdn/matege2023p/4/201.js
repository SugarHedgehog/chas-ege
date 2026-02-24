(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let bun = [
			[
				['батской булочка', 'рулет', 'батон', 'хлеб'].iz(), 500
			],
			[
				['краковского бублик', 'маффин', 'кренделе', 'круассан',
					'пампушка', 'пита', 'пончик', 'рогалик', 'сайка', 'сдоба', 'сметанник', 'слойка'
				].iz(), 100
			]
		].iz();
		let bottomWeight = bun.pop();
		bottomWeight = sl(bottomWeight, bottomWeight * sl(15, 30)/10);
		let topWeight = bottomWeight + sl(10, 100);
		bun = sklonlxkand(bun[0]);
		let firstProbability = sl(4, 98)/100;
		let secondProbability = sl(100 - firstProbability + 1, 99)/100;
		firstProbability /= 100;

		genAssert(firstProbability + secondProbability > 1, 'Слишком маленькие вероятности');
		NAtask.setTask({
			text: 'При выпечке ' + bun.re + ' производится контрольное взвешивание свежего изделия. ' +
				'Известно, что вероятность того, что масса окажется ' + ['меньше $' + topWeight + '$ г, равна $' + firstProbability.ts(),
				'больше $' + bottomWeight + '$ г, равна $' + secondProbability.ts()	].shuffleJoin('$. Вероятность того, что масса окажется ') +
				'$. Найдите вероятность того, что масса изделия больше $' + bottomWeight + '$ г, но меньше $' + topWeight +
				'$ г.',
			answers: firstProbability - (1 - secondProbability),
			analys: '',
		});
	});
})();
//201 ФИПИ
//SugarHedgehog
