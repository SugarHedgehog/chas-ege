#!/usr/bin/env bash
set -euo pipefail

# Скрипт создаёт общий main.js с массивом номеров и кладёт симлинки на задачи в одну папку.
# Использование: ./fast_set_year.sh <путь_к_шаблонам>
# Пример: ./fast_set_year.sh ../../matege2024p/9

script_dir="$(cd "$(dirname "$0")" && pwd)"

# Заполните список задач перед запуском.
array=(
    320181
    320194
    "5 первые_участницы first"
    7
    "5 последня_участница last"
    "320169 девочка girl"
    "320169 мальчик boy"
    9
    '320191 inAuditorium inAuditorium'
    '320191 notInAuditorium notInAuditorium'
    '1 two_tosses two_tosses'
    '1 three_tosses three_tosses'
    "320183 три_матча_ровно three_games equal"
    "320183 три_матча_больше three_games more"
    "320183 три_матча_меньше three_games less"
    "2 два_броска two_times"
    "4 notHaveDefectInQuest_haveDefect notHaveDefectInQuest haveDefect"
    "4 haveDefectInQuest_haveDefect haveDefectInQuest haveDefect"
    "4 notHaveDefectInQuest_notHaveDefect notHaveDefectInQuest notHaveDefect"
    "4 haveDefectInQuest_notHaveDefect haveDefectInQuest notHaveDefect"
)

if [[ $# -lt 1 ]]; then
    echo "Укажите путь к папке с исходными *.js задачами" >&2
    exit 1
fi

source_dir="$1"
if [[ ! -d "$source_dir" ]]; then
    echo "Папка не найдена: $source_dir" >&2
    exit 1
fi

if [[ ${#array[@]} -eq 0 ]]; then
    echo "Заполните массив array в скрипте" >&2
    exit 1
fi

read -r -p "Input window.comment: " user_comment
escaped_comment=${user_comment//\'/\\\'}

read -p "Add 'setMinimaxFunctionTask.forbidOpenEnds' to main files? (y/N): " add_forbidOpenEnds
read -p "Add 'setTask.forbidDecimalFractions' to main files? (y/N): " add_forbidDecimalFractions

# Чистим содержимое текущей папки, оставляя сам скрипт.
find . -maxdepth 1 -mindepth 1 ! -name "$(basename "$0")" -exec rm -rf {} +

preferences=()

for element in "${array[@]}"; do
    type=$(echo "$element" | cut -d ' ' -f1)
    comment=$(echo "$element" | cut -d ' ' -f2 | sed 's/_/ /g')
    descriptions=$(echo "$element" | cut -d ' ' -f3- | sed "s/\\([^ ]\\+\\)/'\\1'/g" | tr ' ' ',' | sed 's/,$//')

    # Симлинки кладём в текущую папку.
    ln -sf "$source_dir/$type.js" "$type.js"

    # Сохраняем предпочтения, если они указаны и комментарий не совпадает с номером.
    if [[ -n "$descriptions" && "$comment" != "$type" ]]; then
        preferences+=("window.nabor.preferences['$type'] = [$descriptions];")
    fi
done

"$script_dir/new_main.sh" "."
cp main.js fipi.js
for target in main.js fipi.js; do
    sed -i "s|window.comment='';|window.comment='$escaped_comment';|" "$target"
done

# Сохраняем метаданные в main.js (для контроля запуска).
{
    printf "\n// fast_set_year.sh metadata\n"
    printf "// array entries:\n"
    for element in "${array[@]}"; do
        printf "// %s\n" "$element"
    done
    printf "// forbidOpenEnds answer: %s\n" "$add_forbidOpenEnds"
    printf "// forbidDecimalFractions answer: %s\n" "$add_forbidDecimalFractions"
} >> main.js

append_flags() {
    local file="$1"
    if [[ "$add_forbidOpenEnds" =~ ^[Yy]$ ]]; then
        printf "chas2.task.setMinimaxFunctionTask.forbidOpenEnds = true;\n" >> "$file"
    fi
    if [[ "$add_forbidDecimalFractions" =~ ^[Yy]$ ]]; then
        printf "chas2.task.setTask.forbidDecimalFractions = true;\n" >> "$file"
    fi
}

append_flags fipi.js

if (( ${#preferences[@]} )); then
    {
        printf "if (!window.nabor)\n\twindow.nabor = {};\n"
        printf "if (!window.nabor.preferences)\n\twindow.nabor.preferences = {};\n"
        for line in "${preferences[@]}"; do
            printf "%s\n" "$line"
        done
    } >> fipi.js
fi
