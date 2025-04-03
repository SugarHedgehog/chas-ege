(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let side = sl(3, 15);

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(8, 15),
				lengthBC: side,
				lengthCA: side,
			},
			supplementary: {
				calculateMedians: true,
			}
		});

		genAssert(triangle.medianCLength.isAlmostInteger(), 'Площадь трапеции не целая');

		NAtask.setTask({
			text: `В треугольнике каждая из двух сторон равна $${triangle.lengthBC}$, а третья сторона равна $${triangle.lengthAB}$. Найдите длину медианы, проведённой к третьей стороне треугольника.`,
			answers: triangle.medianCLength,
			authors: ['Александра Суматохина'],
		});
	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://oge.sdamgia.ru/problem?id=339450
