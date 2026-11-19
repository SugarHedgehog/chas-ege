(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		function f(x) {
			return k / x + b;
		}

		let key = '508951';
		let preference1 = ['functionOfX', 'valueX'];
		let preference2 = ['withoutB', 'withB'];
		let randFind = getSelectedPreferenceFromList(key, preference1);
		let randB = getSelectedPreferenceFromList(key, preference2);

		let k = sluchch(1, 6).pm();
		let chisl = sluchch(8, 40, 4).pm();
		let b = [0, sluchch(1, 8).pm()][randB];
		genAssertZ1000(f(chisl));
		genAssert(Math.abs(f(chisl)) >= 8 || !f(chisl).isZ(), 'Спрашиваемый x виден на рисунке');

		if (randFind) {
			answ = chisl;
			find = `значение $x$, при котором $f(x)=${f(chisl).ts()}$`;
		} else {
			find = `$f(${chisl.ts()})$`;
			answ = f(chisl);
		}

		let points = intPoints(f, {
			minX: -7,
			maxX: 7,
			minY: -7,
			maxY: 7
		});
		let paint1 = function (ctx) {
			let h = 400;
			let w = 400;
			//Оси координат
			ctx.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, 20);

			ctx.lineWidth = 0.1;
			ctx.scale(20, -20);

			//график

			graph9AdrawFunction(ctx, f, {
				minX: -8.5,
				maxX: 8.5,
				minY: -9.5,
				maxY: 8.7,
				step: 0.05,
			});
			//точки
			graph9AmarkCircles(ctx, points, 2, 0.15);
		};
		NAtask.setTask({
				text: `На рисунке изображён график функции $f(x)=\\frac{k}{x}${(`+b`).esli(randB)}$. Найдите ${find}.`,
			answers: answ,
			analys: `$f(x)=\\frac {${k}}{x}+${b}$`.plusminus(),
			preference: [preference1, preference2],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//508951 508961
