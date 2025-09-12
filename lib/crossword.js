var emptySymbol = '*';

// Функция для создания данных кроссворда из массива ответов
function createCrosswordDataFromAnyArray(flatArray) {
	return flatArray.map(answer => ({
		clue: "", // Пустая строка для вопроса
		answer: answer
	}));
}

// Функция для создания HTML таблицы кроссворда
function createCrosswordTable(crosswordData, showAnswers = false, variantNumber) {
	if (!crosswordData || !crosswordData.table)
		return '';

	const title = (showAnswers
		? 'Кроссворд из ответов'
		: 'Кроссворд без ответов') + ' для Варианта № ' + variantNumber;

	const listTitle = showAnswers
		? 'Ответы: '
		: 'Вопросы для заполнения: ';

	// Добавляем идентификатор для контейнера кроссворда
	let crosswordHTML = `<div class="crossword-container" id="crossword-variant-${variantNumber}-${showAnswers ? 'with-answers' : 'without-answers'}" style="margin: 40px 0; padding: 20px 0; page-break-inside: avoid; border-top: 1px solid #eee;">`;
	crosswordHTML += `<h3>${title}</h3>`;
	crosswordHTML += '<table class="crossword-table" style="border-collapse: collapse; border: 2px solid #000; background-color: white; margin: 0 auto;">';

	// Создаем массив для хранения номеров ячеек
	const cellNumbers = Array(crosswordData.rows).fill().map(() =>
		Array(crosswordData.cols).fill(0)
	);

	// Помечаем ячейки с началами слов
	crosswordData.result.forEach(word => {
		const x = word.startx - 1;
		const y = word.starty - 1;

		if (y >= 0 && y < crosswordData.rows && x >= 0 && x < crosswordData.cols) {
			cellNumbers[y][x] = word.position;
		}
	});

	// Создаем строки таблицы
	crosswordHTML += addTable(crosswordData, cellNumbers, showAnswers);

	crosswordHTML += '</table>';

	// Добавляем список вопросов/ответов
	crosswordHTML += '<div style="margin-top: 20px;">';
	crosswordHTML += `<h4>${listTitle}</h4>`;
	crosswordHTML += '<ol>';

	crosswordData.result.forEach((word) => {
		crosswordHTML += addList(word, showAnswers);
	});

	crosswordHTML += '</ol>';
	crosswordHTML += '</div>';
	crosswordHTML += '</div>';

	return crosswordHTML;
}
function addTable(crosswordData, cellNumbers, word = false) {
	console.log(crosswordData);


	let crosswordHTML = '';
	for (let y = 0; y < crosswordData.rows; y++) {
		crosswordHTML += '<tr>';
		for (let x = 0; x < crosswordData.cols; x++) {
			const cellValue = crosswordData.table[y][x];
			let cellContent = '';
			let cellStyle = 'width: 35px; height: 35px; text-align: center; vertical-align: middle; position: relative; font-size: 16px;';

			if (cellValue === emptySymbol) {
				// Пустая клетка - серая закраска, черные края
				cellStyle += ' background-color: #6e6e6eff; border: 1px solid #000;';
				cellContent = '&nbsp;'; // Неразрывный пробел
			} else {
				// Клетка с символом - черная обводка, белый фон
				cellStyle += ' background-color: white; border: 2px solid #000; font-weight: bold;';
				cellContent = word ? cellValue : '&nbsp;';

				// Добавляем номер ячейки, если это начало слова (ВСЕГДА, даже если символ не разрешен)
				if (cellNumbers[y] && cellNumbers[y][x] > 0) {
					cellContent = '<span style="position: absolute; top: 2px; left: 2px; font-size: 10px; font-weight: normal; color: #000;">' +
						cellNumbers[y][x] + '</span><span style="display: inline-block; margin-top: 8px;">' +
						((cellContent === '&nbsp;') ? '&nbsp;' : cellValue) + '</span>';
				}
			}

			crosswordHTML += '<td style="' + cellStyle + '">' + cellContent + '</td>';
		}
		crosswordHTML += '</tr>';
	}
	return crosswordHTML;
}

function getOrientation(word) {
	let orientationText;
	switch (word.orientation) {
		case 'across':
			orientationText = 'по горизонтали';
			break;
		case 'down':
			orientationText = 'по вертикали';
			break;
		case 'none':
			orientationText = '';
			break;
		default:
			orientationText = word.orientation; // на случай других значений
	}
	return orientationText;
}

function addList(word, withAnswers = false) {
	let string = (word.position ? word.position + ' ' + getOrientation(word) : 'не присутствует в кроссворде');
	if (withAnswers) {
		string += ' Ответ :' + word.answer;
	} else {
		string += ' ____________________';
	}
	return '<li style="margin-bottom: 10px;">' + string + '</li>';
}

function addCrossword(withAnswers = false) {
	let allAnswers = [];
	for (const taskName in crosswordAnswers[variantNumber]) {
		crosswordAnswers[variantNumber][taskName].forEach(answerArray => {
			allAnswers.push(answerArray.join(''));
		});
	}

	// Создаем данные для кроссворда
	let crosswordInput = createCrosswordDataFromAnyArray(allAnswers);

	try {
		// Генерируем layout кроссворда
		crosswordData[variantNumber] = generateLayout(crosswordInput, emptySymbol);

		// Добавляем заголовок варианта перед кроссвордом
		let crosswordHTML = `<div class="variant-crossword" id="crossword-variant-${variantNumber}-${withAnswers ? 'with-answers' : 'without-answers'}" style="page-break-before: always; margin-bottom: 30px;">`;
		if (!options.vanishVariants) {
			crosswordHTML += '<h3>Вариант №' + options.variantPrefix + variantNumber + '</h3>';
		}
		
		// Добавляем таблицу кроссворда
		crosswordHTML += createCrosswordTable(crosswordData[variantNumber], withAnswers, variantNumber);
		crosswordHTML += '</div>';
		
		return crosswordHTML;
	} catch (error) {
		console.error('Ошибка при создании кроссворда:', error);
		return '<div style="color: red;">Ошибка при создании кроссворда из ответов для варианта ' + 
			   options.variantPrefix + variantNumber + '</div>';
	}
}

// Функция для обновления кроссворда для конкретного варианта
function updateCrosswordForVariant(variantNum) {
	// Собираем все ответы для этого варианта заново
	let allAnswers = [];
	for (const taskName in crosswordAnswers[variantNum]) {
		crosswordAnswers[variantNum][taskName].forEach(answerArray => {
			allAnswers.push(answerArray.join(''));
		});
	}

	// Создаем новые данные для кроссворда
	let crosswordInput = createCrosswordDataFromAnyArray(allAnswers);

	try {
		// Генерируем новый layout кроссворда
		crosswordData[variantNum] = generateLayout(crosswordInput, emptySymbol);

		// Обновляем кроссворд без ответов в основном контенте
		updateCrosswordInContent(variantNum, false);
		
		// Обновляем кроссворд с ответами во вкладке
		updateCrosswordInTab(variantNum, true);
		
	} catch (error) {
		console.error('Ошибка при обновлении кроссворда:', error);
	}
}

// Функция для обновления кроссворда в основном контенте
function updateCrosswordInContent(variantNum, withAnswers) {
	// Находим контейнер кроссворда для этого варианта
	const crosswordId = `crossword-variant-${variantNum}-${withAnswers ? 'with-answers' : 'without-answers'}`;
	const crosswordContainer = $(`#${crosswordId}`);
	
	if (crosswordContainer.length) {
		// Заменяем содержимое на новый кроссворд
		var newContent = '';
		if (!options.vanishVariants) {
			newContent += '<h3>Вариант №' + options.variantPrefix + variantNum + '</h3>';
		}
		newContent += createCrosswordTable(crosswordData[variantNum], withAnswers, variantNum);
		
		crosswordContainer.html(newContent);
	}
}

// Функция для обновления кроссворда во вкладке
function updateCrosswordInTab(variantNum, withAnswers) {
	// Находим контейнер кроссворда для этого варианта во вкладке
	const crosswordId = `crossword-variant-${variantNum}-${withAnswers ? 'with-answers' : 'without-answers'}`;
	const crosswordContainer = $(`#cross #${crosswordId}`);
	
	if (crosswordContainer.length) {
		// Заменяем содержимое на новый кроссворд
		var newContent = '';
		if (!options.vanishVariants) {
			newContent += '<h3>Вариант №' + options.variantPrefix + variantNum + '</h3>';
		}
		newContent += createCrosswordTable(crosswordData[variantNum], withAnswers, variantNum);
		
		crosswordContainer.html(newContent);
	}
}

