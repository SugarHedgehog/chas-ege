'use strict';

/**
 * Генерирует HTML для задания.
 * @param {string} category - Категория задания.
 * @param {string} taskNumber - Номер задания.
 * @param {Array} actionsArray - Массив действий.
 * @returns {string} - HTML-код задания.
 */
function generateHtmlForTask(category, taskNumber, actionsArray) {
    try {
        prepareTaskGeneration(category, taskNumber);
        const variants = getTaskVariants(taskNumber);
        
        let htmlContent = '';
        for (let i = 0; i < variants.length; i++) {
            htmlContent += generateVariantHtml(category, taskNumber, variants[i], i, variants.length, actionsArray);
        }
        return htmlContent;
    } catch (e) {
        return handleTaskError(category, taskNumber, e);
    }
}

/**
 * Подготавливает окружение для генерации задания
 */
function prepareTaskGeneration(category, taskNumber) {
    vopr.podg();
    nabor.upak[category][taskNumber]();
}

/**
 * Получает варианты задания на основе предпочтений
 */
function getTaskVariants(taskNumber) {
    let variants = [null];
    const hasExplicitPreferences = window.nabor.preferences && window.nabor.preferences[taskNumber];
    
    if (vopr.preference && Array.isArray(vopr.preference) && vopr.preference.length > 0) {
        if (hasExplicitPreferences) {
            variants = [window.nabor.preferences[taskNumber]];
        } else {
            variants = generateVariations(vopr.preference);
        }
    }
    return variants;
}

/**
 * Генерирует HTML для одного варианта задания
 */
function generateVariantHtml(category, taskNumber, variant, index, totalVariants, actionsArray) {
    const state = saveCurrentState(taskNumber);
    
    try {
        applyVariantPreferences(taskNumber, variant);
        regenerateTask(category, taskNumber);
        
        let html = createTaskWrapperStart(category, taskNumber);
        html += createTaskTitle(taskNumber);
        html += createVariantInfoIfNeeded(taskNumber, variant, index, totalVariants);
        html += createTaskContent(taskNumber, category);
        html += createTaskFooter(taskNumber, actionsArray);
        html += createSolutionSection(taskNumber);
        html += createAuthorsSection(taskNumber);
        html += '</div>';
        
        return html;
    } finally {
        restoreState(taskNumber, state);
    }
}

/**
 * Сохраняет текущее состояние перед генерацией варианта
 */
function saveCurrentState(taskNumber) {
    return {
        originalPreferences: window.nabor.preferences ? {...window.nabor.preferences} : {},
        originalVopr: {...vopr}
    };
}

/**
 * Восстанавливает состояние после генерации варианта
 */
function restoreState(taskNumber, state) {
    if (window.nabor.preferences) {
        window.nabor.preferences[taskNumber] = state.originalPreferences[taskNumber];
    }
    
    Object.keys(state.originalVopr).forEach(key => {
        if (vopr[key] !== state.originalVopr[key]) {
            vopr[key] = state.originalVopr[key];
        }
    });
}

/**
 * Применяет предпочтения для конкретного варианта
 */
function applyVariantPreferences(taskNumber, variant) {
    if (variant !== null) {
        window.nabor.preferences = window.nabor.preferences || {};
        window.nabor.preferences[taskNumber] = variant;
    }
}

/**
 * Перегенерирует задание с текущими настройками
 */
function regenerateTask(category, taskNumber) {
    nabor.upak[category][taskNumber]();
}

/**
 * Создает открывающий тег обертки задания
 */
function createTaskWrapperStart(category, taskNumber) {
    return `<div class="task-wrapper" data-category="${category}" data-tasknumber="${taskNumber}">`;
}

/**
 * Создает заголовок задания
 */
function createTaskTitle(taskNumber) {
    const currentTaskPath = `${nabor.adres}${category}/${taskNumber}.js`;
    return currentTaskPath.vTag('h2');
}

/**
 * Создает информацию о варианте, если их несколько
 */
function createVariantInfoIfNeeded(taskNumber, variant, index, totalVariants) {
    const hasExplicitPreferences = window.nabor.preferences && window.nabor.preferences[taskNumber];
    
    if (totalVariants > 1 || hasExplicitPreferences) {
        const variation = formatVariantInfo(taskNumber, variant);
        return `<div class="variant-info">Вариация: '${variation}'</div>`;
    }
    return '';
}

/**
 * Форматирует информацию о варианте
 */
function formatVariantInfo(taskNumber, variant) {
    const parts = [taskNumber];
    if (Array.isArray(variant)) {
        parts.push(variant.join('_'), variant.join(' '));
    } else {
        parts.push(variant, variant);
    }
    return parts.join(' ');
}

/**
 * Создает основное содержание задания
 */
function createTaskContent(taskNumber, category) {
    vopr.template = `${nabor.adres}${category}/${taskNumber}.js`.replace(/^(\.\.\/)+/, '');
    vopr.taskNumber = category;
    return `<br/>${vopr.txt.vTag('div')}<br/>`;
}

/**
 * Создает футер задания с кнопками и ответом
 */
function createTaskFooter(taskNumber, actionsArray) {
    if (vopr.dey) {
        actionsArray.push(vopr.dey);
    }
    
    return `
        <div>
            <button class="copybutton" style="float:right;" title="Экспорт в РешуЕГЭ" data-task="${encodeURIComponent(JSON.stringify(vopr))}">&#x2398;</button>
            <button class="renewbutton" style="float:right; margin-right:1.46em;" title="Заменить задание на похожее">&#x27F3;</button>
            <button class="addbutton" style="float:right; margin-right:1.46em;" title="Добавить похожее задание">+</button>
            Ответ: ${vopr.ver.join('или')}
        </div>
        <br/>
    `;
}

/**
 * Создает секцию с решением
 */
function createSolutionSection(taskNumber) {
    if (!vopr.rsh) return '';
    
    return `
        <button class="spoiler-show">Показать решение</button>
        <button class="spoiler-hide">Скрыть решение</button>
        <div class="spoiler-body">Решение: <br/>${vopr.rsh}</div>
    `;
}

/**
 * Создает секцию с авторами
 */
function createAuthorsSection(taskNumber) {
    if (!vopr.authors || !vopr.authors.length) return '';
    
    const authorLabel = `Автор${'ы'.esli(vopr.authors.length > 1)}: &nbsp;`;
    return `
        <br/>
        <div class="katalog-authors">
            ${authorLabel}${vopr.authors.join(', ')}
        </div>
        <br/>
    `;
}

/**
 * Обрабатывает ошибку генерации задания
 */
function handleTaskError(category, taskNumber, error) {
    console.error(error);
    return `<div class="task-wrapper error" data-category="${category}" data-tasknumber="${taskNumber}">
        Error generating task: ${error.message}
    </div>`;
}


/**
 * Генерирует каталог заданий.
 */
function generateKatalog() {
    const state = initializeCatalogGeneration();
    
    for (const category in nabor.upak) {
        processCategory(category, state);
    }

    renderCatalog(state);
    executePostGenerationActions(state.actionsArray);
}

/**
 * Инициализирует состояние для генерации каталога
 */
function initializeCatalogGeneration() {
    return {
        htmlContent: '',
        tableOfContents: '',
        actionsArray: [],
        lineBreak: '<br/>'
    };
}

/**
 * Обрабатывает одну категорию заданий
 */
function processCategory(category, state) {
    resetCategoryState();
    
    try {
        nabor.upak[category][nabor.scheduler]();
    } catch (e) {
        console.error(e);
    }

    addCategoryHeader(category, state);
    addTasksToCategory(category, state);
    closeCategory(state);
}

/**
 * Сбрасывает состояние для новой категории
 */
function resetCategoryState() {
    window.comment = '';
    window.availableTaskNumbers = null;
}

/**
 * Добавляет заголовок категории
 */
function addCategoryHeader(category, state) {
    state.htmlContent += `
        <button class="spoiler-show">Показать категорию ${category}</button>
        <button class="spoiler-hide">Скрыть категорию ${category}</button>
        <div class="spoiler-body">
            <h1 id="${category}">Категория ${category}</h1>
            ${window.comment}
    `;
    
    state.tableOfContents += `<a href="#${category}">${category}. ${window.comment}</a>${state.lineBreak}`;
}

/**
 * Добавляет все задания категории
 */
function addTasksToCategory(category, state) {
    const tasksToList = window.availableTaskNumbers || Object.keys(nabor.upak[category]);
    
    for (const taskNumber of tasksToList) {
        if (shouldIncludeTask(taskNumber)) {
            state.htmlContent += generateHtmlForTask(category, taskNumber, state.actionsArray);
        }
    }
}

/**
 * Проверяет, нужно ли включать задание
 */
function shouldIncludeTask(taskNumber) {
    return taskNumber !== 'main' && taskNumber !== 'fipi';
}

/**
 * Закрывает блок категории
 */
function closeCategory(state) {
    state.htmlContent += '</div>';
}

/**
 * Рендерит каталог
 */
function renderCatalog(state) {
    $('#divrez').html(state.tableOfContents + state.lineBreak + state.htmlContent);
}

/**
 * Выполняет пост-генерационные действия
 */
function executePostGenerationActions(actionsArray) {
    actionsArray.forEach(action => {
        try {
            if (typeof action === 'function') {
                action();
            }
        } catch (e) {
            console.error(e);
        }
    });

    MathJax.Hub.Typeset();
    afterTasksGenerated();
    $('.spoiler-show').click();
}

/**
 * Выполняет действия после генерации заданий.
 */
function afterTasksGenerated() {
    spoiler();
    initializeButtons();
}

/**
 * Инициализирует кнопки
 */
function initializeButtons() {
    initCopyButtons();
    initRenewButtons();
    initAddButtons();
}

/**
 * Инициализирует кнопки копирования
 */
function initCopyButtons() {
    $('button.copybutton[data-already-inited!=true]')
        .click(copyTask)
        .attr('data-already-inited', true);
}

/**
 * Инициализирует кнопки обновления
 */
function initRenewButtons() {
    $('button.renewbutton[data-already-inited!=true]')
        .click(renewTask)
        .attr('data-already-inited', true);
}

/**
 * Инициализирует кнопки добавления
 */
function initAddButtons() {
    $('button.addbutton[data-already-inited!=true]')
        .click(addTask)
        .attr('data-already-inited', true);
}

/**
 * Копирует задание в буфер обмена.
 */
function copyTask() {
    const taskData = parseTaskData(this);
    if (!taskData) return;

    replaceCanvasWithImgInTaskAndHTML($(this).closest('div.task-wrapper')[0], taskData, () => {
        const fillerCode = createFiller(taskData);
        copyToClipboard(fillerCode);
    });
}

/**
 * Парсит данные задания из атрибута кнопки
 */
function parseTaskData(button) {
    console.log(button);
    let taskData = decodeURIComponent(button.getAttribute('data-task'));
    console.log(taskData);
    
    try {
        taskData = JSON.parse(taskData);
        console.log(taskData);
        return taskData;
    } catch (e) {
        console.error('Failed to parse task data:', e);
        return null;
    }
}

/**
 * Обновляет задание на новое.
 */
function renewTask() {
    const taskWrapper = getTaskWrapper(this);
    const actions = [];
    const taskHtml = generateTaskHtml(taskWrapper, actions);
    
    $(taskWrapper).replaceWith(taskHtml);
    executeTaskActions(actions, taskHtml);
}

/**
 * Добавляет новое задание после текущего.
 */
function addTask() {
    const taskWrapper = getTaskWrapper(this);
    const actions = [];
    const taskHtml = generateTaskHtml(taskWrapper, actions);
    
    taskHtml.insertAfter(taskWrapper);
    executeTaskActions(actions, taskHtml);
}

/**
 * Получает обертку задания
 */
function getTaskWrapper(element) {
    return $(element).closest('div.task-wrapper')[0];
}

/**
 * Генерирует HTML для нового задания
 */
function generateTaskHtml(taskWrapper, actionsArray) {
    return $(generateHtmlForTask(
        taskWrapper.getAttribute('data-category'),
        taskWrapper.getAttribute('data-tasknumber'),
        actionsArray
    ));
}

/**
 * Выполняет действия после генерации задания
 */
function executeTaskActions(actionsArray, taskHtml) {
    if (actionsArray[0] && typeof actionsArray[0] === 'function') {
        actionsArray[0]();
    }
    MathJax.Hub.Typeset(taskHtml[0]);
    afterTasksGenerated();
}
