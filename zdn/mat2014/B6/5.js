(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		var a = sluchiz([20, 25, 40, 80, 100, 125])[0];
		var b = sluchch(2, a / 3);
		var c = sluchch(2, a / 3 - 2);
		var d = sluchch(2, a / 3 - 2);
		var g = a - b - c - d;
		var f = [b, c, d, g];
		
		f.forEach((elem) => genAssert(elem > 0));
		var t1 = sluchiz(om.strany.re, 4);
		let key = "5";
		var v1 = getListedPreference(key, [{
			preference: 'first',
			preferenceValue: sl(2),
		}, {
			preference: 'last',
			preferenceValue: 3,
		}], 3);
		var t2 = sluchiz(om.sport.pe)[0];
		genAssertZ1000(f[v1] / a);

		NAtask.setTask({
			text: 'В чемпионате по ' + t2 + ' участвуют ' + a + ' спортсменок: ' +
				b + ' из ' + t1[0] + ', ' + c + ' из ' + t1[1] + ', ' + d + ' из ' + t1[2] + ', остальные — из ' + t1[3] +
				'. Порядок, в котором выступают спортсменки, определяется жребием. ' +
				'Найдите вероятность того, что спортсменка, выступающая ' +
				sluchiz(['первой', 'последней', 'предпоследней', 'второй', 'третьей', sluchch(4, a) + '-ой'])[0] +
				', окажется из ' + t1[v1] + '.',
			answers: f[v1] / a,
			analys: '',
		});
	}, 100);
})();
