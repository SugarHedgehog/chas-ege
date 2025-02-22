(function() {
	'use strict';
	retryWhileError(function() {

		let key = "15";
		let preference = ['distance', 'ratio_of_speeds'];
		let rand = getListedPreference(key, preference.map((pref, index) => ({
			preference: pref,
			preferenceValue: index
		})), sl(preference.length - 1));

		var stations = om.rusbukv.iz(2).map(letter => letter + '.');

		var name = sklonlxkand(window.imenaj.ie.iz());

		do {
			var distanceBetweenStations = sl(1.5, 10, 0.5);
			var distanceToLeftStation = sl(0.100, 2.000, 0.001);
			var answer = distanceBetweenStations * distanceToLeftStation / (distanceBetweenStations - 2 *
				distanceToLeftStation)
		} while (!(1000 * answer).isZ() || answer <= 0 || answer >= 20);
		
		genAssertZ1000(answer / distanceToLeftStation);

		NAtask.setTask({
			text: 'Между остановками ' + stations[0] + ' и ' + stations[1] + ' ' +
				chislitlx(distanceBetweenStations, 'километр') + ' прямой трассы. ' +
				name.ie + ' выехала на велосипеде из леса между станциями в ' +
				chislitlx(distanceToLeftStation * 1000, 'метр') +
				' от ' + stations[0] + ' и увидела, что к ' + stations[0] + ' в направлении к ' + stations[1] +
				' с постоянной скоростью подъезжает автобус, на который ' + name.de + ' нужно успеть. ' +
				'Она заметила, что если она сейчас поедет в сторону ' + stations[0] +
				', она окажется там одновременно с автобусом. ' +
				'Но и если она поедет в сторону ' + stations[1] + ', она также окажется там одновременно с автобусом, ' +
				'который успеет преодолеть весь участок от ' + stations[0] + ' до ' + stations[1] +
				', не останавливаясь на остановке ' + stations[0] + ' ',
			questions: [[{
				text: 'Каково сейчас расстояние (в км) между ' + name.te + ' и автобусом?',
				answers: answer + distanceToLeftStation,
			}, {
				text: [
					'Во сколько раз скорость автобуса больше скорости велосипеда?',
					'Во сколько раз скорость велосипеда меньше скорости автобуса?',
				].iz(),
				answers: answer / distanceToLeftStation,
			}][rand]],
			postquestion: ' (Считайте, что автобус и велосипед движутся с постоянными скоростями и останавливаются мгновенно.)',
				// TODO: во сколько раз cкорость призрака меньше скорости поезда?
			preference: preference,
		});
	}, 2000);
})();

//Николай Авдеев
