(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let point23 = [
            [-2, 1],
            [0, -2],
            [3, 0],
            [1, 3],
        ];

        let point34 = [
            [-3, 0],
            [1, -3],
            [4, 1],
            [0, 4],
        ];
        let point45 = [
            [-4, 0],
            [1, -4],
            [5, 1],
            [0, 5],
        ];

        let point15 = [
            [-3, -2],
            [2, -3],
            [3, 2],
            [-2, 3],
        ];

        let points16 = [
            [-3, -1],
            [1, -4],
            [4, 0],
            [0, 3]
        ];

        let point26 = [
            [-4, 2],
            [-2, -4],
            [4, -2],
            [2, 4],
        ];

        let points = [point23, point34, point45, point15, points16, point26].iz().map((c) => {
            return {
                x: c[0],
                y: c[1]
            };
        });

        const supplementary = {
            shiftCoordinate: false
        };

        let square = new Square({
            points,
            supplementary
        });

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;
            ctx.lineWidth = 0.5;
            let scale = 30;

            ctx.translate(w / 2 + sl(-2, 1) * scale, h / 2 + sl(-1, 2) * scale);
            ctx.regularGrid(scale, scale);
            ctx.scale(scale, -scale);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 4 / scale;
            ctx.drawFigure(square.vertices, square.connectionMatrix);
        };

        NAtask.setTask({
            text: `План местности разбит на клетки. Каждая клетка обозначает квадрат $1 \\text{ м} \\times 1 \\text{ м}$. Найдите площадь участка, выделенного на плане. Ответ дайте в квадратных метрах.`,
            answers: square.area(),
            authors: ['Александра Суматохина'],
        });

        NAtask.modifiers.allDecimalsToStandard( /*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 1000);

})();
//https://mathb-ege.sdamgia.ru/problem?id=525227
