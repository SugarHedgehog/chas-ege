//РАБОТАЕТ
//32. Задание 4 № 320183
//Перед началом футбольного матча судья бросает монетку, чтобы определить,
//какая из команд начнёт игру с мячом. Команда «Физик» играет три матча
//с разными командами. Найдите вероятность того, что в этих играх
//«Физик» выиграет жребий ровно два раза.

(function () {
    'use strict';
    NAinfo.requireApiVersion(0, 0);
    let key = "320183";

    const sport = ['футбольного', 'волейбольного', 'баскетбольного', 'хоккейного', 'теннисного', 'бейсбольного'].iz();
    const team_name = ['Физик', 'Химик', 'Сапфир', 'Труд', 'Геолог', 'Биолог', 'Квант', 'Изумруд', 'Рубин', 'Факел'].iz();
    const vopr = ['начнёт игру с мячом', 'выиграет жребий'].iz();
    
    let kolvo_rush = sl(0, 3) + 2; // число сыгранных игр   0-2 игры 1-3 игры 2-4 игры 3-5 игр
    kolvo_rush = getListedPreference(key, [{
        preference: 'two_games',
        preferenceValue: 2,
    }, {
        preference: 'three_games',
        preferenceValue: 3,
    }, {
        preference: 'four_games',
        preferenceValue: 4,
    }, {
        preference: 'five_games',
        preferenceValue: 5,
    }
    ], kolvo_rush);

    const games = ['два матча', 'три матча', 'четыре матча', 'пять матчей'][kolvo_rush - 2];
    let first_times = sl(1, kolvo_rush); // число выигранных жребиев

    first_times = getListedPreference(key, [{
        preference: 'equal',
        preferenceValue: first_times,
    }, {
        preference: 'more',
        preferenceValue: sl(1, kolvo_rush-1),
    }], first_times);

    let rovno_ili_bol = 
    getListedPreference(key, [{
        preference: 'equal',
        preferenceValue: 0,
    }, {
        preference: 'more',
        preferenceValue: 1,
    }], (kolvo_rush === first_times) ? 0: sl1()); // ровно %количество побед% = 0, больше = 1

    const kolvoOptions = [
        ['ровно один раз', 'ровно два раза', 'ровно три раза', 'ровно четыре раза', 'ровно пять раз'],
        ['более одного раза', 'более двух раз', 'более трёх раз', 'более четырёх раз', 'более пяти раз']
    ];

    const probabilityMatrix = {
        2: [[0.5, 0.25], [0.25, 0]],
        3: [[0.375, 0.375, 0.125], [0.5, 0.125, 0]],
        4: [[0.25, 0.375, 0.25, 0.0625], [0.6875, 0.3125, 0.0625, 0]],
        5: [[0.15625, 0.3125, 0.3125, 0.15625, 0.03125], [0.8125, 0.5, 0.1875, 0.03125, 0]]
    };

    const kolvo = kolvoOptions[rovno_ili_bol][first_times - 1];
    const answers = probabilityMatrix[kolvo_rush][rovno_ili_bol][first_times - 1];

    NAtask.setTask({
        text: `Перед началом ${sport} матча судья бросает монетку, чтобы определить, какая из команд начнёт игру с мячом. Команда «${team_name}» играет ${games} с разными командами. Найдите вероятность того, что в этих играх «${team_name}» ${vopr} ${kolvo}.`,
        answers
    });
})();
