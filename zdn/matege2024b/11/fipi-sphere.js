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
