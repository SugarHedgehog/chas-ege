(function() {
	retryWhileError(function() {
		'use strict';
		let key = '2674101';
		let preference = ['positive_degree', 'negative_degree'];
        let rand = getSelectedPreferenceFromList(key, preference);

		var a = sluchch(2, 9),
			c = slKrome(a, 2, 9),
			b = slKrome(isZ, 0.1, 4.9, 0.1),
			f = sluchch(1, 4),
			d = slKrome(f, 1, 4),
			g = sluchch(1, [f, d].minE() - 1);
			
		genAssert(!(b + f).isZ());
		
		let aPow = ((b + f)*(-1).pow(rand)).toFixedLess(6).toStandart();
		let cPow = (b + d).toFixedLess(6).toStandart();
		let acPow = (b + g).toFixedLess(6).toStandart();
		let answ = a.pow(f + g + 2*b) * c.pow(g - d);

		genAssertZ1000(answ);
		genAssert((answ+'').length<6);

		chas2.task.setTask({
			text: (`Найдите значение выражения $$\\frac{${[`${a}^{${aPow}}`, `${a * c}^{${acPow}}`].shuffleJoin(`\\cdot`)}}{${c}^{${cPow}}}$$`).plusminus(),
			answers: answ,
			tags: {
				'log': 0,
				'prz': 0,
				'drs': 1,
				'tri': 0,
			},
            preference:preference,
		});
	}, 1000);
})();
//2674101
