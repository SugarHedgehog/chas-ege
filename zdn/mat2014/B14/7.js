(function() {
	let key = "26585";
	let preference1 = ['river_speed', 'boat_speed', 'time_difference', 'total_distance', 'half_distance'];
	let preference2 = ['have_total_distance', 'have_half_distance'];
	let variant1 = getSelectedPreferenceFromList(key, preference1);
	var b = 0.5, x, a, s;
	for (; !(b.isZ() && b > 0);) {
		x = sluchch(5, 20);
		a = sluchch(2, x - 1);
		s = sluchch(10, 200);
		b = s / (x - a) - s / (x + a);
	}
	 
	/*
	Моторная лодка прошла против течения реки 112 км и вернулась в пункт отправления,
	затратив на обратный путь на 6 часов меньше.
	Найдите скорость течения,
	если скорость лодки в неподвижной воде равна 11 км/ч. Ответ дайте в км/ч.
	*
	*/
	chas2.task.setCountableTask([{
		vel: 'скорость течения',
		zna: a,
		rod: 1,
		nah: 1,
		nmn: 'км/ч',
	}, {
		vel: 'скорость лодки в неподвижной воде',
		zna: x,
		rod: 1,
		nah: (variant == 1),
		nmn: 'км/ч'
	}, {
		utv: 'лодка затратила на обратный путь на ' + chislitlx(b, 'час') + ' меньше',
		vpr: 'насколько меньше времени затратила лодка на обратный путь',
		zna: b,
		nah: (variant == 2)
	}, {
		vel: 'суммарное пройденное лодкой расстояние',
		zna: s * 2,
		rod: 2,
		nah: (variant == 3),
		nmn: 'км'
	}, {
		vel: 'пройденное лодкой расстояние '+['по течению', 'против течения'].iz(),
		zna: s,
		rod: 2,
		nah: (variant1 == 4),
		nmn: 'км'
	}][variant2], {
		preambula: 'Моторная лодка прошла против течения реки и вернулась в пункт отправления. ',
		preference: preference,
	});
})();
	 
//Обзад 26585 26586
//Николай Авдеев
//Рефактринг проводил  Shellge
//Довела до ума Суматохина Александра
