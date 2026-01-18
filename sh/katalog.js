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
function generateHtmlForTask(category, taskNumber, actionsArray, onError) {
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
                    const currentVariation = Array.isArray(variants[i])
                        ? variants[i].join(', ')
                        : variants[i];
                    htmlContent += `<div class="variant-info">Вариация: ${currentVariation}</div>`;
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
        console.error('Ошибка генерации шаблона:', {
            category: category,
            taskNumber: taskNumber,
            template: vopr && vopr.template,
            taskText: vopr && vopr.txt,
            answer: vopr && vopr.ver,
            actions: vopr && vopr.dey,
            taskData: vopr,
        });
        if (typeof onError === 'function') {
            onError(e);
        }
        htmlContent += `<div class="task-wrapper error" data-category="${category}" data-tasknumber="${taskNumber}">
            Error generating task: ${e.message}
        </div>`;
    }

    return htmlContent;
}

var katalogGeneration = {
    stop: false,
    inProgress: false,
};

var TASK_TIMEOUT_MS = 60 * 1000;
var MAX_GENERATION_ERRORS = 30;

function stopKatalogGeneration() {
    katalogGeneration.stop = true;
}

var loadingUi = {
    $root: null,
    $status: null,
};

function ensureLoadingUi() {
    if (!loadingUi.$root) {
        loadingUi.$root = $('#katalog-loading');
        loadingUi.$status = $('#katalog-loading-status');
    }
}

function setLoadingVisible(isVisible) {
    ensureLoadingUi();
    if (!loadingUi.$root || !loadingUi.$root.length) {
        return;
    }
    loadingUi.$root.toggleClass('hidden', !isVisible);
    loadingUi.$root.attr('aria-busy', isVisible ? 'true' : 'false');
}

function setLoadingStatus(text) {
    ensureLoadingUi();
    if (!loadingUi.$status || !loadingUi.$status.length) {
        return;
    }
    loadingUi.$status.text(text || '');
}

function getCategoryLabel(category) {
    var comment = (window.comment || '').trim();
    if (comment) {
        return category + ': ' + comment;
    }
    return category;
}

function renderCategoryControls() {
    var $controls = $('#katalog-controls');
    if (!$controls.length || !window.nabor || !window.nabor.upak) {
        return;
    }
    $controls.empty();
    var categories = Object.keys(nabor.upak);
    var $list = $('<div class="katalog-controls__list"></div>');
    categories.forEach(function(category, index) {
        var prevComment = window.comment;
        var prevAvailable = window.availableTaskNumbers;
        window.comment = '';
        window.availableTaskNumbers = null;
        try {
            nabor.upak[category][nabor.scheduler]();
        } catch (e) {
            console.error(e);
        }
        var categoryLabel = getCategoryLabel(category);
        window.comment = prevComment;
        window.availableTaskNumbers = prevAvailable;

        var checkboxId = 'katalog-category-' + index;
        var $item = $('<label class="katalog-controls__item"></label>');
        var $checkbox = $('<input type="checkbox" checked />').attr('id', checkboxId).data('category', category);
        var $text = $('<span></span>').text(categoryLabel);
        $item.append($checkbox, $text);
        $list.append($item);
    });
    var $actions = $('<div class="katalog-controls__actions"></div>');
    var $generate = $('<button type="button">Генерировать выбранное</button>');
    var $reset = $('<button type="button">Сбросить выбор</button>');
    $generate.on('click', function() {
        var selected = [];
        $list.find('input[type=checkbox]').each(function() {
            if (this.checked) {
                selected.push($(this).data('category'));
            }
        });
        if (!selected.length) {
            return;
        }
        generateKatalog({ categories: selected });
    });
    $reset.on('click', function() {
        $list.find('input[type=checkbox]').prop('checked', true);
    });
    $actions.append($generate, $reset);
    $controls.append($list, $actions);
}

/**
 * Генерирует каталог заданий.
 */
function generateKatalog(options) {
    if (katalogGeneration.inProgress) {
        return;
    }

    katalogGeneration.stop = false;
    katalogGeneration.inProgress = true;
    setLoadingVisible(true);
    setLoadingStatus('Подготовка каталога...');

    const actionsArray = [];
    const lineBreak = '<br/>';
    const $result = $('#divrez');
    $result.html('<div id="katalog-toc"></div><br/><div id="katalog-content"></div>');
    const $toc = $('#katalog-toc');
    const $content = $('#katalog-content');

    const categoryFilter = options && options.categoryFilter ? options.categoryFilter : null;
    const categoriesOverride = options && Array.isArray(options.categories) ? options.categories : null;
    const categories = categoriesOverride
        ? categoriesOverride
        : (categoryFilter ? [categoryFilter] : Object.keys(nabor.upak));
    if (!categories.length) {
        katalogGeneration.inProgress = false;
        setLoadingVisible(false);
        setLoadingStatus('');
        return;
    }
    let categoryIndex = 0;
    let taskIndex = 0;
    let currentCategory = null;
    let tasksToList = [];
    let currentCategoryBody = null;
    let errorCount = 0;
    let stopReason = '';

    function prepareCategory(category) {
        window.comment = '';
        window.availableTaskNumbers = null;

        try {
            nabor.upak[category][nabor.scheduler]();
        } catch (e) {
            console.error(e);
        }

        var $showButton = $('<button class="spoiler-show">Показать категорию ' + category + '</button>');
        var $hideButton = $('<button class="spoiler-hide">Скрыть категорию ' + category + '</button>');
        var $body = $('<div class="spoiler-body"></div>');
        $body.append('<h1 id="' + category + '">Категория ' + category + '</h1>' + window.comment);
        $content.append($showButton, $hideButton, $body);
        currentCategoryBody = $body;
        $toc.append(`<a href="#${category}">${category}. ${window.comment}</a>${lineBreak}`);
        setLoadingStatus('Генерируем категорию ' + getCategoryLabel(category));
        tasksToList = window.availableTaskNumbers || Object.keys(nabor.upak[category]);
        taskIndex = 0;
    }

    function finalizeGeneration(stopped) {
        setLoadingVisible(false);
        setLoadingStatus('');
        if (stopped) {
            var message = stopReason || 'Генерация остановлена пользователем.';
            $content.append('<div class="katalog-stopped">' + message + '</div>');
        }

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
        katalogGeneration.inProgress = false;
    }

    const scheduleNext = window.requestIdleCallback
        ? (cb) => window.requestIdleCallback(cb)
        : (cb) => setTimeout(cb, 0);

    function processChunk() {
        if (katalogGeneration.stop) {
            finalizeGeneration(true);
            return;
        }

        if (categoryIndex >= categories.length) {
            finalizeGeneration(false);
            return;
        }

        if (!currentCategory) {
            currentCategory = categories[categoryIndex];
            prepareCategory(currentCategory);
        }

        if (taskIndex >= tasksToList.length) {
            currentCategory = null;
            currentCategoryBody = null;
            categoryIndex += 1;
            scheduleNext(processChunk);
            return;
        }

        const taskNumber = tasksToList[taskIndex];
        taskIndex += 1;

        if (taskNumber !== 'main' && taskNumber !== 'fipi') {
            setLoadingStatus('Генерируем категорию ' + getCategoryLabel(currentCategory) + ' — задание ' + taskNumber);
            var taskStart = Date.now();
            var taskHtml = generateHtmlForTask(currentCategory, taskNumber, actionsArray, function() {
                errorCount += 1;
                if (errorCount >= MAX_GENERATION_ERRORS) {
                    stopReason = 'Генерация остановлена: слишком много ошибок (' + errorCount + ').';
                    katalogGeneration.stop = true;
                }
            });
            var duration = Date.now() - taskStart;
            if (duration > TASK_TIMEOUT_MS) {
                currentCategoryBody.append('<div class="task-wrapper error" data-category="' +
                    currentCategory + '" data-tasknumber="' + taskNumber +
                    '">Пропущено: генерация заняла больше минуты.</div>');
            } else {
                currentCategoryBody.append(taskHtml);
            }
        }

        scheduleNext(processChunk);
    }

    processChunk();
}

$(renderCategoryControls);

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
