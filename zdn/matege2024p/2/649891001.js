(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let vectorsName = window.smallLatinLetters.iz(2);
        let coord = arrayOfUniqueValues(4, -10, 10);

        let vectA = math.matrix(coord.slice(0, 2));
        let vectB = math.matrix(coord.slice(2, 4));

        let coef1A = sl(1, 3).pm();
        let coef2A = sl(1, 5).pm();
        let coef1B = sl(1, 3);
        let coef2B = sl(1, 5);

        let c1vectA = math.multiply(coef1A, vectA);
        let c1vectB = math.multiply(coef1B, vectB);
        let c2vectA = math.multiply(coef2A, vectA);
        let c2vectB = math.multiply(-coef2B, vectB);

        let AplusB = math.add(c1vectA, c1vectB);
        let AminusB = math.add(c2vectA, c2vectB);

        NAtask.setTask({
            text: ('Даны векторы $\\vec{'+vectorsName[0]+'}(' + coord.slice(0, 2).join(';') + ')$ и $\\vec{'+vectorsName[1]+'}(' + coord.slice(2, 4).join(';') +
                ')$. Найдите скалярное произведение векторов $' + coef1A + '\\vec{'+vectorsName[0]+'} + ' + coef1B + '\\vec{'+vectorsName[1]+'}$ и $' + coef2A +
                '\\vec{'+vectorsName[0]+'} - ' + coef2B + '\\vec{'+vectorsName[1]+'}$.').plusminus(),
            answers: math.dot(AplusB, AminusB),
            analys: ('$' + coef1A + '\\vec{'+vectorsName[0]+'} + ' + coef1B + '\\vec{'+vectorsName[1]+'} = \\{' + AplusB.valueOf().join(',') + '\\} $<br>' +
                '$' + coef2A + '\\vec{'+vectorsName[0]+'} - ' + coef2B + '\\vec{'+vectorsName[1]+'} = \\{' + AminusB.valueOf().join(',') + '\\}$').plusminus(),
        });
    }, 1000);
    NAtask.modifiers.allDecimalsToStandard();
})();
// 649891001
