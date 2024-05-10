(function() {
	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('площадь', 'большого круга');
	let measurements = [{
		name: 'радиус',
		power: 1,
	}, {
		name: 'объём',
		power: 3,
	}, /*{
		name: 'площадь поверхности',
		power: 2,
	}, *//*{
		name: 'площадь большого круга',
		power: 2,
	}, */].iz(2);
	
	let paint1 = function(ctx) {
		ctx.translate(-10, 50);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#809DF2";

		ctx.beginPath();
		if ([measurements[0].name.ie, measurements[1].name.ie].includes('площадь поверхности'))
			ctx.arc(100, 150, 80, 0, Math.PI * 2, true);
		else
		if ([measurements[0].name.ie, measurements[1].name.ie].includes('площадь большого круга'))
			ctx.ellipse(100, 150, 20, 80, Math.PI / 2, 0, 2 * Math.PI);

		ctx.fillStyle = ["#D777F2", "#F2A2D6"].iz();
		ctx.fill();
		ctx.closePath();

		//шар 1
		ctx.beginPath();
		ctx.arc(100, 150, 80, 0, Math.PI * 2, true); // Внешняя окружность
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.ellipse(100, 150, 20, 80, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.setLineDash([5, 5]);
		ctx.ellipse(100, 150, 20, 80, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
		ctx.stroke();
		ctx.closePath();
		ctx.drawLine(100, 150, 180, 150);

		//шар 2
		ctx.translate(200, 0);

		ctx.beginPath();
		if ([measurements[0].name.ie, measurements[1].name.ie].includes('площадь поверхности'))
			ctx.arc(100, 150, 100, 0, Math.PI * 2, true);
		else
		if ([measurements[0].name.ie, measurements[1].name.ie].includes('площадь большого круга'))
			ctx.ellipse(100, 150, 20, 100, Math.PI / 2, 0, 2 * Math.PI);

		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.setLineDash([0, 0]);
		ctx.arc(100, 150, 100, 0, Math.PI * 2, true); // Внешняя окружность
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.ellipse(100, 150, 20, 100, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
		ctx.stroke();

		ctx.beginPath();
		ctx.setLineDash([5, 5]);
		ctx.ellipse(100, 150, 20, 100, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
		ctx.stroke();

		ctx.drawLine(100, 150, 200, 150);

	};

	NAtask.setDilationTask({
		measurements: measurements,
		choosePhrase: 1,
		figureName: 'шар',
		dilationCoefficient: sl(2, 10),
		authors: ['Суматохина Ася'],
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
})();

//27072 5075 73287 520653 520694 26551 73243 73245 73247 73249 73251 73253 73255 73257 73259 73261 73263 73265 73267 73269 73271 73273 73275 73277 73279 73281 73283 73285  27097 74403 74405 74407 74409 74411 74413 74415