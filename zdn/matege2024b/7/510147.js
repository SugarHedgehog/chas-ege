(function () {
    'use strict';
    retryWhileError(function () { 
        /* На рисунке точками показана среднесуточная температура воздуха в Москве в январе 2011 года. По горизонтали указываются числа месяца, по вертикали  — температура в градусах Цельсия. Для наглядности точки соединены линией. */

        function convert(value) {
            return (value - [16, 0][rand]) + '${}^{\\circ} C$';
        }

        function wasLengthConstValue(interval) {
            let length = 0;
            for (let j = 1; j < interval.length; j++) {
                if (interval[j] === interval[j - 1] && interval[j - 1] !== 0) {
                    length++;
                }
            }

            return length;
        }

        function noHasDublValue(interval, value) {
            let index = interval.indexOf(value);
            return index === interval.lastIndexOf(value) && index != -1;
        }

        function addUniqueAnsw(rightIntervals, answ, text) {
            let index = rightIntervals.indexOf(true);
            if (noHasDublValue(rightIntervals, true)) {
                answ[index].solution.push(text);
            }
        }

        function answAboutConstN(intervals, answ) {
            let lengthConsts = intervals.map(interval => wasLengthConstValue(interval));
            let maxLength = lengthConsts.maxE();
            let maxIndex = lengthConsts.indexOf(maxLength);
            if (noHasDublValue(lengthConsts, maxLength) && (maxLength == 3 || maxLength == 4)) {
                answ[maxIndex].solution.push(['три', 'четыре'][maxLength - 3] + ' дня подряд среднесуточная температура принимала одно и то же значение');
            }
        }

        function answAboutMin(intervals, answ) {
            let minV = values.minE();
            let minIndex = null;
            let minCount = 0;

            for (let i = 0; i < intervals.length; i++) {
                for (let j = 0; j < intervals[i].length; j++) {
                    if (intervals[i][j] === minV) {
                        minCount++;
                        if (minCount > 1) {
                            return;
                        }
                        minIndex = i;
                    }
                }
            }

            if (minIndex)
                answ[minIndex].solution.push('среднесуточная температура достигла месячного минимума');
        }

        function answAboutMax(intervals, answ) {
            let maxV = values.maxE();
            let maxIndex = null;
            let maxCount = 0;

            for (let i = 0; i < intervals.length; i++) {
                for (let j = 0; j < intervals[i].length; j++) {
                    if (intervals[i][j] === maxV) {
                        maxCount++;
                        if (maxCount > 1) {
                            return;
                        }
                        maxIndex = i;
                    }
                }
            }

            if (maxIndex)
                answ[maxIndex].solution.push('среднесуточная температура достигла месячного максимума');
        }

        function isMore(interval, values) {
            return (interval.filter((int) => int > values)).length == interval.length;
        }

        function isLess(interval, values) {
            return interval.filter((int) => int < values).length == interval.length;
        }

        function answAboutMoreButLess(intervals, answ, more, less) {
            let rightIntervals = intervals.map(interval => isLess(interval, less) && isMore(interval, more));
            addUniqueAnsw(rightIntervals, answ, 'температура находилась в пределах от ' + convert(more) + ' до ' + convert(less));
        }

        function answAboutMore(intervals, answ, more) {
            let rightIntervals = intervals.map(interval => isMore(interval, more));
            addUniqueAnsw(rightIntervals, answ, 'среднесуточная температура оставалась выше ' + convert(more));
        }

        function answAboutLess(intervals, answ, less) {
            let rightIntervals = intervals.map(interval => isLess(interval, less));
            addUniqueAnsw(rightIntervals, answ, 'среднесуточная температура не превышала ' + convert(less));
        }

        function isIncreasing(interval) {
            return interval.slice(1).every((current, index) =>
                current > interval[index]
            );
        }

        function isDecreasing(interval) {
            return interval.slice(1).every((current, index) =>
                current < interval[index]
            );
        }

        function isNonIncreasing(interval) {
            return interval.slice(1).every((current, index) =>
                current <= interval[index]
            );
        }

        function isNonDecreasing(interval) {
            return interval.slice(1).every((current, index) =>
                current >= interval[index]
            );
        }

        function answAboutNonIncreasing(intervals, answ) {
            let rightIntervals = intervals.map(interval => isNonIncreasing(interval));
            addUniqueAnsw(rightIntervals, answ, 'среднесуточная температура не повышалась в течение периода');
        }

        function answAboutNonDecreasing(intervals, answ) {
            let rightIntervals = intervals.map(interval => isNonDecreasing(interval));
            addUniqueAnsw(rightIntervals, answ, 'среднесуточная температура не снижалась в течение периода');
        }

        function answAboutIncrDescr(intervals, answ) {
            let isIncreasingFirst = intervals.map(interval => {
                let first = interval.slice(0, 4);
                return isNonIncreasing(first);
            });
            addUniqueAnsw(isIncreasingFirst, answ, 'в первой половине периода среднесуточная температура не повышалась');

            let isDecreasingFirst = intervals.map(interval => {
                let first = interval.slice(0, 4);
                return isNonDecreasing(first);
            });
            addUniqueAnsw(isDecreasingFirst, answ, 'в первой половине периода среднесуточная температура не понижалась');

            let isIncreasingSecond = intervals.map(interval => {
                let second = interval.slice(4);
                return isNonIncreasing(second);
            });
            addUniqueAnsw(isIncreasingSecond, answ, 'во второй половине периода среднесуточная температура не повышалась');

            let isDecreasingSecond = intervals.map(interval => {
                let second = interval.slice(4);
                return isNonDecreasing(second);
            });
            addUniqueAnsw(isDecreasingSecond, answ, 'во второй половине периода среднесуточная температура не понижалась');
        }

        function answAboutWasConstAtEnd(intervals, answ) {
            let wasConst = intervals.map(interval => {
                return interval[5] == interval[6] && interval[5] == interval[4];
            });
            addUniqueAnsw(wasConst, answ, 'в конце периода среднесуточная температура не менялась');
        }

        function answAboutIncreasingAtEnd(intervals, answ) {
            let wasIncr = intervals.map(interval => {
                return isIncreasing(interval.slice(4)) || isIncreasing(interval.slice(5));
            });
            addUniqueAnsw(wasIncr, answ, 'в конце периода наблюдался рост среднесуточной температуры');
        }

        function answAboutDescrisingAtEnd(intervals, answ) {
            let wasDecr = intervals.map(interval => {
                return isDecreasing(interval.slice(4)) || isDecreasing(interval.slice(5));
            });
            addUniqueAnsw(wasDecr, answ, 'в конце периода наблюдалось падение среднесуточной температуры');
        }

        let rand = sl1();
        let time = [0].zapMonot(31, 0, 1, 1);
        let values = [sl(18)];
        let count = sl1();

        for (; values.length <= time.length;) {
            let interI = ((time.length / sl(5, 7)).floor());
            for (let j = 0; j < interI; j++) {
                let lastProduction = values[values.length - 1];
                let newProduction = lastProduction + ([1, 1, 1, 0].iz() ? (sl(1, 3) * (-1).pow(count % 2)) : 0);
                if (newProduction >= 1 && newProduction <= 18) {
                    values.push(newProduction);
                }
            }
            count++;
        }
        values = values.slice(0, time.length);

        let beginDay = sl(3);
        let intervals = Array.from({
            length: 4
        }, (_, i) =>
            values.slice(i * 7 + beginDay, i * 7 + 7 + beginDay));

        let listOfIntervals = intervals.map((interval, i) => {
            return {
                expr: `${i * 7 + 1 + beginDay}-${i * 7 + 7 + beginDay}`,
                solution: []
            };
        });

        let aAboutIncrOrDecr = sl1();
        let less1 = sl(9, 15);
        let more1 = slKrome(less1, 2, 9);
        let less2 = slKrome([less1, more1], 9, 15);
        let more2 = slKrome([less1, more1, less2], 2, 9);

        answAboutIncrDescr(intervals, listOfIntervals);
        answAboutNonIncreasing(intervals, listOfIntervals);
        answAboutNonDecreasing(intervals, listOfIntervals);
        answAboutMin(intervals, listOfIntervals);
        answAboutMax(intervals, listOfIntervals);
        answAboutMore(intervals, listOfIntervals, more1);
        answAboutLess(intervals, listOfIntervals, less1);
        answAboutMoreButLess(intervals, listOfIntervals, more2, less2);
        answAboutWasConstAtEnd(intervals, listOfIntervals);
        answAboutIncreasingAtEnd(intervals, listOfIntervals);
        answAboutDescrisingAtEnd(intervals, listOfIntervals);
        answAboutConstN(intervals, listOfIntervals);

        listOfIntervals.forEach(item => item.solution = item.solution.iz());
        let solutions = listOfIntervals.map(item => item.solution);
        solutions.forEach(item => genAssertNonempty(item));
        genAssert(!solutions.hasDubl(), 'Дубликаты решений');

        let listView = listOfIntervals.map(list => list.expr + ':' + list.solution);

        let paint1 = function (ctx) {
            ctx.translate(15, 0);
            ctx.drawGridWithArrows({
                gridWidth: 475,
                gridHeight: 330,
                cellWidth: 15,
                cellHeight: 15,
                stepX: 1,
                stepY: 1,
                minX: 1,
                maxX: 32,
                minY: [-16, 0][rand],
                maxY: [2, 18][rand],
                stepByCeilX: 2,
                stepByCeilY: 2,
                arrowLengthX: 30.5,
                arrowLengthY: 19.8,
            });

            ctx.font = "14px serif";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('t,°C', -3, 10)

            ctx.translate(15, 20 * 15);
            ctx.scale(15, -15);
            ctx.lineWidth = 2 / 15;

            for (let i = 0; i < time.length; i++) {
                ctx.drawFilledCircle(time[i], values[i], 3 / 17);
                if (i < time.length - 1)
                    ctx.drawLine(time[i], values[i], time[i + 1], values[i + 1]);
            }
        };

        NAtask.setCorrespondenceTask({
            text: `На рисунке точками показана среднесуточная температура воздуха в ${['Москве', 'Челябинске'][rand]} в ${['январе', 'марте'][rand]} ${2000 + sl(25)} года. По горизонтали указываются числа месяца, по вертикали – температура в градусах Цельсия. Для наглядности точки соединены линией. Границы периодов времени показаны штриховыми линиями.`,
            leftHeader: 'ИНТЕРВАЛЫ',
            left: listOfIntervals,
            rightHeader: 'ХАРАКТЕРИСТИКИ',
            right: solutions,
            postText: 'Пользуясь рисунком, поставьте в соответствие каждому из указанных периодов времени характеристику изменения температуры.<br/><br/> ВРЕМЕННЫЕ ОТВЕТЫ <br/>' +
                listView.join('<br/>'),
        });
        NAtask.modifiers.allDecimalsToStandard();
        NAtask.modifiers.addCanvasIllustration({
            width: 800,
            height: 600,
            paint: paint1,
        });
    }, 500);
})();
// https://mathb-ege.sdamgia.ru/problem?id=510147
