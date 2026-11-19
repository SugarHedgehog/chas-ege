(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '27758';
		let preference = ['findAngleA', 'findAngleBDC', 'findAngleC', 'findAngleCBDOrABD'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let angleC = sl(20, 44);
		let angleCBD = sl(91, 160) / 2;
		let angleBDC = 180 - angleC - angleCBD;
		let angleA = 180 - angleC - 2*angleCBD;
		
		genAssert(angleA > 0, 'Слишком большие углы');

		let vertices = om.latbukv.slice(0,4);
		let condition = [
			[vertices[0], angleA],
			['BDC', angleBDC],
			[vertices[2], angleC],
			[['A', 'C'].iz()+'BD', angleCBD]
		];

		let find = condition.splice(rand, 1)[0];
		condition = condition.iz(2);
		condition.push(find);

		let paint1 = function(ctx) {
			ctx.lineWidth = om.primaryLineWidth;
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.drawLine(10, 370, 380, 370);
			let ver = ctx.drawLineAtAngle(10, 370, -Math.PI / 2.8, 325);
			ctx.drawLine(ver.x, ver.y, 380, 370);

			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.drawLineAtAngle(10, 370, -0.5 * Math.PI / 2.8, 300 - 6);

			ctx.strokeStyle = om.primaryBrandColors[1];
			ctx.drawArc(10, 370, 40, 0, -0.5 * Math.PI / 2.8, true);
			ctx.drawArc(10, 370, 30, -0.5 * Math.PI / 2.8, -Math.PI / 2.8, true);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], ver.x - 5, ver.y - 5);
			ctx.fillText(vertices[1], 10 - 5, 370 + 20);
			ctx.fillText(vertices[2], 380, 370 + 20);

			ctx.fillText(vertices[3], 270 - 2, 220 - 5);

		};

		NAtask.setTask({
			text: `В треугольнике $${vertices.slice(0, 3).shuffleJoin()}$ $${[vertices[1], vertices[3]].shuffleJoin()}$ – биссектриса, угол $${condition[0][0]}$ равен $${condition[0][1]}^\\circ$, угол $${condition[1][0]}$ равен $${condition[1][1]}^\\circ$. Найдите угол $${condition[2][0]}$. Ответ дайте в градусах.`,
			answers: condition[2][1],
			analys: '',
			preference,
		});
		NAtask.modifiers.variativeABC(vertices);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//27758 47055 47057 47059 47061 47063 47065 47067 47069 47071 47073 47075 47077 47079 47081 47083 47085 47087 47089 47091 47093 47095 47097 47099 47101 47103 563889
