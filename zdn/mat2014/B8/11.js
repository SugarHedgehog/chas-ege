(function () {
	'use strict';

	let key = '11';
	let preference = ['centralAngle', 'inscribedAngle'];
	let rand = getSelectedPreferenceFromList(key, preference);

	let letters = latbukv.slice(0, 4);
	var t2 = ['центральный', 'вписанный'];
	var t3 = ['больше', 'меньше'];
	var t4 = ['вписанного', 'центрального'];
	var vpis = sl(1, 89);

	let paint1 = function (ctx) {
		ctx.lineWidth = om.primaryLineWidth;
		ctx.strokeStyle = om.secondaryBrandColors.iz();
		ctx.beginPath();
		ctx.arc(200, 200, 180, 0, 2 * Math.PI);
		ctx.stroke();

		ctx.strokeStyle = om.primaryBrandColors.iz();
		//центральный
		ctx.drawLine(200, 200, 320, 335);
		ctx.drawLine(200, 200, 80, 335);

		//вписанный
		ctx.drawLine(320, 335, 150, 25);
		ctx.drawLine(80, 335, 150, 25);

		ctx.font = "20px liberation_sans";
		ctx.textAlign = "center";
		ctx.fillText(letters[2], 320, 335 + 25); // C
		ctx.fillText(letters[1], 200, 200 - 5); // B
		ctx.fillText(letters[0], 80, 335 + 25); // A 
		ctx.fillText(letters[3], 150, 25 - 5); // D

	};

	NAtask.setTask({
		text: 'Найдите ' + t2[rand] + ' угол $ABC$, если он на $' + vpis +
			'^\\circ$ ' + t3[rand] + ' ' + t4[rand] + ' угла $ADC$, опирающегося на ту же дугу. Ответ дайте в градусах.',
		answers: rand ? vpis : vpis * 2,
		preference: preference,
	});
	NAtask.modifiers.variativeABC(letters);
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});

})();
//Обзад 245393
//Николай Авдеев
//refactoring by SugarHedgehog
