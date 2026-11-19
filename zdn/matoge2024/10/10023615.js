(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let totalEvents = sl(20, 50);
        let favorableEvents = sl(1, totalEvents);
        let eventName = window.latbukv.iz();

        let probability = favorableEvents / totalEvents;

        genAssertZ1000(probability);

        NAtask.setTask({
            text: 'В случайном опыте $N=' + totalEvents + '$ равновозможных элементарных событий, ' +
                'из которых $N(' + eventName + ')=' + favorableEvents + '$ благоприятствуют событию $' + eventName + '$. ' +
                'Вычислите вероятность события $' + eventName + '$.',
            answers: probability,
        });

        NAtask.modifiers.allDecimalsToStandard();
    }, 200);
})();

// 10023615
//Открытый банк заданий 98F2BF
