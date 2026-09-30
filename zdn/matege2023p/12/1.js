retryWhileError(function () {
    NAinfo.requireApiVersion(0, 2);
    
    let key = '1';
	let preference = ['loanAmount', 'interestRate', 'totalPayment', 'overpayment', 'loanTerm', 'minLoanTerm'];
    let variant = getSelectedPreferenceFromList(key, preference);

    // Генерируем точные суммы, кратные 1000 рублей.
    let gcd = function (a, b) {
        while (b !== 0n) {
            let remainder = a % b;
            a = b;
            b = remainder;
        }
        return a;
    };

    let candidates = [];

    for (let rate = 1; rate <= 50; rate++) {
        for (let term = 2; term <= 4; term++) {
            let growth = BigInt(100 + rate) ** BigInt(term);
            let base = 100n ** BigInt(term);

            // S/v = 100 * (growth - base) / (rate * growth).
            let numerator = 100n * (growth - base);
            let denominator = BigInt(rate) * growth;
            let divisor = gcd(numerator, denominator);

            let amountStep = 1000n * (numerator / divisor);
            let paymentStep = 1000n * (denominator / divisor);

            if (amountStep > 10000000n || paymentStep > 1000000n) {
                continue;
            }

            let amountUnit = Number(amountStep);
            let paymentUnit = Number(paymentStep);

            let minMultiplier = Math.max(
                1,
                Math.ceil(50000 / amountUnit),
                Math.ceil(5000 / paymentUnit)
            );
            let maxMultiplier = Math.min(
                Math.floor(10000000 / amountUnit),
                Math.floor(1000000 / paymentUnit)
            );

            if (minMultiplier <= maxMultiplier) {
                candidates.push({
                    rate,
                    term,
                    amountUnit,
                    paymentUnit,
                    minMultiplier,
                    maxMultiplier
                });
            }
        }
    }

    genAssert(candidates.length > 0, 'Нет допустимых параметров кредита');

    let selected = candidates[sl(0, candidates.length - 1)];
    let multiplier = sl(selected.minMultiplier, selected.maxMultiplier);

    let r = selected.rate;
    let n = selected.term;
    let S = selected.amountUnit * multiplier;
    let v = selected.paymentUnit * multiplier;
    let x = n * v;
    let monthIndex = sl(3, 10);

    var precision = [100, 1000].iz() * [1, 2, 4, 5].iz();

    var unknown = [
        ['S', S, 'Какую сумму планируется взять в кредит?'],
        ['r', r, 'Найдите $r$.'],
        ['x', x, 'Найдите общую сумму выплат после полного погашения кредита.'],
        ['x', x - S, 'Сколько рублей составит переплата?'],
        ['n', n, 'За сколько лет будет погашен кредит?'],
        ['n_min', n, 'На какое минимальное количество лет можно взять кредит, чтобы каждая выплата составила не более ' + chislitlx((v + precision).okrugldo(precision), 'рубль') + '?'],
    ][variant];

    var text =
        'В ' + sklonlxkand(om.months[monthIndex]).pe + ' ' + sl(2000, 2023) + ' года планируется взять кредит в банке ' +
        'на сумму ' + (unknown[0] == 'S' ? '$S$ рублей' : chislitlx(S, 'рубль')) + '. ' +
        'Условия его возврата таковы:' +
        '<br/>' +
        '– каждый январь долг ' + ['увеличивается', 'возрастает'].iz() + ' на ' + (unknown[0] == 'r' ? '$r\\%$' : r + '%') + ' по сравнению с концом предыдущего года;' +
        '<br/>' +
        '– с февраля по ' + om.months[monthIndex - 1] + ' каждого года необходимо выплатить одним платежом часть долга; ' +
        '<br/>';
    if (unknown[0] == 'n' || unknown[0] == 'n_min') {
        text += '– кредит погашается равными платежами. ';
    } else if (!sl(3) && unknown[0] == 'x') {
        text += 'При какой минимальной сумме выплаты кредит будет погашен не более, чем за ' + chislitM(n, 'год', 'года', 'лет') + '?';
        unknown[2] = '';
        unknown[1] = v;
    } else {
        text += '– кредит будет полностью погашен ' + n + ' равными платежами, то есть за ' + chislitM(n, 'год', 'года', 'лет') + '. ';
    }
    text += '<br/>';
    if (unknown[0] != 'x' && unknown[0] != 'n_min') {
        text += [
            'Общая сумма выплат составит ' + chislitlx(x, 'рубль'),
            'Переплата составит ' + chislitlx(x - S, 'рубль'),
        ].iz() + '. ';
    }
    text += unknown[2];



    NAtask.setTask({
        text: text,
        answers: unknown[1],
        analys: 'Каждая выплата: ' + v + ' руб.',
        preference,
    });

}, 1000000);
//?
//TODO оптимизировать
