console.log('Overriding...');
// Здесь можно писать комментарии. Собственно, вот так!


// Это у нас так номер варианта пишется!
//$('#variantPrefix').val('1.');

// Количество вариантов
$('#cV').val('5');
window.nabor.upak[1].main = function(){
	window.nomer = 11;
}

window.nabor.upak[2].main = function(){
	window.nomer = 644849;
}

window.nabor.upak[3].main = function(){
	window.nomer = 5077;
}

window.nabor.upak[4].main = function(){
	window.nomer = 1;
	window.nabor.preferences['1'] = ['two_tosses'];
}

window.nabor.upak[5].main = function(){
	window.nomer = 320197;
}

window.nabor.upak[6].main = function(){
	window.nomer = 6;
	window.nabor.preferences['6'] = ['3', 'linearPart'];
}

window.nabor.upak[7].main = function(){
	window.nomer = 26777;
	window.nabor.preferences['26777'] = ['sin', 'cos'].randomReverse();
}

window.nabor.upak[8].main = function(){
	window.nomer = 562751;
}

window.nabor.upak[9].main = function(){
	window.nomer = 8;
}

window.nabor.upak[10].main = function(){
	window.nomer = 26584;
	chas2.task.setTask.forbidDecimalFractions = true;
}

window.nabor.upak[11].main = function(){
	window.nomer = 509009;
	window.nabor.preferences['509009'] = ['functionOfX', 'withoutB', ['integerA', 'decimalA'].iz()];
	chas2.task.setTask.forbidDecimalFractions = false;
}

window.nabor.upak[12].main = function(){
	window.nomer = 22;
}

