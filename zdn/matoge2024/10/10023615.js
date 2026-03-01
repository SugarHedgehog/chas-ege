(function () {
    'use strict';
    retryWhileError(function () {

        let N = sl(20, 50, 5);
        let NA = sl(1, N - 1);

        NAtask.setTask({
            text: 'В случайном опыте $N=' + N + '$ равновозможных элементарных событий, ' +
                'из которых $N(A)=' + NA + '$ благоприятствуют событию $A$. ' +
                'Вычислите вероятность события $A$.',
            answers: NA / N,
        });
        NAtask.modifiers.assertSaneDecimals();
    }, 100);
})();
//10023615
//Открытый банк заданий 98F2BF
