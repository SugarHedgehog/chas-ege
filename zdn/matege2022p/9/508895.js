(function() {
	NAinfo.requireApiVersion(0, 2);
	function f(x) {
		return k*x +b;
	}
	let k = [1, 2, 3, 0.2, 0.4, 0.5, ].iz().pm();
	let b = sluchch(0, 3).pm();
	let chisl = sluchch(7, 20, 0.5).pm();

	let X = [],
		Y = [];
	for (let i = -6; i < 0; i++)
		if (f(i).isZ() && Math.abs(f(i)) < 6) {
			X.push(i);
			Y.push(f(i));
			//break;
		}
	for (let i = 6; i >= 0; i--)
		if (f(i).isZ() && Math.abs(f(i) < 6)) {
			X.push(i);
			Y.push(f(i));
			//break;
		}
	let paint1 = function(ct) {
		let h = 400;
		let w = 400;
		//Оси координат
		ct.drawCoordinatePlane (w, h, {
			hor: 1,
			ver: 1
		}, {
			x1: '1',
			y1: '1',
			sh1: 13,
		}, 20);
		//график
		
		let scale = 20;
		ct.scale(scale, -scale);
		ct.lineWidth = 2/scale;
		for (let i = -8.5; i < 8.5; i++)
			if (Math.abs(f(i-1)) < 8.5)
				ct.drawLine(i - 1, f(i-1), i, f(i));
			//точки
		graph9AmarkCircles(ct, [X,Y].T(), 2, 3/scale);
	};
	NAtask.setTask({
		text: `На рисунке изображён график функции $f(x)=kx+b$. Найдите `,
		questions: [
			{
				text: `$f(${chisl.ts()})$`,
				answer: f(chisl),
			},
			{
				text: `значение $x$, при котором $f(x)=${f(chisl).ts() }$`,
				answer: chisl,
				analys: `, $x=\\frac{${chisl}-${b}}{${k}}$`.plusminus(),
			},
		],
		postquestion: `.`,
		analys: `$f(x)=` + (k + `x+` + (b)).replace('+0', '').plusminus() + `$`,
	});
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
})();
//508895 508903
