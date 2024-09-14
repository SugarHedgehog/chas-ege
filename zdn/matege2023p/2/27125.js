(function() {
	retryWhileError(function() {

		let cube = sl(2, 10).pow(3);
		let radiusNew = cube;
		let radiuses = [];

		while (cube > 0) {
			radiuses.push(slKrome(radiuses, 2, cube));
			cube -= radiuses[radiuses.length - 1];
		}
		genAssert(radiuses.length < 5 && radiuses.length > 1, 'radiusNew');
		
		let radiusView = radiuses.map((elem) => elem.texcbrt(1));

		let paint1 = function(ctx) {
<<<<<<< HEAD
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.lineWidth = 2;
			//шар 1
			ctx.drawArc(200, 200, 150, 0, Math.PI * 2, true); 
			
			// Внешняя окружность
			ctx.drawEllipse(200, 200, 20, 150, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);

			ctx.setLineDash([5, 5]);
			ctx.drawEllipse(200, 200, 20, 150, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			
			ctx.strokeStyle = om.primaryBrandColors.iz();
=======
			ctx.strokeStyle = "#809DF2";
			ctx.lineWidth = 2;
			//шар 1
			ctx.beginPath();
			ctx.arc(200, 200, 150, 0, Math.PI * 2, true); // Внешняя окружность
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.ellipse(200, 200, 20, 150, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(200, 200, 20, 150, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();
			
			ctx.strokeStyle = ["#D777F2", "#F2A2D6"].iz();
>>>>>>> 131829577 ([zdn] [fix] - more color)
			ctx.drawLine(200, 200, 200, 50);
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: 'Радиусы ' + ['двух', 'трёх', 'четырёх'][radiuses.length - 2] + ' шаров равны ' + ('$' + radiusView.join(
				'$, $') + '$') + '. Найдите радиус шара, объем которого равен сумме их объемов.',
			answers: Math.cbrt(radiusNew),
			authors: ['Суматохина Александра'],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//27125 75307 75309 75311 75313
