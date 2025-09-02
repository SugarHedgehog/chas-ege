(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict';
		let key = '26755';
		let preference = ['integer', 'not_integer'];
		let rand = getSelectedPreferenceFromList(key, preference);

		var a = slKrome([90, 180, 270], 1, 359);
		var at = '{' + a.ts() + '^\\circ}';
		var b = [sl(2, 400), sl(2, 400)+sl(1, 9)/10][rand].pm();
		var c = (2).pow(sl(-2, 4)) * (5).pow(sl(-2, 4)).pm();
		
		if(rand==0){
			genAssertAlmostInteger(c);
		}

		var f = [
			['\\sin', '\\cos'],
			['\\tg', '\\cos^2'],
			['\\sin^2', '\\ctg']
		].iz().shuffle();

		var vyr1 = [f[0] + at, f[1] + at].shuffle().join('\\cdot');
		var vyr2 = [
				'\\sin' + (2 * a).ts() + '^\\circ',
				'\\sin' + (360 + 2 * a).ts() + '^\\circ',
				'\\cos' + (90 - 2 * a).negativeBrackets() + '^\\circ',
				'\\cos' + (450 - 2 * a).negativeBrackets() + '^\\circ',
			].iz()
			.replace(')^\\circ', '^\\circ)'); // A sever co-style! TODO!

		var y, answer;
		if (sl1()) {
			y = '\\frac{' + b.ts() + '~' + vyr1 + '}{' + c.ts().esli(c!=1) + '~' + vyr2 + '}';
			answer = b / (2 * c);
		} else {
			y = '\\frac{' + b.ts() + '~' + vyr2 + '}{' +
				c.ts().esli(c!=1) + '~' + vyr1 + '}';
			answer = b * 2 / c;
		}
		
		genAssertZ1000(answer);

		chas2.task.setTask({
			text: ('Найдите значение выражения $$' + y + '$$').plusminus().ts(),
			answers: answer,
			tags: {
				'log': 0,
				'prz': 0,
				'drs': 0,
				'tri': 1,
			},
		});
	}, 1000);
})();
//Обзад 26755
//Николай Авдеев
//TODO: https://ege.sdamgia.ru/problem?id=97869
