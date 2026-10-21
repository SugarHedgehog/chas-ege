(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let preferenceHeight = ['first_taller', 'first_shorter'];
		let preferenceWidth = ['second_wider', 'second_narrower'];
		let preferenceQuestion = ['volume_greater', 'volume_smaller'];
		let firstTaller = getSelectedPreferenceFromList('523577', preferenceHeight) === 0;
		let secondWider = getSelectedPreferenceFromList('523577', preferenceWidth) === 0;
		let askGreater = getSelectedPreferenceFromList('523577', preferenceQuestion) === 0;
		let kh = sl(15, 45, 5) / 10;
		let kr = sl(15, 40, 5) / 10;
		let hRatio = firstTaller ? 1 / kh : kh;
		let rRatio = secondWider ? kr : 1 / kr;
		let ratio = hRatio * rRatio * rRatio;
		let secondBigger = ratio > 1;
		let ans = Math.max(ratio, 1 / ratio);
		genAssertAlmostInteger(ans, 'Ответ должен быть целым');
		ans = Math.round(ans);
		genAssert(ans >= 2, 'Объёмы должны различаться');
		let subject = (askGreater === secondBigger) ? 'второй' : 'первой';
		let other = subject === 'второй' ? 'первой' : 'второй';
		let factorText = function (k) {
			if (k === 1.5) return 'в полтора раза';
			if (k === 4.5) return 'в четыре с половиной раза';
			return 'в ' + chislitlx(k, 'раз', '$v');
		};
		let text = 'Даны две коробки, имеющие форму правильной четырёхугольной призмы, стоящей на основании. Первая коробка ' +
			factorText(kh) + ' ' + (firstTaller ? 'выше' : 'ниже') +
			' второй, а вторая ' + factorText(kr) + ' ' + (secondWider ? 'шире' : 'у́же') +
			' первой. Во сколько раз объём ' + subject + ' коробки ' + (askGreater ? 'больше' : 'меньше') +
			' объёма ' + other + '?';
		let analys = 'Объём пропорционален квадрату линейного размера основания и высоте. ' +
			'$V_2/V_1=(' + (secondWider ? kr.ts() : '1/' + kr.ts()) + ')^2\\cdot(' +
			(firstTaller ? '1/' + kh.ts() : kh.ts()) + ')$. ' +
			'Искомое отношение равно $' + ans + '$.';

		NAtask.setTask({
			text: text,
			answers: ans,
			preference: [preferenceHeight, preferenceWidth, preferenceQuestion],
			analys: analys,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 420,
			height: 300,
			paint: function (ct) {
				let a = 1, h = 2.2 * Math.sqrt(rRatio / hRatio);
				let a2 = rRatio, h2 = h * hRatio;
				let dx = Math.cos(Math.PI / 6), dy = Math.sin(Math.PI / 6);
				let gap = 0.4 * Math.max(a, a2);
				let totalW = (a + a2) * (1 + dx) + gap;
				let totalH = Math.max(h + a * dy, h2 + a2 * dy);
				let scale = Math.min(380 / totalW, 250 / totalH);
				ct.translate(20, 275);
				ct.scale(scale, -scale);
				ct.lineWidth = 2 / scale;
				let color = om.secondaryBrandColors.iz();
				let box = function (side, height) {
					ct.drawParallelepiped({ width: side, depth: side, height: height,
						angle: Math.PI / 6, strokeStyle: color }, [6, 8, 10], false, [5 / scale, 3 / scale]);
				};
				box(a, h);
				ct.translate(a * (1 + dx) + gap, 0);
				box(a2, h2);
			},
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
