(function() {
	'use strict';
	let key = '26738';
	let preference = ['same_base', 'diff_base'];
	let rand = getSelectedPreferenceFromList(key, preference);

	var a = sluchch(2, 19),
		b = sluchch(1, 3),
		c = sluchch(0.01, 0.99, 0.01),
		d = [b, slKrome(b, 1, 2)][rand],
		z = sluchch(1, 4),
		f = (z - b * c) / d,
		m = [
			[
				a.pow(b).toFixedLess(5).toStandart(),
				c.toFixedLess(5).toStandart()
			],
			[
				a.pow(d).toFixedLess(5).toStandart(),
				f.toFixedLess(5).toStandart()
			],
		].shuffle();

	chas2.task.setTask({
		text: ('Найдите значение выражения $$' + m[0][0] + '^{' + m[0][1] + '}\\cdot' + m[1][0] + '^{' + m[1][1] + '}$$').plusminus(),
		answers: a.pow(z),
		tags: {
			'log': 0,
			'prz': 0,
			'drs': 1,
			'tri': 0,
		},
	});

})();

//https://math-ege.sdamgia.ru/problem?id=26738
