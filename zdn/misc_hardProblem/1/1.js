(function () {
    retryWhileError(function () {
        'use strict';

        let a = slKrome([30,45,60,15,75],1, 89);
        let constant1 = [[sl(1, 100).pm(), sl(2, 100)].join('/'), sl(2, 100).pm()].iz();
        let constant2 = [[sl(1, 100).pm(), sl(2, 100)].join('/'), sl(2, 100).pm()].iz();
        let constant3 = [[sl(1, 100).pm(), sl(2, 100)].join('/'), sl(2, 100).pm()].iz();

        NAtask.setEvaluationTask({
            expr: (constant1 + '(' + [
                constant2 + '*' + ['sin', 'cos'].iz() + 'deg(' + (2 * a + 90 * sl(-3, 3)) + ')',
                constant2 + '*' + ['tg', 'ctg'].iz() + 'deg(' + (a + 90 * sl(-6, 6)) + ')*' + ['sin', 'cos'].iz() + 'deg(' + (2 * a + 90 * sl(-3, 3)) + ')',
                constant3,
            ].shuffle().slag() + ')').plusminus(),
            //askAboutFraction: true,
            authors: ['Николай Авдеев', 'Александра Суматохина'],
        });
    }, 10000);
})();
//Это не обзад
//1
