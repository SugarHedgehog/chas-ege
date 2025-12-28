(function() {
	retryWhileError(function() {
		'use strict';
		let m = ['первые', 'последние'];
		let key = "77438";
		let v1 = sl1();
		let v2 = getListedPreference(key, [{
			preference: 'first_day',
			preferenceValue: 0,
		}, {
			preference: 'last_day',
			preferenceValue: 1,
		}], sl1());

		let g = sluchch(1, 3);
		let a = sluchch(2, 4);
		let b = sluchch(a + 3, 20);
		let c = sluchch(3, 6) * g * (b - a);
		let d = sluchch(3, 7) * g * a;
		let f = a * c + (b - a) * d;
		let h = [c, d][(v1 - v2).abs()] / f;

		genAssertZ1000(h);

		let n = [
			[sluchch(1, a) + '-й', 'первый', 'второй'],
			[b + 1 - sluchch(1, a) + '-й', 'последний', 'предпоследний']
		];

		NAtask.setTask({
			text: ['Научная конференция', 'Песенный конкурс'].iz() + ' проводится в ' + chislitlx(b, 'день') +
				'. Всего запланировано ' + chislitlx(f, 'выступление') +
				' — ' + m[v1] + ' ' + a + ' дня по ' + chislitlx(c, 'выступление') +
				', остальные распределены поровну между оставшимися днями. ' +
				'Порядок выступлений определяется жеребьёвкой. Какова вероятность, что выступление товарища ' + om.rusbukv.iz() +
				'. окажется запланированным на ' + n[v2].iz() + ' день мероприятия?',
			answers: h,
		});
	}, 100);
})();
//77438
