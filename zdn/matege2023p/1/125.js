(function() {
	'use strict';
	let key = '125';
	let preference = ['centralAngle', 'inscribedAngle'];
	let rand = 1;getSelectedPreferenceFromList(key, preference);

	let angle = sl(10, 85);
	let letters = om.latbukv.slice(0, 5);

	let subangle1 = [letters[4], letters[0], letters[3]];
	if (sl1())
		subangle1 = subangle1.permuteCyclic(2);
		
	let subangle2 = [
		[letters[1], letters[2]],
		[letters[0], letters[3]]
	].iz();
	subangle2.splice(1, 0, letters[4]);
	
	let condition = [[subangle1.join(''), 180 - angle * 2], [subangle2.join(''), angle]];
	
	if(rand){
		condition = condition.reverse();
	}

	let circle = new Circle(new Point(0, 0), 180);

	let startAngle = -sl(0, 79);
	let AB = circle.diameter(startAngle, {
		angleInDegrees: true
	});
	let CD = circle.diameter(startAngle + 2*angle, {
		angleInDegrees: true
	});

	let connectionMatrix = [
		[1],
		[0, 0],
		[1, 0, 1]
	];

	let points = [AB.pe, AB.ps, CD.pe, CD.ps, circle.pc];

	let paint = function(ctx) {
		let h = 400;
		let w = 400;

		ctx.translate(w / 2, h / 2);

		ctx.scale(1, -1);
		ctx.strokeStyle = om.secondaryBrandColors;

		ctx.lineWidth = 2;
		ctx.drawArc(0, 0, 180, 0, 2 * Math.PI);
		ctx.strokeStyle = om.primaryBrandColors.iz();
		ctx.drawFigure(points, connectionMatrix);
		ctx.drawFilledCircle(0, 0, 3);

		ctx.scale(1, -1);
		ctx.font = "20px liberation_sans";
		ctx.textAlign = "center";
		points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i % 2) ? 25 : -5)));
	};

	NAtask.setTask({
		text: 'Отрезки $' + [letters.slice(0, 2).shuffleJoin(), letters.slice(2, 4).shuffleJoin()].shuffleJoin('$ и $') +
			'$ – диаметры окружности с центром $' + letters[4] +
			'$. Угол $' + condition[0][0] + '$ равен $' + condition[1][1] + '^\\circ$. Найдите угол $' + condition[1][0] +
			'$. Ответ дайте в градусах.',
		answers: condition[0][1],
		preference, 
	});
	//NAtask.modifiers.variativeABC(letters);
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint,
	});

})();
//125
