(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '27996';
		let preference = ['findV', 'findP'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let vp = ['V', 'p'][rand];

		let vod = sklonlxkand(['водоём', 'озеро', 'река', 'бассейн', 'море', 'пруд'].iz());
		let nazn = ['водолазный', 'газовый', ''].iz();
		let kol, gas;
		switch (nazn) {
			case 'водолазный':
				kol = sklonlxkand(['колокол', 'баллон'].iz());
				gas = sklonlxkand(['воздух', 'кислород'].iz());
				break;
			case 'газовый':
				kol = sklonlxkand(['баллон'].iz());
				gas = sklonlxkand(['воздух', 'гелий', 'кислород', 'газ', 'метан', 'пропан', 'бутан'].iz());
				break;
			default:
				kol = sklonlxkand(['баллон', 'шар', 'баклажка', 'ёмкость'].iz());
				gas = sklonlxkand(['воздух', 'гелий', 'кислород', 'газ', 'метан', 'пропан', 'бутан'].iz());
		}
		let nach = (nazn == '' ? '' : nazn + ' ') + kol.ve;

		let log_2 = sl(1, 6);//log_2(V1/V2)=A/avT - значение логарифма
		let V1 = sl(10, 200, 0.01);//V1 - начальный объем газа
		let V2 = V1 / Math.pow(2, log_2); //V2 - конечный объем газа
		let alpha = sl(4, 20, 0.01);//alpha - постоянная
		let nu = sl(1, 6, 0.01);//nu - кол-во вещества в молях
		let T = sl(273, 373, 0.01);//T - температура в Кельвинах
		let A = alpha * nu * T * log_2;//А - работа по сжатию газа в Дж

		genAssertZ1000(A * 0.1, 'Работа слишком дробная');
		genAssertZ1000(V2 * 0.1, 'Ответ слишком дробный');

		NAtask.setTask({
			text: nach.toZagl() + ', содержащ' + ['ий', 'ую', 'ее', 'ие'][kol.rod] +
				' в начальный момент времени $\\nu=' + nu + '~\\mbox{моль}$ ' + gas.re + ' ' + ['объёмом', 'при давлении'][rand] + ' ' +
				'$' + vp + '_1=' + V1 + '~\\mbox{' + ['л', ''][rand] + '}$, медленно опускают на дно ' + vod.re + '. При этом происходит изотермическое сжатие ' +
				gas.re + ' до конечного ' + ['объёма', 'давления'][rand] + ' $' + vp + '_2$' + [' (в л)', ''][rand] + '. Работа, совершаемая водой при сжатии ' + gas.re + ', ' +
				'вычисляется по формуле $A=\\alpha\\nu T\\log_2\\dfrac{' + vp + '_1}{' + vp + '_2}$, где $\\alpha=' + alpha +
				'\\dfrac{\\mbox{Дж}}{\\mbox{моль}\\cdot \\mbox{К}}$ – постоянная, $T=' + T + '~\\mbox{К}$ – температура ' +
				gas.re + '. Найдите, ' + 'как' + ['ой', 'ое'][rand] + ' ' + ['объём', 'давление'][rand] + ' $' + vp + '_2$ (в ' + ['литрах', 'атм'][rand] + ') будет ' + ['занимать', 'иметь'][rand] + ' ' + gas.ie + ' в ' + kol.pe + ', если при сжатии ' +
				gas.re + ' была ' + 'совершена работа в $' + A + '~\\mbox{Дж}$.',
			answers: V2,
			analys: '$\\log_2 \\dfrac{' + V1 + '}{' + vp + '_2}=' + log_2 + '$',
			authors: ['Aisse-258'],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 20000);
})();
//Aisse-258
// https://math-ege.sdamgia.ru/problem?id=27996
// https://math-ege.sdamgia.ru/problem?id=27997
