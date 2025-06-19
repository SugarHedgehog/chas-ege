(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = "169853";
		let preference = ['A', 'B', 'C']
		let variant = getListedPreference(key, preference.map((pref, index) => ({
            preference: pref,
            preferenceValue: index
        })), sl(preference.length - 1));

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(3, 15),
				lengthBC: sl(3, 15),
				lengthCA: sl(3, 15),
			},
			supplementary: {
				calculateHeights: true,
			}
		});
		genAssert(![triangle.lengthBC, triangle.lengthCA].hasDubl(), 'Две стороны треугольника должны быть разными');

		[triangle.angleAInDegrees, triangle.angleBInDegrees, triangle.angleCInDegrees].forEach(angle => genAssert(angle < 85, 'Треугольник не остроугольный'));

		let height = [triangle.heightALength, triangle.heightBLength, triangle.heightCLength][variant];
		genAssertZ1000(height);

		triangle.addVertexToConnectionMatrix([triangle.heightAEndPoint, triangle.heightBEndPoint, triangle.heightCEndPoint][variant], ['A', 'B', 'C'][variant]);

		let side = [triangle.lengthBC, triangle.lengthCA, triangle.lengthAB][variant];

		let points = autoScale(triangle.vertices);
		let pointsAngle = points.slice(0, 3);
		let pointCentralAngle = pointsAngle.splice(variant, 1)[0];

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([pointCentralAngle.x, pointCentralAngle.y, points[3].x, points[3].y, pointsAngle[0].x, pointsAngle[0].y], 15, true);
		};

		NAtask.setTask({
			text: `Сторона треугольника равна $${side}$, 
			а высота, проведённая к этой стороне, равна 
			$${height}$. Найдите площадь этого треугольника.`,
			answers: triangle.area(),
			authors: ['Александра Суматохина'],
			preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
//169853 349889 349907 350059 350178 350704 350773 350912 351364 351999 352436 436856 193883 193913 193943 193973 402020 402032 402133 402221 402596 402644 402734 403003 403372 403645
