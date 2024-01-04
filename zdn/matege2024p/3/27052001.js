(function() {
	lx['образующая'] = {
		ie: 'образующая',
		ve: 'образующую',
		im: 'образующие',
		rod: 1,
		odu: 0,
	};

	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('радиус', 'основания');
	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
	lx_declareClarifiedPhrase('длина', 'основания');
	lx_declareClarifiedPhrase('полная площадь', 'поверхности');
	lx_declareClarifiedPhrase('площадь', 'окружности основания');
	lx_declareClarifiedPhrase('площадь', 'осевого сечения');

	lx['полная площадь поверхности'].ve = 'полную площадь поверхности';
	retryWhileError(function() {

		let radiusBig = sl(1, 50);
		let heightBig = sl(1, 50);

		let heightSmall = sl(1, heightBig - 1);
		let radiusSmall = radiusBig * heightSmall / heightBig;

		genAssert(heightSmall.isZ(), 'высота нормальная');

		let generatrixСoneBig = radiusBig.pow(2) + heightBig.pow(2);
		let generatrixСoneSmall = radiusSmall.pow(2) + heightSmall.pow(2);

		genAssert(generatrixСoneBig.sqrt().isZ(), 'Образующая нормальная');
		genAssert(generatrixСoneSmall.sqrt().isZ(), 'Образующая нормальная');
		let variable = [
			['площадь основания', radiusBig.pow(2) + '\\pi', radiusSmall.pow(2) + '\\pi'],
			['высота', heightBig, heightSmall],
			['площадь основания', radiusBig.pow(2) + '\\pi', radiusSmall.pow(2) + '\\pi'],
		];

		let name = sklonlxkand(variable.T()[0]);
		let numberBig = variable.T()[1];
		let numberSmall = variable.T()[2];
		
		genAssert(numberBig[1]/numberSmall[1]!==2);

		let secondWorld = name[1].ve.replace('площадь', 'площади').replace('боковой', 'боковых').replace('основания',
			'оснований').replace(
			'поверхности', 'поверхностей').replace('осевого', 'осевых').replace('сечения', 'сечений').replace('окружности',
			'окружностей');

		let ratio = [numberSmall[1], numberBig[1]];
		if (ratio[0].isString)
			ratio = ratio.map((elem) => Number(elem.replace('\\pi', '')));

		let variant = 0;

		let NOD = ratio[1].nod(ratio[0]);
		ratio = ratio.map((elem) => elem / NOD);

		let verb = ['делит его ' + secondWorld + ' на отрезки равные $' + [[numberSmall[1],numberBig[1]-numberSmall[1]].join('$ и $') + '$, считая от вершины', [numberSmall[1],numberBig[1]-numberSmall[1]].reverse().join('$ и $') +'$, считая от основания'].iz()+' конуса'
		][variant];

		let answer = numberSmall[2];

		let ps = '';
		if (answer.isString)
			if (answer.includes('pi')) {
				answer = answer.replace('\\pi', '');
				ps = 'Ответ сократите на $\\pi$.';
			}

		let paint1 = function(ctx) {
			//конус побольше
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#809DF2";
			//образующие
			ctx.drawLine(50, 300, 200, 10);
			ctx.drawLine(350, 300, 200, 10);
			//эллипс
			ctx.beginPath();
			ctx.ellipse(200, 300, 20, 150, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(200, 300, 20, 150, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			let frac = heightSmall / heightBig;
			let add = -3;
			if (frac < 0.5) {
				frac = 2 / 3;
				add = -4;
			} else
			if (frac > 0.5) {
				frac = 1 / 3;
				add = -3;
			}

			//радиус
			if (variable.T()[0].includes('радиус основания')) {
				ctx.drawLine(200, 300, 350, 300);
				ctx.drawLine(200, 300 * (1 - frac), 200 + (150 * (1 - frac) + add), 300 * (1 - frac));
			}
			//высота
			ctx.drawLine(200, 300, 200, 10);
			//диаметр
			if (variable.T()[0].includes('площадь осевого сечения') || variable.T()[0].includes('диаметр')) {
				ctx.drawLine(60, 300, 350, 300);
				ctx.drawLine(200 - (150 * (1 - frac) + add), 300 * (1 - frac), 200 + (150 * (1 - frac) + add), 300 * (1 - frac));
			}

			//конус поменьше
			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(200, 300 * (1 - frac), 10, 150 * (1 - frac) + add, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([0, 0]);
			ctx.ellipse(200, 300 * (1 - frac), 10, 150 * (1 - frac) + add, Math.PI / 2, -Math.PI / 2, -1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: name[0].ie.toZagl() + ' конуса ' + ['равен', 'равна'][name[0].rod] + ' $' + numberBig[0] +
				'$. Плоскость,' +
				' параллельная плоскости основания конуса, ' + ' ' +
				verb + '. ' +
				'Найдите ' + name[0].ve + ' ' + ['конуса, отсекаемого от данного конуса проведённой плоскостью',
					'меньшего конуса'
				].iz() + '. ' + ps,
			answers: '$' + answer + '$',
			authors: ['Суматохина Александра'],
			analys: name[0].ie.toZagl() + ': $' + numberSmall[2] + '$',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 10000);
})();
//27052 5021 72353 548506 548525 5023 5025 5027 5029 5031 5033 5035 27119 72305 72307 72309 72311 72313 72315 72317 72319 72321 72323 72325 72327 72329 72331 72333 72335 72337 72339 72341 72343 72345 72347 72349 72351 27161 76299 76343 76301 76303 76305 76307 76309 76311 76313 76315 76317 76319 76321 76323 76325 76327 76329 76331 76333 76335 76337 76339 76341 76345 76347
