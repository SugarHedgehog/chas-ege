(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		'use strict';

		let letters = om.latbukv.slice(0, 3);
		let key = '8';
		let preference1 = ['sinA', 'sinB', 'cosA', 'cosB', 'tgA', 'tgB', 'ctgA', 'ctgB'];
		let preference2 = ['findTrigValue', 'findSide'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

		var a1 = om.pifagtr.iz();
		var c = sluchch(1, 10);
		var a = a1[0] * c,
			b = a1[1] * c,
			c = a1[2] * c;

		let trigFunc = ['\\sin{A}', '\\sin{B}', '\\cos{A}', '\\cos{B}', '\\tg{A}', '\\tg{B}', '\\ctg{A}', '\\ctg{B}'][rand1];
		let trigFuncValuesString = [a.frac(c), b.frac(c), b.frac(c), a.frac(c), a.frac(b), b.frac(a), b.frac(a), a.frac(b)][rand1];
		let trigFuncValues = [a / c, b / c, b / c, a / c, a / b, b / a, b / a, a / b][rand1];
		let sideValues = [c, b, a]

		let sides = ['AB', 'AC', 'BC'].map((elem, i) => ({
			vel: '',
			bkv: elem,
			zna: sideValues[i],
			rod: 1,
			vin: 1,
			nah: rand2 == 1,
		}));

		if (rand1 == 0 || rand1 == 3) {
			sides.pop();
		}

		if (rand1 == 1 || rand1 == 2) {
			sides.splice(2, 0);
		}

		if (rand2 == 0) {
			genAssertZ1000(trigFuncValues);
		}

		let paint1 = function (ctx) {
			ctx.lineWidth = om.primaryLineWidth;
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.drawLine(10, 350, 390, 350);
			ctx.drawLine(10, 350, 10, 50);
			ctx.drawLine(10, 50, 390, 350);

			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.arcBetweenSegments([10, 50, 10, 350, 390, 350], 20);

			ctx.font = "20px liberation_sans";
			ctx.textAlign = "center";
			ctx.fillText(letters[0], 10, 70 - 20);
			ctx.fillText(letters[1], 390, 350 + 20);
			ctx.fillText(letters[2], 10, 350 + 20);

		};

		NAtask.setCountableTask(
			[{
				zna: ['$' + trigFuncValuesString + '$', trigFuncValues][1 - rand2],
				nah: rand2 == 0,
				rod: 0,
				vel: '$' + trigFunc + '$',
			}].concat(sides).sluchiz(3), {
			preambula: 'В треугольнике $' + 'ABC'.shuffle() + '$ угол $C$ равен $90^\\circ$. ',
		}, {
			tags: {
				tri: 1
			},
			preference: [preference1, preference2],
		}
		);
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//Обзад
//Николай Авдеев
//refactoring by SugarHedgehog
