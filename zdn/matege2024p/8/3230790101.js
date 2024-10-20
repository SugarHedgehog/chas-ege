(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';

        function f(x) {
            return k * x + b;
        }

        function constant() {
            return Y;
        }

        let X = sl(0, 6).pm();
        let Y = sl(2, 7);
        let k = sl(1, 10, 0.1) * ((X * Y < 0) ? -1 : 1);
        let b = Y - k * X;

        genAssert((b / k).isZ());
        genAssert((b / k) != 0);

        let minX = -8.5,
            maxX = 8.5,
            minY = -9.5,
            maxY = 7.5;

        genAssert((-b / k).abs() < X.abs());

        let ends = (X < 0) ? [-b / k, slKrome(0, minX.ceil(), X - 2)] : [-b / k, slKrome(0, X + 2, maxX.floor())];
        let leftEnd = ends.minE();
        let rightEnd = ends.maxE();

        let subMinX = (X < 0) ? X : minX;
        let subMaxX = (X > 0) ? X : maxX;
        let subMinXC = (X > 0) ? X : minX;
        let subMaxXC = (X < 0) ? X : maxX;

        let answ = 0.5 * Y * ((rightEnd - leftEnd).abs() + (X - (X < 0 ? leftEnd : rightEnd)).abs());

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;
            let scale = 20;
            ctx.drawCoordPlane(w, h, {
                hor: 1,
                ver: 1
            }, {
                x1: '1',
                y1: '1',
                sh1: 13,
            }, scale);
            ctx.scale(scale, -scale);
            ctx.lineWidth = 0.07;
            graph9AdrawFunction(ctx, f, {
                minX: subMinX,
                maxX: subMaxX,
                minY: minY,
                maxY: maxY,
                step: 0.01,
            });

            graph9AdrawFunction(ctx, constant, {
                minX: subMinXC,
                maxX: subMaxXC,
                minY: minY,
                maxY: maxY,
                step: 0.05,
            });

            ctx.lineWidth = 0.04;
            ctx.drawMarkWithLabel({
                scale: scale,
                point: [0, -Y],
                label: Y.toString(),
                stepY: (X > 0) ? 15 : -10,
                type: 'vertical',
            });
            ctx.drawMarkWithLabel({
                scale: scale,
                point: [leftEnd, 0],
                label: (leftEnd != 0 && leftEnd != 1) ? leftEnd.toString() : '',
                stepX: (leftEnd == -1) ? -10 : 1,
                stepY: (Y > 0) ? 15 : -10,
            });
            ctx.drawMarkWithLabel({
                scale: scale,
                point: [rightEnd, 0],
                label: (rightEnd != 0 && rightEnd != 1) ? rightEnd.toString() : '',
                stepX: (rightEnd == -1) ? -10 : 1,
                stepY: (Y > 0) ? 15 : -10,
            });
            ctx.drawMarkWithLabel({
                scale: scale,
                point: [X, 0],
                label: X.toString(),
                stepX: (X == -1) ? -10 : 1,
                stepY: (Y > 0) ? 15 : -10,
            });

            ctx.setLineDash([0.4, 0.2]); 
            ctx.lineWidth = 0.12;
            ctx.strokeStyle = om.primaryBrandColors.iz();
            ctx.drawLine(X, 0, X, Y);
            if (X < 0) {
                ctx.drawLine(leftEnd, 0, leftEnd, Y);
            } else {
                ctx.drawLine(rightEnd, 0, rightEnd, Y);
            }

            ctx.drawLine(0, Y, X, Y);
        };
        NAtask.setTask({
            text: 'На рисунке изображён график некоторой функции $y=f(x)$ (два луча с общей начальной точкой). ' +
                'Пользуясь рисунком, вычислите $F(' + rightEnd + ') - F(' + leftEnd +
                ')$, где $F(x)$ — одна из первообразных функции $f(x)$.',
            answers: answ,
            authors: 'Суматохина Александра',
        });
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 20000);
})();

//3230790101
