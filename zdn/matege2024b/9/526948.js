(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        const points = [{
            x: sl(-4, -2),
            y: sl(-4, -2)
        }, {
            x: sl(2, 4),
            y: sl(-4, -2)
        }, {
            x: sl(-4, 4),
            y: sl(2, 4)
        }];

        const supplementary = {
            shiftCoordinate: false
        };

        let triangle = new Triangle({
            points, supplementary
        });

        genAssert(!((90 - triangle.maxAngleInDegrees()).abs() < Number.EPSILON), 'Треугольник прямоугольный');

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;
            ctx.lineWidth = 0.5;
            ctx.regularGrid(40, 20);

            ctx.translate(w / 2, h / 2);

            ctx.scale(40, -40);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 3.5 / 40;
            ctx.rotate(Math.PI * sl(5, 20, 5) / 10);
            ctx.drawFigure(triangle.vertices, triangle.connectionMatrix);
        };

        NAtask.setTask({
            text: `План местности разбит на клетки. Каждая клетка обозначает квадрат $1 \\text{ м} \\times 1 \\text{ м}$. Найдите площадь участка, выделенного на плане. Ответ дайте в квадратных метрах.`,
            answers: triangle.area(),
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
//https://mathb-ege.sdamgia.ru/problem?id=526948
