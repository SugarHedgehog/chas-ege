'use strict';

//{{ Новый, даже немножко работающий, парсер линейных задач
let punctuation=[',','.',':',';','?','!','\'','\"','°'];
function splitTextToLexems(text) {
	var lexemArray = text.split(" "||"("||")"||"["||"]");
	for (let i = 0; i < lexemArray.length; i++){
		if (lexemArray[i].length>1&&punctuation.includes(lexemArray[i].slice(-1))){
			lexemArray.splice(i, 1, lexemArray[i].substr(0,lexemArray[i].length-1), lexemArray[i].slice(-1))}}
	return lexemArray;
}

function variateOtherNumbers(lexemArray, variableList) {
	var newLexemArray = [];
	for (var i = 0, len = lexemArray.length; i < len; i++) {
		if (lexemArray[i].isNumeric()) {
			//TODO: человекопонятные названия переменных на основе ближайших слов, если не заняты
			newLexemArray = newLexemArray.concat(splitTextToLexems("'+n" + i + "+'"));
			variableList['n' + i] = 'sl(' + 0 + ',' + lexemArray[i] + ',' + '1)';
		} else {
			newLexemArray.push(lexemArray[i]);
		}
	}
	return newLexemArray;
}
function makeTemplateFromPlainText(text) {
	text = text.replace(/­/g, ""); //Убиваем мягкий перенос
	text = text.replace('\n', ""); //Убиваем перенос
	var lexemArray = splitTextToLexems(text);
	//TODO: напихать в хвост массива пустых лексем, чтоб не падало
	console.log(lexemArray);
	var variableList = {};
	lexemArray = variateNumbersWithNouns(lexemArray, variableList);
	lexemArray = variateOtherNumbers(lexemArray, variableList);
	let str = ''
	for (let i = 0; i < lexemArray.length; i++) {
		str += lexemArray[i];
		if (![',', '.', ';', ':'].includes(lexemArray[i + 1]))
			str += ' ';
	}
	return "(function() {\n" + joinVariableList(variableList) + "\nNAtask.setTask({\n\ttext:'" + lexemArray.join(" ") + "',\n\tanswers:0,\n});\n})();\n";
}


function variateNumbersWithNouns(lexemArray, variableList) {
	var newLexemArray = [];
	for (var i = 0, len = lexemArray.length; i < len; i++) {
		if (lexemArray[i].isNumeric()) {
			//TODO: человекопонятные названия переменных на основе ближайших слов, если не заняты
			var foundWord = lexemArray[i + 1];
			var foundNumber = lexemArray[i];
			var actualWord = '';
			for (var j = foundWord.length; j && !actualWord; j--) {
				//TODO: отслеживать реальное наличие в lx. Или наоборот?
				if (foundWord.length > 3)
					if (chislitlx(foundNumber, foundWord.substr(0, j)) == foundNumber + ' ' + foundWord) {
						actualWord = foundWord.substr(0, j);
						break;
					}
				//TODO: поиск по всему lx
			}
			if (actualWord) {
				//Нашли подходящее слово
				variableList['n' + i] = 'sl(' + 1 + ',' + lexemArray[i] + ')';
				newLexemArray = newLexemArray.concat(splitTextToLexems("'+chislitlx(n" + i + ",'" + actualWord + "')+'"));
				i += 2; //А что зря цикл гонять?
			} else {
				newLexemArray = newLexemArray.concat([lexemArray[i]]);
			}
		} else {
			newLexemArray.push(lexemArray[i]);
		}
	}
	return newLexemArray;
}

function joinVariableList(variableList) {
	var code = '';
	for (var variable in variableList) {
		code += 'var ' + variable + '=' + variableList[variable] + ';\n';
	}
	return code;
}
module.exports = { makeTemplateFromPlainText, splitTextToLexems, variateOtherNumbers, variateNumbersWithNouns, joinVariableList };
//}}
