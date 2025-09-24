(function() {
	'use strict';
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '27971';
		let preference = ['more', 'less'];
		let rand = getSelectedPreferenceFromList(key, preference);

		var c = sluchch(315, 345, 5);
		var a = sluchch(5, 15);
		var v = 1000;
		for (; v > 20;) {
			v = (c * a * 10).sluchDel();
		}
		var f0 = c * a / v - a;
		var t1 = [
			['максимальной', 'не смог'],
			['минимальной', 'смог']
		][rand];

		NAtask.setTask({
			text: ('Перед отправкой тепловоз издал гудок с частотой $f_0 = ' + f0.ts() +
				'$ Гц. Чуть позже издал гудок подъезжающий к платформе ' +
				'тепловоз. Из-за эффекта Доплера частота второго гудка $f$ больше первого: ' +
				'она зависит от скорости тепловоза по ' +
				'закону $f(v)=\\frac{f_0}{1-\\frac{v}{c}}$ (Гц), где $c$ — скорость звука в воздухе (в м/с). ' +
				'Человек, стоящий на ' +
				'платформе, различает сигналы по тону, если они отличаются не менее чем на $' + a +
				'$ Гц. Определите, с какой ' + t1[0] +
				' скоростью приближался к платформе тепловоз, если человек ' + t1[1] + ' различить сигналы, а $c = ' + c +
				'$ м/с. ' +
				'Ответ выразите в м/с.').plusminus(),
			answers: v,
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://oge.sdamgia.ru/test?likes=27971
