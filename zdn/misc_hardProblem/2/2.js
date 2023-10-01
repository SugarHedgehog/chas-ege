(function () {
    retryWhileError(function () {
        'use strict';

        let a = slKrome([30, 45, 60, 90, 75, 15], 1, 89);
        let constant1 = [
            [sl(1, 100).pm(), sl(2, 100)].join('/'), sl(2, 100).pm()
        ].iz();
        let constant2 = [
            [sl(1, 100).pm(), sl(2, 100)].join('/'), sl(2, 100).pm()
        ].iz();
        let rand = sl1();

        let exp = ['(' + ['sin', 'cos'][rand] + 'deg(' + a + ')+' + ['sin', 'cos'][rand] + 'deg(' + a + ')*' + ['sin', 'cos'][1 - rand] + 'deg(' + 2 * a + '))',
        '(' + ['sin', 'cos'][1 - rand] + 'deg(' + a + ')+' + ['sin', '-cos'][1 - rand] + 'deg(' + a + ')*' + ['sin', 'cos'][1 - rand] + 'deg(' + 2 * a + '))'].shuffle();

        NAtask.setEvaluationTask({
            expr: [constant1 + ['ctg', 'tg'][rand] + 'deg(' + (a + 90) + ')*' + exp[0], constant2 + exp[1]].join('/').plusminus(),
            //askAboutFraction: true,
            authors: ['Александра Суматохина'],
        });
    }, 10000);
})();
//Это не обзад
//2


