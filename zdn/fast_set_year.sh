#!/usr/bin/env bash
set -euo pipefail

# Скрипт создаёт общий main.js с массивом номеров и кладёт симлинки на задачи в одну папку.
# Использование: ./fast_set_year.sh <путь_к_шаблонам>
# Пример: ./fast_set_year.sh ../../matege2024p/9

script_dir="$(cd "$(dirname "$0")" && pwd)"

# Заполните список задач перед запуском.
array=(
"27068 sideSurfaceArea_truncatedPrism sideSurfaceArea truncatedPrism"
"27068 sideSurfaceArea_originalPrism sideSurfaceArea originalPrism"
"27068 volume_truncatedPrism volume truncatedPrism"
"27068 volume_originalPrism volume originalPrism"
"27094 heightRadiusOfBaseAndVolume heightRadiusOfBaseAndVolume"
'318145 missingLiquid missingLiquid'
'318145 liquidInFullCone liquidInFullCone'
"27118 cylinderIsWider cylinderIsWider"
"27118 cylinderIsHigher cylinderIsHigher"
"245335 horizontalCrossSectionVolume horizontalCrossSectionVolume"
"245335 verticalCrossSectionVolume verticalCrossSectionVolume"
"27183 volumeOfCube volumeOfCube"
"27183 volumeOfPrism volumeOfPrism"
245338
27074
"245340 volumeOfPyramid volumeOfPyramid"
"245341 volumeOfPyramid volumeOfPyramid"
"27051 volume_findValueInCone volume findValueInCone"
"27051 volume_findValueInCylinder volume findValueInCylinder"
"27051 sideSurfaceArea_findValueInCone sideSurfaceArea findValueInCone"
"27051 sideSurfaceArea_findValueInCylinder sideSurfaceArea findValueInCylinder"
"5077 questionCylinder_surfaceAreaCylinder_surfaceAreaSphere questionCylinder surfaceAreaCylinder surfaceAreaSphere"
"5077 questionSphere_surfaceAreaCylinder_surfaceAreaSphere questionSphere surfaceAreaCylinder surfaceAreaSphere"
"5077 questionCylinder_volumeCylinder_volumeSphere questionCylinder volumeCylinder volumeSphere"
"5077 questionSphere_volumeCylinder_volumeSphere questionSphere volumeCylinder volumeSphere"
"245351 questionSphere_generatrixCone_radiusSphere questionSphere generatrixCone radiusSphere"
"245351 questionCone_generatrixCone_radiusSphere questionCone generatrixCone radiusSphere"
"245351 questionSphere_volumeCone_volumeSphere questionSphere volumeCone volumeSphere"
"245351 questionCone_volumeCone_volumeSphere questionCone volumeCone volumeSphere"
27041
"27059 givenCrossSectionalArea_findSurfaceArea givenCrossSectionalArea findSurfaceArea"
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
