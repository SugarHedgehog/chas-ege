(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let number = sl(2, 400, 2);
        let den = slKrome(number, 2, 400);

        let angle = slKrome([90, 180, 270], 1, 359);

        let angles = [angle, (90 - angle).negativeBrackets()].shuffle();
        let func = ['sin', 'cos'].iz();

        let text = [`${number}\\sin{${2 * angle}^\\circ}`,
        den + angles.map((elem, i) => `\\${func}{${elem}}^\\circ`).join(`\\cdot`)
        ];

        let answ = 2 * number / den;

        if (sl1()) {
            text = text.reverse();
            answ = den / (2 * number);
        }

        genAssertAlmostInteger(answ * 10);

        NAtask.setTask({
            text: `Найдите значение выражения
				$$\\frac{${text.join(`}{`)}}$$`.replace(')^\\circ', '^\\circ)'),
            answers: answ,
            analys: '',
            authors: ['Суматохина Александра'],
        });
    });
})();

// https://ege.sdamgia.ru/problem?id=97869
