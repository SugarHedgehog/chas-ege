(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict'

		let key = '135';
		let preference = ['degreeMeasureOfArc', 'angleACO'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let a = sl(2, 89);

		let vertices = om.latbukv.slice(0, 4);

		let question = [
			['Найдите величину меньшей дуги ', ' окружности. Ответ дайте в градусах'],
			['Найдите градусную меру дуги ', 'окружности, заключённой внутри этого угла']
		].iz();
		question.splice(1, 0, '$' + vertices.slice(0, 2).shuffle().join('') + '$');
		
		let arc = 90 - a;
		let CD = vertices.slice(2, 4).shuffle().join('');
		let AC = [vertices[0], vertices[2]].shuffle().join('');

		let paint1 = function(ctx) {
			ctx.lineWidth = om.primaryLineWidth;
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.beginPath();
			ctx.arc(130, 200, 120, 0, 2 * Math.PI);
			ctx.stroke();

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.drawLine(130, 200, 380, 200);
			ctx.drawLine(130, 200, 130 + 50, 200 - 110);
			ctx.drawLine(380, 200, 130, 200 - 137); //50:110

			//вписанный
			ctx.drawFilledCircle(130, 200, 2);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 130 + 50, 200 - 115);
			ctx.fillText(vertices[1], 130 + 120 + 10, 200 + 20);
			ctx.fillText(vertices[2], 380, 200 - 10);
			ctx.fillText(vertices[3], 130 - 20, 200);

		};

		NAtask.setTask({
			text: '',
			questions:[[{
				text: 'Угол $ACD$ равен $'+a+'^\\circ$, где $D$ – центр окружности. ' +
				'Его сторона $' + AC + '$ касается окружности. ' +
				'Сторона $' + CD + '$ пересекает окружность в точке $B$ ' +
				'(см. рис.). ' + question.join(' ') + '.',
				answers: arc,
			},{text: 'Найдите угол $ACD$, если его сторона $'+AC+'$ касается окружности, '+ 
			'$D$ — центр окружности, сторона $' + CD + '$ пересекает окружность в точке $B$, '+   
			'дуга $AB$ окружности, заключённая внутри этого угла, равна $'+arc+'^\\circ$. Ответ дайте в градусах.',
				answers: a,
			}][rand]],
			preference,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
// https://ege.sdamgia.ru/problem?id=27881
// https://ege.sdamgia.ru/problem?id=27884
