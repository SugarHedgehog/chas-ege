(function() {
	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('площадь', 'большого круга');
	lx_declareClarifiedPhrase('длина', 'большого круга');
	lx_declareClarifiedPhrase('площадь', 'сечения шара плоскостью, проходящей через центр');

	retryWhileError(function() {
		
		let key = '27059';
		let preference1 = ['givenRadius', 'givenDiameter', 'givenCircumference', 'givenGreatCircleArea', 'givenCrossSectionalArea', 'givenSurfaceArea', 'givenVolume'];
		let preference2 = ['findRadius', 'findDiameter', 'findCircumference', 'findGreatCircleArea', 'findCrossSectionalArea', 'findSurfaceArea', 'findVolume'];
		let randGiven = getSelectedPreferenceFromList(key, preference1);
		let randFind = getSelectedPreferenceFromList(key, preference2);
		
		genAssert(randGiven!=randFind, 'Дано и вопрос совпадают');

		let radius = sl(1, 50);

		let variable = [
			['радиус', radius],
			['диаметр', radius * 2],
			['длина большого круга', 2 * radius + '\\pi'],
			['площадь большого круга', radius.pow(2) + '\\pi'],
			['площадь сечения шара плоскостью, проходящей через центр', radius.pow(2) + '\\pi'],
			['площадь поверхности', 4 * radius.pow(2) + '\\pi'],
		];

		if (!(radius % 3)){
			variable.push(['объём', 4 * radius.pow(3) / 3 + '\\pi']);} 
		else {
			genAssert(!(randGiven== 6 || randFind== 6), 'Объем не определен');
		}

		let condition = [variable[randGiven], variable[randFind]];
		let name = sklonlxkand(condition.T()[0]);
		let value = condition.T()[1];
		let answer = value[1];

		let ps = '';
		if (answer.includes('pi')) {
			answer = answer.replace('\\pi', '');
			ps = 'Ответ разделите на $\\pi$.';
		}

		let paint1 = function(ctx) {

			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			//шар 1
			ctx.beginPath();
			ctx.arc(200, 200, 150, 0, Math.PI * 2, true); // Внешняя окружность
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.ellipse(200, 200, 30, 150, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(200, 200, 30, 150, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			ctx.strokeStyle = om.primaryBrandColors.iz();

			ctx.drawLine(200, 200, 200, 50);

		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: name[0].ie.toZagl() + ' шара'+','.esli(randGiven == 4)+' ' + ['равен', 'равна'][name[0].rod] + ' $' + value[0] + '$. ' +
				'Найдите ' + name[1].ve + ' шара. ' + ps,
			answers: answer,
			authors: ['Суматохина Александра'],
			analys: name[1].ie.toZagl() + ': $' + value[1] + '$',
			preference: [preference1, preference2],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1500);
})();
//27059 5049 27185 72765 72719 72721 72723 72725 72727 72729 72731 72733 72735 72737 72739 72741 72743 72745 72747 72749 72751 72753 72755 72757 72759 72761 72763
