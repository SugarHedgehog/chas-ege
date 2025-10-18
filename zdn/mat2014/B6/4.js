(function () {


	var a = sluchiz([100, 200, 250, 400, 500, 1000, 2000])[0];
	var b = sluchch(2, 20);
	let key = "4";
	let preference1 = ['notHaveDefectInQuest', 'haveDefectInQuest'];
	let preference2 = ['haveDefect', 'notHaveDefect'];
	let v1 = getSelectedPreferenceFromList(key, preference1);
	let v2 = getSelectedPreferenceFromList(key, preference2);
	var c = (v1 ? b : a - b) / a;
	var d = v2 ? a - b : b;
	var f = sluchch(om.tovary.ie.length - 1);
	var t1 = v1 ? 'имеет дефекты' : 'не имеет дефектов';
	window.vopr.txt = 'В среднем из ' + a + ' ' + om.tovary.rm[f] + ', поступивших в продажу, ' +
		d + ' ' + (v2 ? 'не ' : '') + chislit(d, 'имеет', 'имеют', 'имеют') + ' дефект' + (!v2 ? 'ы' : 'ов') +
		'. Найдите вероятность того, что один случайным образом выбранный экземпляр товара ' + t1 + '.';
	window.vopr.ver = ['' + c.ts()];

	window.vopr.kat['log'] = 0;
	window.vopr.kat['prz'] = 0;
	window.vopr.kat['drs'] = 0;
	window.vopr.kat['tri'] = 0;
})();
