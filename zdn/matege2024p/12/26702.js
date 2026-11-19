(function() {
	retryWhileError(function() {
		'use strict';
		
		let key = "26702";
		let preference = ['maximum', 'minimum'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let [forbidMinY, forbidMaxY] = [1 - rand, rand];
		
		let a = sl(3, 50);
		let b = sl(1, 100);
		let arr1 = ['+', '-'];
		let arr2 = ['',  '-'];
		let maxmin1 = sl1();
		let maxmin2 = (maxmin1 + 1) % 2;
		NAtask.setMinimaxFunctionTask({
			expr: arr2[maxmin1] + a + 'tan(x)' + arr1[maxmin2] + a+ 'x'  + arr1.iz() + b,
			leftEnd:  ['0','-pi/4','-pi/3'].iz(),
			rightEnd: ['0', 'pi/4', 'pi/3'].iz(),
			primaryStep: 0.01,
			secondaryStep: 0.0001,
			authors: ['Алендарь Сергей'],
			forbidMinY,
			forbidMaxY,
			preference: preference,
		});
	}, 100);
})();
//26702

