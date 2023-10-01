(function () {
    retryWhileError(function () {
        'use strict';

        let a = slKrome([30,45,60,15,75],1, 89);
        let constant1 = [
            [sl(1, 100).pm(), sl(2, 100)].join('/'), sl(2, 100).pm()
        ].iz();
        let constant2 = [
            [sl(1, 100).pm(), sl(2, 100)].join('/'), sl(2, 100).pm()
        ].iz();

        NAtask.setEvaluationTask({
            expr: [constant1 + '(' + ['sin', 'cos'].iz() + 'degpow(' + a + ',2)-' + ['sin', 'cos'].iz() + 'degpow(' + (270 - a) + ',2))/(2*' + ['sin', 'cos'].iz() + 'degpow(' + (90 - a) + ',2)-1)', constant2].shuffle().slag().plusminus(),
            //askAboutFraction: true,
            authors: ['Александра Суматохина'],
        });
    }, 10000);
})();
//Это не обзад
//3


