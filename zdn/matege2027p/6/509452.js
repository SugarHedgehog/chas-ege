(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        // Математическое ожидание
        let EX = sluchch(2, 10);

        // Отклонение эпсилон
        let epsilon = sluchch(2, 5);

        // Границы интервала (EX - eps, EX + eps)
        let leftBound = EX - epsilon;
        let rightBound = EX + epsilon;

        let den = Math.pow(epsilon, 2);
        let DX = sluchch(1, den - 1);
        genAssert(DX >= 1, "Дисперсия слишком мала");

        // Расчет оценки по Чебышеву
        // P(|X - EX| >= eps) <= DX / eps^2
        let estimate = math.divide(DX, den);

        genAssertZ1000(estimate);
        genAssert(estimate < 1, "Оценка вероятности должна быть меньше 1");
        genAssert(estimate > 0, "Оценка вероятности должна быть больше 0");

        // Формирование текста условия
        // Событие: X <= leftBound или X >= rightBound
        let eventText = `$X \\le ${leftBound}$ или $X \\ge ${rightBound}$`;

        NAtask.setTask({
            text: `Про случайную величину $X$ известно, что $E(X) = ${EX}$ и $D(X) = ${DX}$. ` +
                `Найдите оценку вероятности события «${eventText}», которую даёт неравенство Чебышёва.`,
            answers: estimate,
            analys: `Неравенство Чебышёва утверждает: $P(|X - E(X)| \\ge \\varepsilon) \\le \\frac{D(X)}{\\varepsilon^2}$.` +
                `<br/>В данной задаче событие «$X \\le ${leftBound}$ или $X \\ge ${rightBound}$» равносильно событию «$|X - ${EX}| \\ge ${epsilon}$».` +
                `<br/>Здесь $\\varepsilon = ${epsilon}$, следовательно $\\varepsilon^2 = ${den}$.` +
                `<br/>Подставим значения в формулу: $P \\le \\frac{${DX}}{${den}} = ${estimate.ts()}$.`
        });

        NAtask.modifiers.allDecimalsToStandard(true);
    });
})();
//509452
