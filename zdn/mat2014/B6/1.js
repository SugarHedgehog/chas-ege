(function() {
	retryWhileError(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 0);
	let configKey = "1";

	// Количество бросков (2-4)
	let totalTosses = getListedPreference(configKey, [{
		preference: 'two_tosses',
		preferenceValue: 2,
	}, {
		preference: 'three_tosses',
		preferenceValue: 3,
	}, {
		preference: 'four_tosses',
		preferenceValue: 4,
	}, ], sl(2, 4));

	// Количество успешных исходов (включая 0)
	let successfulTosses = sl(0, totalTosses);

	// Тип сравнения
	let comparisonType = getListedPreference(configKey, [{
		preference: 'equal',
		preferenceValue: 0,
	}, {
		preference: 'more',
		preferenceValue: 1,
	}, {
		preference: 'less',
		preferenceValue: 2,
	}, {
		preference: 'moreOrEqual',
		preferenceValue: 3,
	}, {
		preference: 'lesseOrEqual',
		preferenceValue: 4,
	}], (totalTosses == successfulTosses || successfulTosses == 0)? 0 : sl(4));

	// Варианты формулировки количества выпадений
	const resultOptions = [
		['ни разу', 'один раз', 'два раза', 'три раза', 'четыре раза'],
		['ни одного раза', 'одного раза', 'двух раз', 'трёх раз', 'четырёх раз']
	];
	
	// Формирование описания количества успешных исходов
	let outcomeDescription = resultOptions[(comparisonType > 0) ? 1 : 0][successfulTosses];

	// Вычисление вероятности
	let probability = 0;
	switch (comparisonType) {
	case 0: // ровно
		probability = math.combinations(totalTosses, successfulTosses) * (0.5).pow(totalTosses);
		outcomeDescription = 'ровно '.esli(successfulTosses!=0) + outcomeDescription;
		break;
	case 1: // больше
		for (let count = successfulTosses + 1; count <= totalTosses; count++) {
			probability += math.combinations(totalTosses, count) * (0.5).pow(totalTosses);
		}
		outcomeDescription = 'более ' + outcomeDescription;
		break;
	case 2: // меньше
		for (let count = 0; count <= successfulTosses - 1; count++) {
			probability += math.combinations(totalTosses, count) * (0.5).pow(totalTosses);
		}
		outcomeDescription = 'менее ' + outcomeDescription;
		break;
	case 3: // не более
		for (let count = 0; count <= successfulTosses; count++) {
			probability += math.combinations(totalTosses, count) * (0.5).pow(totalTosses);
		}
		outcomeDescription = 'не более ' + outcomeDescription;
		break;
	case 4: // не менее
		for (let count = successfulTosses; count <= totalTosses; count++) {
			probability += math.combinations(totalTosses, count) * (0.5).pow(totalTosses);
		}
		outcomeDescription = 'не менее ' + outcomeDescription;
		break;
	}
	
	genAssert(probability.mzhd(0,1), 'Вероятность не в диапозоне (0, 1)');

	NAtask.setTask({
		text: `В случайном эксперименте симметричную монету бросают ${chislitlx(totalTosses, `раз`, `$`)}. 
		Какова вероятность того, что ${window.moneta.iz()} выпадет ${outcomeDescription}?`.replace(/выпадет ни разу/, 'ни разу не выпадет'),
		answers: probability,
		authors:['Авдеев Николай', 'Суматохина Александра'],
	});
	}, 1000);
})();
