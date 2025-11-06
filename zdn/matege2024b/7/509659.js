(function () {
    'use strict';
    retryWhileError(function () { 
        /* На рисунке точками показан прирост населения Китая в период с 2004 по 2013 год. По горизонтали указывается год, по вертикали –прирост населения в процентах (увеличение численности населения относительно прошлого года). Для наглядности точки соединены линией */

        function convert(value) {
            return 0.47 + value * 0.02 + '%';
        }

        function answAboutMin(intervals, answ) {
            let minIndex = findMinInIntervals(intervals, values);
            let wasMin = intervals.map((_, i) => i === minIndex);
            addUniqueAnsw(wasMin, answ, 'прирост населения достиг минимума');
        }

        function answAboutMax(intervals, answ) {
            let maxIndex = findMaxInIntervals(intervals, values);
            let wasMax = intervals.map((_, i) => i === maxIndex);
            addUniqueAnsw(wasMax, answ, 'прирост населения достиг максимума');
        }

        function answAboutMoreButLess(intervals, answ, more, less) {
            let wasCondition = intervals.map(interval => isLess(interval, less) && isMore(interval, more));
            addUniqueAnsw(wasCondition, answ, 'прирост населения находился в пределах от ' + convert(more) + ' до ' + convert(less));
        }

        function answAboutMore(intervals, answ, more) {
            let wasMore = intervals.map(interval => isMore(interval, more));
            addUniqueAnsw(wasMore, answ, 'прирост населения оставался выше ' + convert(more));
        }

        function answAboutLess(intervals, answ, less) {
            let wasLess = intervals.map(interval => isLess(interval, less));
            addUniqueAnsw(wasLess, answ, 'прирост населения оставался ниже ' + convert(less));
        }

        function answAboutIncreasing(intervals, answ) {
            let wasIncreasing = intervals.map(interval => isIncreasing(interval));
            addUniqueAnsw(wasIncreasing, answ, 'прирост населения увеличивался');
        }

        function answAboutDecreasing(intervals, answ) {
            let wasDecreasing = intervals.map(interval => isDecreasing(interval));
            addUniqueAnsw(wasDecreasing, answ, 'прирост населения уменьшался');
        }

        function answAboutMaxDeltaD(intervals, answ) {
            let decr = intervals.map(int => {
                if (isDecreasing(int)) {
                    return int.maxE() - int.minE();
                } else {
                    return 0;
                }
            });

            let maxED = decr.maxE();
            let wasMaxDeltaD = intervals.map((_, i) => decr[i] === maxED);
            addUniqueAnsw(wasMaxDeltaD, answ, 'наибольшее падение прироста населения за один год');
        }

        function answAboutDecreasingAndWasConst(intervals, answ) {
            let wasCondition = intervals.map(interval => isDecreasing(interval) && wasConst(interval));
            addUniqueAnsw(wasCondition, answ, 'падение прироста остановилось');
        }

        let time = [0].zapMonot(10, 0, 1, 1); // шкала времени
        let values = [sl(4, 7)]; // шкала прироста
        let count = 1;

        for (; values.length <= time.length;) {
            let interI = ((time.length / 1.2).floor());
            for (let j = 0; j < interI; j++) {
                let lastProduction = values[values.length - 1];
                let newProduction = lastProduction + ([1, 1, 1, 0].iz() ? (sl(0.5, 1, 0.5) * (-1).pow(count % 2)) : 0);
                if (newProduction >= 1 && newProduction <= 7)
                    values.push(newProduction);
            }
            count++;
        }
        values = values.slice(0, time.length)

        let beginYear = sl1();

        let intervals = Array.from({
            length: 4
        }, (_, i) =>
            values.slice(i * 2 + beginYear, i * 2 + 3 + beginYear));

        let listOfIntervals = intervals.map((interval, i) => {
            return {
                expr: `${2004 + i * 2 + beginYear}-${2004 + i * 2 + 2 + beginYear}`,
                solution: []
            };
        });

        let aAboutIncrOrDecr = sl1();

        let less1 = sl(2, 4);
        let more1 = slKrome(less1, 3, 6);

        let less2 = slKrome([less1, more1], 2, 4);
        let more2 = slKrome([less1, more1, less2], 3, 6);

        function addAllAnswers(intervals, listOfIntervals) {
            if (aAboutIncrOrDecr) {
                // добавляем ответ про повышение прироста
                answAboutIncreasing(intervals, listOfIntervals);
                answAboutMore(intervals, listOfIntervals, more1);
            } else {
                // добавляем ответ про понижение прироста
                answAboutLess(intervals, listOfIntervals, less1);
                answAboutDecreasing(intervals, listOfIntervals);
            }
            answAboutDecreasingAndWasConst(intervals, listOfIntervals);
            answAboutMoreButLess(intervals, listOfIntervals, more2, less2);
        }

        // добавляем ответ про минимальный показатель
        answAboutMin(intervals, listOfIntervals);
        answAboutMax(intervals, listOfIntervals);
        if (aAboutIncrOrDecr)
            answAboutMaxDeltaD(intervals, listOfIntervals);
        addAllAnswers(intervals, listOfIntervals);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());

        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            ctx.drawGridWithArrows({
                gridWidth: 570,
                gridHeight: 340,
                cellWidth: 60,
                cellHeight: 20,
                stepX: 1,
                stepY: 0.01,
                minX: 2004,
                maxX: 2013,
                minY: 0.47,
                maxY: 0.62,
                stepByCeilY: 2,
                arrowLengthX: 8.5,
                arrowLengthY: 14.8,
            });

            ctx.translate(60, 20 * 15);
            ctx.scale(60, -40);
            ctx.lineWidth = 2 / 40;

            for (let i = 0; i < time.length; i++) {
                ctx.drawFilledCircle(time[i], values[i], 3 / 40);
                if (i < time.length - 1)
                    ctx.drawLine(time[i], values[i], time[i + 1], values[i + 1]);
            }
        };

        NAtask.setCorrespondenceTask({
            text: 'На рисунке точками показан прирост населения Китая в период с 2004 по 2013 год. По горизонтали указывается год, по вертикали – прирост населения в процентах (увеличение численности населения относительно прошлого года). Для наглядности точки соединены линией',
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику прироста населения Китая в этот период.<br/><br/> ВРЕМЕННЫЕ ОТВЕТЫ <br/>' +
                listView.join('<br/>'),
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 600,
            paint: paint1,
        });
    }, 500);
})();
// https://mathb-ege.sdamgia.ru/problem?id=509659
