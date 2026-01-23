#!/usr/bin/env bash
set -euo pipefail

# Скрипт создаёт общий main.js с массивом номеров и кладёт симлинки на задачи в одну папку.
# Использование: ./fast_set_year.sh <путь_к_шаблонам>
# Пример: ./fast_set_year.sh ../../matege2024p/9

script_dir="$(cd "$(dirname "$0")" && pwd)"

# Заполните список задач перед запуском.
array=(
26740
'77394 same_base same_base'
'77394 diff_base diff_base'
'77394 pow_base pow_base'
'5 same_base same_base'
'5 diff_base diff_base'
6
8
'2674101 positive_degree positive_degree'
'2674101 negative_degree negative_degree'
4
14
26745
316351
26857
26856
2684901
'26848 integer integer' 
'26848 not_integer not_integer'
26859
26759
'26777 sin_cos sin cos'
'26777 cos_sin cos sin'
'26777 tg_sin tg sin'
'26777 tg_cos tg cos'
316350
508966
245169
282525
245170
'245171 sin sin'
'245171 cos cos'
'11 integer_double_angle integer double_angle'
97869
26755
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
    printf "/* array entries:\n"
    for element in "${array[@]}"; do
        printf "%s\n" "\"$element\""
    done
    printf " */\n"
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
