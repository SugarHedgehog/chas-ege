(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		// 09A429, 461A02, 7CF072, D40162: m/d³ постоянно.
		// Различающиеся окончания слова «грамм» задаются новым числом.
		let d1 = sl(2, 6), d2 = sl(2, 7);
		genAssert(d1 !== d2, 'Диаметры должны различаться');
		let coefficient = sl(1, 7);
		let mass = coefficient * d1 * d1 * d1;
		let answer = coefficient * d2 * d2 * d2;
		NAtask.setTask({
			text: 'Однородный шар диаметром $' + d1 + '$ см весит ' + chislitlx(mass, 'грамм', '$v') +
				'. Сколько граммов весит шар диаметром $' + d2 + '$ см, изготовленный из того же материала?',
			answers: answer,
			analys: 'Массы однородных шаров из одного материала пропорциональны кубам их диаметров: ' +
				'$m_2 = ' + mass + ' \\cdot (' + d2 + '/' + d1 + ')^3 = ' + answer + '$ г.',
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// ФИПИ: 09A429 (0x09A429 = 631849).
// Аналоги (09A429): F169A3.
// Аналоги (461A02): 461A02, 0E64D9, 0E4697, 938CEC, 99926A.
// Аналоги (7CF072): 7CF072, D65016, 529FDD, AADDA5, 63F7CC, 36C0E4, 41BC8F, 1C7BBD, 410919, 0493D7, 30C2CE, FC5CEE, 9DFBE4, 9A5982.
// Аналоги (D40162): D40162.
