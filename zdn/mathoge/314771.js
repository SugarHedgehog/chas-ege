retryWhileError(function() {
    NAinfo.requireApiVersion(0, 2);

    function f(x) {
        switch (v) {
        case 0:
            return a * x * x + b * x + c;
        case 1:
            return a / (x) + b;
        case 2:
            return a * (x.sqrt()) + b;
        case 3:
            return a * x + b;
        }

    }

    let ai = [];
    let bi = [];
    let ci = [];
    let vi = [];
    let func = [];
    let funcShuffle = [];
    for (let i = 0; i < 4; i++) {
        vi.push([0, 0, 1, 2, 2, 3].iz());
        ai.push(slKrome(ai, 1, 5, 0.5));
        bi.push(sl(1, 10).pm());
        ci.push(sl(1, 10).pm());

        switch (vi[i]) {
        case 0:
            func.push((ai[i] + 'x^2+' + bi[i] + 'x+' + ci[i]).plusminus());
            break;
        case 1:
            func.push(('\\frac{' + ai[i] + '}{x}+' + bi[i]).plusminus());
            break;
        case 2:
            func.push((ai[i] + '\\sqrt{x}+' + bi[i]).plusminus());
            break;
        case 3:
            func.push((ai[i] + 'x+' + bi[i]).plusminus());
            break;
        }
        funcShuffle[i] =
            func[i].replace('+0x', '').replace('+0', '');
        funcShuffle[i] = func[i];
    }

    funcShuffle.shuffle();

    let points = [];
    let x0 = [];
    let y0 = [];
    let a, b, c, v;
    let answers = [];
    for (let i = 0; i < 4; i++) {
        answers.push(1 + funcShuffle.indexOf(func[i]));
        a = ai[i];
        b = bi[i];
        c = ci[i];
        v = vi[i];

        points[i] = intPoints(f, {
            minX: -5,
            maxX: 6,
            minY: -5.5,
            maxY: 5.5
        });

        genAssert(points[i].length > 2, 'мало точек');

    }
    for (let i = 0; i < 4; i++)
        funcShuffle[i] = (i + 1) + ') $' + funcShuffle[i] + '$';
    answers.pop();
    console.log(func);
    console.log(funcShuffle);
    let paint1 = function(ct) {
        let h = 300;
        let w = 300;
        //Оси координат
        for (let i = 0; i < 3; i++) {
            if (i)
                ct.translate(200, -h / 2 + 10);
            ct.drawCoordinatePlane(w, h, {
                hor: 1,
                ver: 1
            }, {
                x1: '1',
                y1: '1',
                sh1: 13,
            }, 20);

            ct.lineWidth = 0.1;
            ct.scale(20, -20);
            //График

            a = ai[i];
            b = bi[i];
            c = ci[i];
            v = vi[i];
            graph9AdrawFunction(ct, f, {
                minX: -6.5,
                maxX: 6.5,
                minY: -7,
                maxY: 5.7,
                step: 0.01,
            });
            graph9AmarkCircles(ct, points[i], 3, 0.15);
            ct.scale(1 / 20, -1 / 20);
            ct.font = "19px liberation_sans";
            ct.fillText(['A', 'B', 'C'][i] + ')', 130, 130);
        }


    };
    NAtask.setTask({
        text: 'Установите соответствие между графиками функций и формулами, которые их задают. ' +
            'Формулы: <br>' + funcShuffle.join('<br>') + '',
        answers: answers.join(''),
    });
    chas2.task.modifiers.addCanvasIllustration({
        width: 3000,
        height: 320,
        paint: paint1,
    });
},
100000);
//193093 200515 201145 193094 193095 193096 199705 199735 199765 199795 199825 199855 199885 199915 199945 199975 200005 200035 200065 200095 200125 200155 200185 200215 200245 200275 200305 200335 200365 200395 200425 200455 200485 200545 200575 200605 200635 200665 200695 200725 200755 200785 200815 200845 200875 200905 200935 200965 200995 201025 201055 201085 201115 201175 201205
