(function() {
	'use strict';
	
	let key = '6';
	let preference1 = ['2', '3', '4', '5'];
	let powerRand = getSelectedPreferenceFromList(key, preference1);		 
	let preference2 = ['linearPart', 'denominatorPart', 'numeratorPart'];
	let partRand = getSelectedPreferenceFromList(key, preference2);		 

	var b = sluchch(1, 9).pm();
	var power = Number(preference1[powerRand]);
	var c = sluchch(1, 9);
	if (power % 2) {
		c *= [1, -1].iz();
	}
	var x = sluchch(1, 9);
	var a = c.pow(power) - b * x;
	var textpower = ('[' + power + ']').esli(power != 2);

	var numerator = sl(1, 9);
	var multiplier = sl(1, 9);

	var parts = [
		['\\sqrt' + textpower + '{' + [a, b + 'x'].slag0() + '}', c],
		['\\sqrt' + textpower + '{\\frac{' + numerator.pow(power) * multiplier + '}{' + [('' + a * multiplier).esli(a *	multiplier), b * multiplier + 'x'].slag() + '}}', numerator.texrndfrac(c)],
		['\\sqrt' + textpower + '{\\frac{' + [('' + a * multiplier).esli(a * multiplier), b * multiplier + 'x'].slag() + '}{' + numerator.pow(power) * multiplier + '}}', c.texrndfrac(numerator)
		],
	][partRand];


	chas2.task.setEquationTask({
		parts: parts,
		roots: x,
		enablePartsSubtraction: 1,
		preference: [preference1, [preference2]],
	});
})();
// В том числе РешуЕГЭ 501205
