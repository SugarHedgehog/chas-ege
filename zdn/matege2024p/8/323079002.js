(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict';

		function f(x) {
			return a * x * x + b * x + c;
		}
		let a = sluchch(0.1, 1, 0.1).pm();
		let b = sluchch(1, 10).pm();
		let c = sluchch(0, 10).pm();

		let minX = -8.5,
			maxX = 8.5,
			minY = -9.5,
			maxY = 7.5;

		let D = b * b - 4 * a * c;
		let x1 = 0.5 * (-b + D.sqrt()) / a;
		let x2 = 0.5 * (-b - D.sqrt()) / a;

		genAssert(D.isPolnKvadr(), 'Плохой дискриминант');
		genAssert(x1.isZ() && x2.isZ(), 'Корни не целые');

		let x0 = -b / (2 * a);
		genAssert(x0.abs() < maxX / 2, 'x0 вне зоны видимости');
		
		let y0 = f(x0);
		genAssert(y0<0, 'y>0');
		genAssert(y0.abs() > 2 && y0.abs() < maxY / 2, 'y0 вне зоны видимости');

		let points = intPoints(f, {
			minX: minX,
			maxX: maxX,
			minY: minY,
			maxY: maxY
		});

		genAssert(points.length > 2, 'Мало точек');

		if (D > 0) {
			points = [x1, x2];
		} else {
			points = points.iz(2).T()[0];
		}

		let leftEnd = [points[0], points[points.length - 1]].minE();
		let rightEnd = [points[0], points[points.length - 1]].maxE();

		let primitive = [c, b, a].mn_pervoobr();
		let answ = primitive.mn_vychisl(rightEnd) - primitive.mn_vychisl(leftEnd);

		genAssert((answ * 100).isZ(), 'Ответ не целый');

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			let scale = 20;
			ctx.drawCoordPlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, scale);
			ctx.scale(scale, -scale);
			ctx.lineWidth = 0.07;
			graph9AdrawFunction(ctx, f, {
				minX: minX,
				maxX: maxX,
				minY: minY,
				maxY: maxY,
				step: 0.05,
			});

			let length = 5 / scale;

			ctx.drawLine(rightEnd, length, rightEnd, -length);
			ctx.drawLine(leftEnd, length, leftEnd, -length);

			ctx.fillFunctionArea({
				func: f,
				leftEnd: leftEnd,
				rightEnd: rightEnd,
			});

			ctx.scale(1 / scale, -1 / scale);
			ctx.fillStyle = 'black';
			if (rightEnd != 0 && rightEnd != 1)
				ctx.fillText(rightEnd, scale * rightEnd + 3, (a < 0) ? -5 : 15);
			if (leftEnd != 0 && leftEnd != 1)
				ctx.fillText(leftEnd, scale * leftEnd - 13, (a < 0) ? -5 : 15);
		};
		NAtask.setTask({
			text: 'На рисунке изображён график некоторой функции $y = f(x)$ . Функция $F (x )= ' + (primitive.mn_txt('x') +
					'+' + sl(1, 100).pm()).plusminus() +
				'$ – одна из первообразных функции $f(x)$. Найдите площадь закрашенной фигуры.',
			answers: answ.abs(),
			authors: 'Суматохина Александра',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 20000);
})();

//323079: 323283 323373 323375 323379 323285 323287 323289 323291 323293 323295 323297 323299 323301 323303 323305 323307 323309 323311 323313 323315 323317 323319 323321 323323 323325 323327 323329 323331 323333 323335 323337 323339 323341 323343 323345 323347 323349 323351 323353 323355 323357 323359 323361 323363 323365 323367 323369 323371 323377 323381
//323080: 323383 323475 323477 323385 323387 323389 323391 323393 323395 323397 323399 323401 323403 323405 323407 323409 323411 323413 323415 323417 323419 323421 323423 323425 323427 323429 323431 323433 323435 323437 323439 323441 323443 323445 323447 323449 323451 323453 323455 323457 323459 323461 323463 323465 323467 323469 323471 323473 323479 323481
