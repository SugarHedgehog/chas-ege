(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '26848';
		let preference = ['integer', 'not_integer', 'frac'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let b = [sl(2, 10).pow(sl(1, 3)), [2, 4, 5, 10].iz().pow(-1), sl(2, 16)][rand];
		let bText = b;

		if (rand == 2) {
			bText = (1).texfrac(b);
			b = 1 / b;
		}

		if (rand == 1)
			genAssertZ1000(b / 10);

		let answ = sl(0.5, 5, 0.5).pm();
		let subansw = b.pow(answ);
		let a = sl(1, 100, 0.5);
		let c = a / subansw;

		genAssertZ1000(c);
		genAssert((c + '').length < 5, '');

		NAtask.setTask({
			text: 'Найдите значение выражения: $$\\log_{' + bText + '}{' + a + '} - \\log_{' + bText + '}{' + c + '} $$',
			answers: answ,
		}, {
			tags: {
				log: 1,
			},
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);
})();

//https://math-ege.sdamgia.ru/problem?id=26848
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258
