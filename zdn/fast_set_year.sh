#!/usr/bin/env bash
set -euo pipefail

# Скрипт создаёт общий main.js с массивом номеров и кладёт симлинки на задачи в одну папку.
# Использование: ./fast_set_year.sh <путь_к_шаблонам>
# Пример: ./fast_set_year.sh ../../matege2024p/9

script_dir="$(cd "$(dirname "$0")" && pwd)"

# Заполните список задач перед запуском.
array=(
    "77427 с_линейной_максимум linear maximum"
    "77427 с_линейной_минимум linear minimum"
    "77455 степень_максимум pow maximum"
    "77455 степень_минимум pow minimum"
    "77455 корень_максимум sqrt maximum"
    "77455 корень_минимум sqrt minimum"
    "77460 корень_максимум sqrt maximum"
    "77460 корень_минимум sqrt minimum"
    "77490 максимум maximum"
    "77490 минимум minimum"
    "26695 синус_максимум sin maximum"
    "26695 синус_минимум sin minimum"
    "26695 косинус_максимум cos maximum"
    "26695 косинус_минимум cos minimum"
    "26700 синус_максимум sin maximum"
    "26700 косинус_минимум cos minimum"
    27
    "26717 максимум_неединичная_степень not_trivial maximum"
    "26717 минимум_неединичная_степень not_trivial minimum"
    "26717 максимум_единичная_степень trivial maximum"
    "26717 минимум_единичная_степень trivial minimum"
    "77486 положительная_чётная_степень_максимум positive_pow maximum even_power"
    "77486 положительная_чётная_степень_минимум positive_pow minimum even_power"
    "77486 положительная_нечётная_степень_максимум positive_pow maximum odd_power"
    "77486 положительная_нечётная_степень_минимум positive_pow minimum odd_power"
    "26719 максимум maximum"
    "26719 минимум minimum"
    "26713 положительная_степень_максимум positive_pow maximum"
    "26713 отрицательная_степень_минимум negative_pow minimum"
    "26726 отрицательная_степень_максимум negative_pow maximum"
    "77467 x/(x^2+c)_максимум xfrac maximum"
    "77467 x/(x^2+c)_минимум xfrac minimum"
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
    printf "\n// fast.sh metadata\n"
    printf "// array entries:\n"
    for element in "${array[@]}"; do
        printf "// - %s\n" "$element"
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
