//39. Задание 4 № 320190
//На борту самолёта 12 кресел расположены рядом с запасными выходами и 18 — за перегородками, разделяющими салоны.
//Все эти места удобны для пассажира высокого роста. Остальные места неудобны. Пассажир В. высокого роста.
//Найдите вероятность того, что на регистрации при случайном выборе места пассажиру В. достанется удобное место, если всего в самолёте 300 мест.

(function(){'use strict';
NAinfo.requireApiVersion(0, 0);
var pass = om.rusbukv.iz();
var zapasn;
var peregorodk;
var vsego;
var answers;

do{
	zapasn = sluchch(10,28);
	peregorodk = sluchch(11,28);
	vsego = sluchch(100,450);
	answers = (zapasn+peregorodk)/vsego;
} while ((answers*10000)%100 !== 0);

NAtask.setTask({
	text: 'На борту самолёта '+zapasn+' кресел расположены рядом с запасными выходами и '+peregorodk+' — за перегородками, разделяющими салоны.'+
		'Все эти места удобны для пассажира высокого роста. Остальные места неудобны. Пассажир '+pass+'. высокого роста. '+
		'Найдите вероятность того, что на регистрации при случайном выборе места пассажиру '+pass+'.'+
		'достанется удобное место, если всего в самолёте '+vsego+' мест.',
	answers,
});
})();
