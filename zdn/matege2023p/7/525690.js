(function() {
	retryWhileError(function() {
		'use strict';

		function f(x) {
			return spline.at(x);
		}

		function f1(x) {
			return k * x + b;
		}

		function f2(x) {
			return a * x + c;
		}
		NAinfo.requireApiVersion(0, 2);
		let a = sl(1, 10).pm();
		let c = sl(1, 20).pm();
		let d = sl(10, 500) / sl(100, 500);
		let maxX = sl(0, 10);
		let minX = maxX - sl(8, 10);

		let X = [];
		let Y = [];
		for (let i = minX; i <= maxX; i += sl(0.5, 4, 0.1))
			X.push(i);
		Y.push(sl(1, 6).pm());
		for (let i = 1; i < X.length; i++) {
			Y[i] = Y[i - 1] + sl(2, 10).pm();
		}
		let spline = new Spline(X, Y);
		let maximum = [];
		let minimum = [];
		let extremum = [];
		for (let i = minX; i < maxX; i += 0.1) {
			genAssert(f(i).abs() < 8, 'Слишком большой горбик');
			if (f(i) < f(i - 0.1) && f(i) < f(i + 0.1)) {
				minimum.push([i, f(i)]);
				extremum.push(i);
			}
			if (f(i) > f(i - 0.1) && f(i) > f(i + 0.1)) {
				maximum.push([i, f(i)]);
				extremum.push(i);
			}
		}
		let masK = [];
		let masB = [];
		for (let i = 0; i < extremum.length; i++) {
			let step = sl(minX + 1, maxX - 1).pm();
			let stepY = (0.5, 2, 0.5).pm();
			masK.push((stepY / step).okrugldo(0.01));
			masB.push((f(extremum[i]) - masK[i] * extremum[i]).okrugldo(0.01));
		}
		genAssertNonempty(masK, 'Пусто');
		let points;
		let xk, yk;
		let k;
		let b;
		for (let i = 0; i < masK.length; i++) {
			if (masK[i].abs() != Infinity) {
				k = masK[i];
				b = masB[i];
				points = intPoints(f1, {
					minX: -9.5,
					maxX: 9.5,
					minY: -6.5,
					maxY: 6.5
				});
				if (points.length < 1 || extremum[i] == 0) {
					k = undefined;
				} else {
					xk = extremum[i];
					yk = f(extremum[i]);
					break;
				}
			}
		}
		genAssert(k != undefined || k.abs() != 1, 'Не нашлось коэффициентов');
		genAssert((f2(k) * 100).isZ(), 'Плохой ответ');
		genAssert(yk.abs() > 1, 'Слишком близко к оси Ох');
		if (xk.isZ())
			xk += (sl(0.2, 0.7, 0.1)).pm();
		let letter;
		do {
			letter = slLetter();
		} while (['x', 'y', 'f', 'g'].includes(letter));
		let paint1 = function(ct) {
			let h = 380;
			let w = 500;
			ct.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, 20);

			ct.scale(20, -20);
			ct.lineWidth = 0.15;

			graph9AdrawFunction(ct, f, {
				minX: minX,
				maxX: maxX,
				minY: -9,
				maxY: 9,
				step: 0.01
			});

			ct.lineWidth = 0.13;
			graph9AdrawFunction(ct, f1, {
				minX: minX - 0.5,
				maxX: maxX + 0.5,
				minY: -8,
				maxY: 8,
				step: 0.01
			});
			ct.fillStyle = 'green';
			ct.strokeStyle = 'green';
			ct.lineWidth = 0.08;
			ct.setLineDash([0.5, 0.2]);
			if (yk > 0)
				ct.drawLine(xk, yk, xk, 0);
			else
				ct.drawLine(xk, 0, xk, yk);
			graph9AmarkCircles(ct, [
				[xk, 0]
			], 2, 0.15);

			ct.font = "15px liberation_sans";
			ct.scale(1 / 20, -1 / 20);
			if (yk > 0)
				ct.fillText(letter, 20 * xk + 10, 16);
			else
				ct.fillText(letter, 20 * xk + 10, -10);
		};
		NAtask.setTask({
			text: 'На рисунке изображены график функции $y=f(x)$ и касательная к этому графику, проведённая в точке $' +
				letter + '$. ' +
				'Уравнение касательной имеет вид: $f\'(x)=' + (k.ts(1) + ' x+' + b.ts(1)).plusminus() +
				'$. Найдите значение производной функции ' +
				'$g(x) = ' + (a + 'f(x)+' + c + 'x+' + d.texrndfrac(1)).plusminus() + '$ в точке $' + letter + '$.',
			answers: f2(k),
			analys: 'Значение производной в точке касания равно угловому коэффициенту касательной <br>' +
				'$k=' + k + '$<br>' +
				'Уравнение производной функции $g\'(x)=' + (a + 'f\'(x)+' + c).plusminus() + '$<br>' +
				'Тогда ответом будет ' + ('$g\'(' + letter + ')=' + a + 'f\'(' + letter + ')+' + c + '=' + a + '\\cdot(' + k +
					')+' + c + '=' + f2(k) + '$').plusminus()
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 400,
			paint: paint1,
		});
	});
})();
//SugarHedgehog
