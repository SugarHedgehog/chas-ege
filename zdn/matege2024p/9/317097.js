(function() {
	'use strict';
	retryWhileError(function() {
		let key = '317097';
		let preference = ['power', 'multiply'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let power = sl(1, 4);
		let K = sl(5, 30);
		let rPok = 0.02 * K / power - 0.1;
		let den = (K + 1);
		den = rand ? den * power : den ** power;

		let rExp = sl(0.01, 0.99, 0.01);

		genAssert(rPok > 0, 'число не должно быть отрицательным');
		genAssert(Math.abs(rPok - rExp) < 1, 'оценки экспертов и покупателей не должны сильно отличаться');
		genAssertZ1000(rPok);


		let ans = rPok - (rPok - rExp) / den;
		genAssert(ans > 0, 'число не должно быть отрицательным');
		genAssertZ1000(ans);

		let shop = ['«Альфа»', '«Бета»'].iz();
		
		let frac = `\\frac{0,02 K}{r_\\text{пок} + 0,1}`;
		
		NAtask.setTask({
			
			
			text: `Рейтинг $R$ интернет-магазина вычисляется по формуле $R = r_\\text{пок} - \\frac{r_\\text{пок} - r_\\text{экс}}{(K+1)${[`^m`, `\\cdot ${frac}`][rand]}}$,
        где ${`$m = ${frac}$,`.esli(!rand)} $r_\\text{пок}$ - средняя оценка магазина покупателями 
        $r_\\text{экс}$ - оценка магазина экспертами (от 0 до ${Math.round(rExp * 10) / 10+sl(1, 3)/10}) и $K$ - число покупателей, оценивших магазин. 
        Найдите рейтинг интернет-магазина ${shop}, если число покупателей, оставивших отзыв о магазине, равно ${K},
        их средняя оценка равна ${rPok}, а оценка экспертов равна ${rExp}.`,
			answers: ans,
			authors: ['mcFrene'],
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard( /*true*/ );
	}, 2000);
})();
//mcFrene
/*РешуЕГЭ: 317097: 505466, 509575, 509922, 516377, 516397, 635960, 635857
 */
