(function() {
	retryWhileError(function() {
		'use strict';
		let m = ['первые', 'последние'];
		let v1 = sl1();
		let v2 = sl1();

		let g = sluchch(1, 3);
		let a = sluchch(2, 4);
		let b = sluchch(a + 3, 20);
		let c = sluchch(3, 6) * g * (b - a);
		let d = sluchch(3, 7) * g * a;
		let f = a * c + (b - a) * d;
		let h = [c, d][(v1 - v2).abs()] / f;

		genAssertZ1000(h);

		let key = "6";
		let n = [
			[sluchch(1, a) + '-й', 'первый', 'второй'],
			[b + 1 - sluchch(1, a) + '-й', 'последний', 'предпоследний']
		];

		n = getListedPreference(key, [{
			preference: 'first_day',
			preferenceValue: n[0],
		}, {
			preference: 'last_day',
			preferenceValue: n[1],
		}], n[v2]);

		let event = ['Научная конференция', 'Песенный конкурс'];
		event = getListedPreference(key, [{
			preference: 'first_day',
			preferenceValue: event[0],
		}, {
			preference: 'last_day',
			preferenceValue: event[1],
		}], event.iz());

		NAtask.setTask({
			text: event + ' проводится в ' + chislitlx(b, 'день') +
				'. Всего запланировано ' + chislitlx(f, 'выступление') +
				' — ' + m[v1] + ' ' + a + ' дня по ' + chislitlx(c, 'выступление') +
				', остальные распределены поровну между оставшимися днями. ' +
				'Порядок выступлений определяется жеребьёвкой. Какова вероятность, что выступление товарища ' + om.rusbukv.iz() +
				'. окажется запланированным на ' + n.iz() + ' день мероприятия?',
			answers: h,
		});
	}, 100);
})();
//77438
