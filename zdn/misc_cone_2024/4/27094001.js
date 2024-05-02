(function() {
	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
	lx_declareClarifiedPhrase('радиус', 'основания');
	lx_declareClarifiedPhrase('длина', 'окружности основания');
	let measurements = 	[
			{
				name: 'радиус основания',
				power: 1,
			},  
			{
				name: 'объём',
				power: 2,
			}, 
			{
				name: 'высота',
				wordToClarify: true,
			},
	];
	let copy = measurements.map((num) => num);
	let paint1 = function(ctx) {
		ctx.lineWidth = 2;
		ctx.translate(30, 0);
		ctx.strokeStyle = "#809DF2";
		//образующие
		ctx.drawLine(0, 300, 150, 10);
		ctx.drawLine(300, 300, 150, 10);
		//эллипс
		ctx.ellipse(150, 300, 20, 150, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
		ctx.stroke();

		ctx.beginPath();
		ctx.setLineDash([5, 5]);
		ctx.ellipse(150, 300, 20, 150, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
		ctx.stroke();

		ctx.strokeStyle = ["#D777F2", "#F2A2D6"].iz();
		for (let i = 0; i < copy.length; i++) {
			//радиус
			if (copy[i].name.ie == 'радиус основания')
				ctx.drawLine(150, 300, 300, 300);
			//высота
			if (copy[i].name.ie == 'высота')
				ctx.drawLine(150, 300, 150, 10);
		}
	};

	NAtask.setDilationTask({
		measurements: measurements,
		choosePhrase: 2,
		figureName: 'конус',
		dilationCoefficient: sl(2, 10),
		PS: {
			proposal: [
				[' При этом '],
				['.']
			],
			verb: ['не изменился', 'не изменилась'],
		},
		authors: ['Суматохина Ася'],
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
})();
// 27094 74259 500893 501191 526210 74261 74263 74265 74267 74269 74271 74273 74275 74277 74279 74281 74283 74285 74287 74289 74291 74293 74295 74297 74299 74301 74303 74305 27095 74307 548260 548288 561170 561222 74309 74311 74313 74315 74317 74319 74321 74323 74325 74327 74329 74331 74333 74335 74337 74339 74341 74343 74345 74347 74349 74351 74353 27136 75697 75699 75701 75703 75705 75707 75709 75711 75713 75715 75717 75719 75721 75723 75725 75727 75729 75731 75733 75735 75737 75739 75741

