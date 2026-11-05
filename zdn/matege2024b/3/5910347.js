(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '5910347';
		let preference = ['dayMinimum', 'dayMaximum', 'periodMinimum', 'periodMaximum', 'valueAtTime'];
		let variant = getSelectedPreferenceFromList(key, preference);
		let days = ['во вторник', 'в среду', 'в четверг'];
		let day = sl(0, 2);
		let hour = [6, 12, 18].iz();
		let values = Array.from({length: 13}, () => 720 + 2 * sl(0, 30));
		let selected = variant < 2 ? values.slice(4 * day, 4 * day + 5) : values;
		let questions = [
		    'Найдите наименьшее значение атмосферного давления ' + days[day] + ' с 0:00 до 24:00 включительно.',
		    'Найдите наибольшее значение атмосферного давления ' + days[day] + ' с 0:00 до 24:00 включительно.',
		    'Найдите наименьшее значение атмосферного давления за все трое суток.',
		    'Найдите наибольшее значение атмосферного давления за все трое суток.',
		    'Определите значение атмосферного давления ' + days[day] + ' в ' + hour + ':00.',
		];
		NAtask.setTask({
		    text: 'На графике показано изменение атмосферного давления в течение трёх суток. По горизонтали указаны дни недели и время, ' +
		        'по вертикали — атмосферное давление в миллиметрах ртутного столба. ' + questions[variant] + ' Ответ дайте в миллиметрах ртутного столба.',
		    answers: variant === 4 ? values[4 * day + hour / 6] : variant % 2 ? selected.maxE() : selected.minE(),
		    preference,
		});
		NAtask.modifiers.addJqplot({
		    dataArray: [values.map((value, i) => [6 * i, value])], width: '780px', height: '420px',
		    options: {axes: {
		        xaxis: {min: 0, max: 72, ticks: values.map((_, i) => [6 * i, i === 12 ? 'Чт 24' : ['Вт', 'Ср', 'Чт'][Math.floor(i / 4)] + ' ' + (6 * i % 24)])},
		        yaxis: {min: 720, max: 780, tickInterval: 2},
		    }, seriesDefaults: {showMarker: false}},
		});
	}, 1000);
})();
// 5A2F4B, C7EB02, 705687, FD11B2, 4FB49F, 1E69EC, 95A959, 3B8CC1, 831CDD, C4FD81, 1EE16F, 990583, 19AA6B, A1351C, 1F0168, 67D522, B06F05, A934BB, 4AD160, 835CCE, B88E61, F8F781, D9C832, 0C5F1F, 6C141A
