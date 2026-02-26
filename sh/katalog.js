'use strict';

/**
 * Генерирует HTML для задания.
 * @param {string} category - Категория задания.
 * @param {string} taskNumber - Номер задания.
 * @param {Array} actionsArray - Массив действий.
 * @returns {string} - HTML-код задания.
 */
/**
 * Генерирует HTML для задания.
 * @param {string} category - Категория задания.
 * @param {string} taskNumber - Номер задания.
 * @param {Array} actionsArray - Массив действий.
 * @returns {string} - HTML-код задания.
 */
function generateHtmlForTask(category, taskNumber, actionsArray) {
    let htmlContent = '';
    vopr.podg();
    const currentTaskPath = `${nabor.adres}${category}/${taskNumber}.js`;

    try {
        // Execute the task generator
        nabor.upak[category][taskNumber]();

        // Handle variations if preferences exist
        let variants = [null]; // Default case - single variant
        
        let hasExplicitPreferences = window.nabor.preferences && window.nabor.preferences[taskNumber];
        
        if (vopr.preference && Array.isArray(vopr.preference) && vopr.preference.length > 0) {
            if (hasExplicitPreferences) {
                variants = [window.nabor.preferences[taskNumber]];
            } else {
                variants = generateVariations(vopr.preference);
            }
        }

        // Generate HTML for each variant
        for (let i = 0; i < variants.length; i++) {
            // СОХРАНЯЕМ исходное состояние перед генерацией
            const originalPreferences = window.nabor.preferences ? {...window.nabor.preferences} : {};
            const originalVopr = {...vopr}; // поверхностное копирование
            
            try {
                // Подготавливаем задание
                
                if (variants[i] !== null) {
                    // Set preferences for this variant
                    window.nabor.preferences = window.nabor.preferences || {};
                    window.nabor.preferences[taskNumber] = variants[i];
                }

                // Execute the task generator
                nabor.upak[category][taskNumber]();

            htmlContent += `<div class="task-wrapper" data-category="${category}" data-tasknumber="${taskNumber}">`;
            htmlContent += currentTaskPath.vTag('h2');

                if (variants.length > 1 || hasExplicitPreferences) {
                    const currentVariation = [taskNumber];
                    if(Array.isArray(variants[i])){
                        currentVariation.push(variants[i].join('_'));
                        currentVariation.push(variants[i].join(' '));
                    } else {
                        currentVariation.push(variants[i], variants[i]);
                    }
                    htmlContent += `<div class="variant-info">Вариация: '${currentVariation.join(' ')}'</div>`;
                }

            vopr.template = currentTaskPath.replace(/^(\.\.\/)+/, '');
            vopr.taskNumber = category;
            htmlContent += `<br/>${vopr.txt.vTag('div')}<br/>`;
            htmlContent += `
                <div>
                    <button class="copybutton" style="float:right;" title="Экспорт в РешуЕГЭ" data-task="${encodeURIComponent(JSON.stringify(vopr))}">&#x2398;</button>
                    <button class="renewbutton" style="float:right; margin-right:1.46em;" title="Заменить задание на похожее">&#x27F3;</button>
                    <button class="addbutton" style="float:right; margin-right:1.46em;" title="Добавить похожее задание">+</button>
                    Ответ: ${vopr.ver.join('или')}
                </div>
                <br/>
            `;

            if (vopr.dey) {
                actionsArray.push(vopr.dey);
            }

            if (vopr.rsh) {
                htmlContent += `
                    <button class="spoiler-show">Показать решение</button>
                    <button class="spoiler-hide">Скрыть решение</button>
                    <div class="spoiler-body">Решение: <br/>${vopr.rsh}</div>
                `;
            }

            if (vopr.authors && vopr.authors.length) {
                htmlContent += `
                    <br/>
                    <div class="katalog-authors">
                        Автор${'ы'.esli(vopr.authors.length > 1)}: &nbsp;${vopr.authors.join(', ')}
                    </div>
                    <br/>
                `;
            }

            htmlContent += '</div>';
            } finally {
                // ВОССТАНАВЛИВАЕМ исходное состояние после каждой вариации
                if (window.nabor.preferences) {
                    window.nabor.preferences[taskNumber] = originalPreferences[taskNumber];
                }
                // Важно: не перезаписываем весь vopr, так как могут быть методы
                Object.keys(originalVopr).forEach(key => {
                    if (vopr[key] !== originalVopr[key]) {
                        vopr[key] = originalVopr[key];
                    }
                });
            }
        }
    } catch (e) {
        console.error(e);
        htmlContent += `<div class="task-wrapper error" data-category="${category}" data-tasknumber="${taskNumber}">
            Error generating task: ${e.message}
        </div>`;
    }

    return htmlContent;
}

/**
 * Генерирует каталог заданий.
 */
function generateKatalog() {
    let htmlContent = '';
    let tableOfContents = '';
    const actionsArray = [];
    const lineBreak = '<br/>';

    for (const category in nabor.upak) {
        window.comment = '';
        window.availableTaskNumbers = null;

        try {
            nabor.upak[category][nabor.scheduler]();
        } catch (e) {
            console.error(e);
        }

        htmlContent += `
            <button class="spoiler-show">Показать категорию ${category}</button>
            <button class="spoiler-hide">Скрыть категорию ${category}</button>
            <div class="spoiler-body">
                <h1 id="${category}">Категория ${category}</h1>
                ${window.comment}
        `;
        tableOfContents += `<a href="#${category}">${category}. ${window.comment}</a>${lineBreak}`;

        const tasksToList = window.availableTaskNumbers || Object.keys(nabor.upak[category]);

        for (const taskNumber of tasksToList) {
            if (taskNumber !== 'main' && taskNumber !== 'fipi') {
                htmlContent += generateHtmlForTask(category, taskNumber, actionsArray);
            }
        }

        htmlContent += '</div>';
    }

    $('#divrez').html(tableOfContents + lineBreak + htmlContent);

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
    $('button.copybutton[data-already-inited!=true]').click(copyTask).attr('data-already-inited', true);
    $('button.renewbutton[data-already-inited!=true]').click(renewTask).attr('data-already-inited', true);
    $('button.addbutton[data-already-inited!=true]').click(addTask).attr('data-already-inited', true);
}

/**
 * Копирует задание в буфер обмена.
 */
function copyTask() {
    console.log(this);
    let taskData = decodeURIComponent(this.getAttribute('data-task'));
    console.log(taskData);
    try {
        taskData = JSON.parse(taskData);
    } catch (e) {
        console.error('Failed to parse task data:', e);
        return;
    }
    console.log(taskData);

    replaceCanvasWithImgInTaskAndHTML($(this).closest('div.task-wrapper')[0], taskData, () => {
        const fillerCode = createFiller(taskData);
        copyToClipboard(fillerCode);
    });
}

/**
 * Обновляет задание на новое.
 */
function renewTask() {
    console.log(this);
    const taskWrapper = $(this).closest('div.task-wrapper')[0];
    const actions = [];
    const taskHtml = $(generateHtmlForTask(taskWrapper.getAttribute('data-category'), taskWrapper.getAttribute('data-tasknumber'), actions));
    $(taskWrapper).replaceWith(taskHtml);
    if (actions[0] && typeof actions[0] === 'function') {
        actions[0]();
    }
    MathJax.Hub.Typeset(taskHtml[0]);
    afterTasksGenerated();
}

/**
 * Добавляет новое задание после текущего.
 */
function addTask() {
    console.log(this);
    const taskWrapper = $(this).closest('div.task-wrapper')[0];
    const actions = [];
    const taskHtml = $(generateHtmlForTask(taskWrapper.getAttribute('data-category'), taskWrapper.getAttribute('data-tasknumber'), actions));
    taskHtml.insertAfter(taskWrapper);
    actions[0]();
    MathJax.Hub.Typeset(taskHtml[0]);
    afterTasksGenerated();
}
