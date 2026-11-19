(function() {
	'use strict';
	retryWhileError(function() {

		let key = '7';
		let preference = ['default', 'integer'];
		let roundNumbers = getSelectedPreferenceFromList(key, preference);

		let T = sl(2, 9);
		let S = (T.pow(4)).sluchDel();
		genAssert(S != 1);
		
		let P = (5.7 * T.pow(4)) / S;
		genAssert(P != 5.7);

		let Spow = sl(10, 30);
		let Tpow = sl(3, 4);
		let Ppow = Tpow * 4 + Spow - 8;

		if (roundNumbers) {
			while (P >= 100) {
				Ppow++;
				P /= 10;
			}
		} else {
			while (P > 10) {
				Ppow++;
				P /= 10;
			}
		}

		genAssertZ1000(P);

		if (roundNumbers)
			genAssertAlmostInteger(P * 10, 'P должно иметь не более 1 знака после запятой');

		let ans = T * (10).pow(Tpow);

		let rand = sl1();

		NAtask.setTask({
			text: 'Для определения эффективной температуры звeзд используют закон Стефана–Больцмана, согласно которому мощность' +
				' излучения нагретого тела P, измеряемая в ваттах, прямо пропорциональна площади его поверхности и четвeртой степени' +
				' температуры:  $P = \\sigma ST^4$, где $\\sigma  = 5,7 \\cdot 10^{-8}$ — постоянная, площадь $S$ измеряется в ' +
				'квадратных метрах, а температура $T$ — в градусах Кельвина. Известно, что некоторая звезда имеет площадь' +
				' $S = ' + (1).frac(S) + '\\cdot 10^{' + Spow + '} \\mbox{м}{}^2$, а излучаемая ею мощность $P$ ' + ['равна', 'не '+['более', 'менее'].iz()][rand] + ' $' +
				P.ts() + '\\cdot 10^{' + Ppow + '}$ Вт. ' + 'Определите ' + ['', ['наибольшую','наименьшую'].iz()+' возможную'][rand] + ' температуру этой звезды.' +
				' Приведите ответ в градусах Кельвина.',
			answers: ans,
			authors: ['SugarHedgehog'],
			preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
