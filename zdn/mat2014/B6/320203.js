//52. Задание 4 № 320203
//Из районного центра в деревню ежедневно ходит автобус. Вероятность того,
//что в понедельник в автобусе окажется меньше 20 пассажиров, равна 0,94.
//Вероятность того, что окажется меньше 15 пассажиров, равна 0,56.
//Найдите вероятность того, что число пассажиров будет от 15 до 19.

(function() {'use strict';
NAinfo.requireApiVersion(0, 0);
var mest1 = ['районного центра', 'деревни', 'города', 'города A'].iz();
var mest2;
if (mest1 == 'районного центра' || mest1 == 'города') {
	mest2 = 'деревню';
} else if (mest1 == 'города A') {
	mest2 = 'город B';
} else {
	mest2 = ['районный центр', 'город'].iz();
}
var vremya = [
	[['ежечасно','каждый час'].iz(),['в 00:00','в 1:00','в 2:00','в 3:00','в 4:00','в 5:00','в 6:00','в 7:00','в 8:00','в 9:00','в 10:00','в 11:00','в 12:00','в 13:00','в 14:00','в 15:00','в 16:00','в 17:00','в 18:00','в 19:00','в 20:00','в 21:00','в 22:00','в 23:00'].iz()],
	[['ежедневно','каждый день'].iz(),['в понедельник', 'в среду', 'во вторник', 'в четверг', 'в пятницу', 'в субботу', 'в воскресенье'].iz()]
].iz();
var transport = sklonlxkand(['автобус','электричка','маршрутка'].iz());
var max; // = sluchch(17,24);
var min; // = max -  sluchch(3,12));
do {
	max = sluchch(15, 30);
	min = max - sluchch(3, 12);
} while (min < 0);
var ver1 = (sluchch(80, 98)) / 100;
var ver2 = (sluchch(45, 70)) / 100;

NAtask.setTask({
	text: 'Из ' + mest1 + ' в ' + mest2 + ' ' + vremya[0] + ' ходит '+transport.ie+'. Вероятность того, ' +
		'что ' + vremya[1] + ' в '+transport.pe+' окажется меньше ' + max + ' пассажиров, равна ' + ver1 + '. ' +
		'Вероятность того, что окажется меньше ' + min + ' пассажиров, равна ' + ver2 + '. ' +
		'Найдите вероятность того, что число пассажиров будет от ' + min + ' до ' + (max - 1) + '.',

	answers: ver1 - ver2,

});
NAtask.modifiers.variativeABC();//расставляем случайные буквы
})();

