retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	function f(x) {
		return a * x * x + b * x + c;
	}

	function fp(x) {
		return k * x + d;
	}
	let a = sl(0.1, 2, 0.1).pm();
	let b = sluchch(0, 10).pm();
	let c = sluchch(0, 10).pm();
	let D = b * b - 4 * a * c;
	let x0 = -b / (2 * a);
	let y0 = f(x0);
	if (D.isPolnKvadr() || Math.abs(y0) > 3)
		return;
	let points = intPoints(f, {
		minX: -5,
		maxX: 6,
		minY: -5.5,
		maxY: 5.5
	});
	let xk = sl(x0 - sl(0,4,0.1), x0 +sl(0,4,0.1) , 0.05);

	if (xk.abs() > 5)
		return;
		
	if (xk.abs() > 0 && xk.abs() < 1)
		return;
	let yk = f(xk);
	if (yk.abs() > 6 || (xk.isZ() && yk.isZ()) || yk.abs() < 1)
		return;
	let k = (2 * a * xk + b);
	if (!k || !(k * 100).isZ()|| k>0)
		return;
	let d = -xk * (2 * a * xk + b) + yk;
	let pointsP = intPoints(fp, {
		minX: -5,
		maxX: 6,
		minY: -5.5,
		maxY: 5.5
	});
	if (pointsP.length < 2)
		return;
	let paint1 = function(ct) {
		h = 300;
		w = 300;
		//Оси координат (сразу со стрелками)
		ct.drawCoordPlane(w, h, {
			hor: 1,
			ver: 1
		}, {
			x1: '1',
			y1: '1',
			sh1: 13,
		}, 20);
		//график
		ct.scale(20, -20);
		ct.lineWidth = 0.1;
		if (xk > x0)
			graph9AdrawFunction(ct, f, {
				minX: x0 - 1,
				maxX: 6.5,
				minY: -7.2,
				maxY: 6.5,
				step: 0.05,
			});
		else
			graph9AdrawFunction(ct, f, {
				minX: -5.5,
				maxX: x0 + 1,
				minY: -7.2,
				maxY: 6.5,
				step: 0.05,
			});
		graph9AdrawFunction(ct, fp, {
			minX: -5.5,
			maxX: 6.5,
			minY: -7.2,
			maxY: 6.5,
			step: 0.05,
		});

		graph9AmarkCircles(ct, pointsP, 2, 0.15);
		ct.strokeStyle = om.primaryBrandColors.iz();
		ct.setLineDash([0.5, 0.2]);
		if (yk > 0)
			ct.drawLine(xk, yk, xk, 0);
		else
			ct.drawLine(xk, 0, xk, yk);
		ct.fillStyle = om.secondaryBrandColors;
		graph9AmarkCircles(ct, [
			[xk, 0]
		], 2, 0.15);
		ct.font = "15px liberation_sans";
		ct.scale(1 / 20, -1 / 20);
		ct.fillStyle = 'black';
		ct.fillText('a', 20 * xk + 10, -10);
	};
	NAtask.setTask({
		text: 'На рисунке изображён график функции $y=f(x)$ и касательная к нему в точке с абсциссой $a$. Найдите ' + [
			'значение производной функции $f(x)$ в точке $a$.',
			'$f\'(a)$.'
			].iz(),
		answers: k,
		analys: 'Значение производной в точке касания равно угловому коэффициенту касательной:<br>'+
		'$y_k='+(k+'x+'+d.ts()).plusminus()+'$',
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 300,
		height: 300,
		paint: paint1,
	});
	return true;
}, 200000);
//2750502
