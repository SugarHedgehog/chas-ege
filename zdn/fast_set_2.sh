#!/bin/bash

# переходим в общую папку набора
# формат: "папка:тип" или "папка:тип комментарий" или "папка:тип комментарий preference1 preference2"

array=(
    "1:27623"
    "1:4850"
    "1:11 centralAngle centralAngle"
    "1:157"
    
    "2:4504"
    "2:660709"
    
    "3:27068 sideSurfaceArea_truncatedPrism sideSurfaceArea truncatedPrism"
    "3:318145 liquidInFullCone liquidInFullCone"
    "3:245351 questionSphere_generatrixCone_radiusSphere questionSphere generatrixCone radiusSphere"
    "3:245351 questionCone_volumeCone_volumeSphere questionCone volumeCone volumeSphere"
    
    "4:320194"
    "4:5 последня_участница last"
    "4:9"
    "4:320191 inAuditorium inAuditorium"
    
    "5:2"
    "5:630095 three three"
    "5:508830"
    "5:320211"
    
    "6:282849"
    "6:26671"
    "6:3"
    "6:2"
    
    "7:26857"
    "7:26777 sin_cos sin cos"
    "7:316350"
    "7:245171 sin sin"
    
    "8:27505 kLessZero kLessZero"
    "8:562751"
    "8:27494 maximum_points_on_the_segment_number maximum_points_on_the_segment number"
    "8:317541 function_is_increasing function_is_increasing"
    
    "9:27980"
    "9:27975"
    "9:7"
    "9:12"
    
    "10:26589 boat_speed boat_speed"
    "10:26597 first_hose"
    "10:99615"
    "10:512333 second_largest_find_third_mass second_largest find_third_mass"
    
    "11:508911 dontShow dontShow"
    "11:508971 functionOfX_withoutA functionOfX withoutA"
    "11:509271 findAbscissa_withoutB_withoutC findAbscissa withoutB withoutC"
    "11:509095 functionOfX_withoutB functionOfX withoutB"
    
    "12:77455 корень_максимум sqrt maximum"
    "12:27"
    "12:77486 положительная_чётная_степень_минимум positive_pow minimum even_power"
    "12:26713 положительная_степень_максимум positive_pow maximum"
)

# очищаем текущую папку
find . -mindepth 1 ! -name "$(basename "$0")" -exec rm -rf {} +

if [[ ${#array[@]} -eq 0 ]]; then
     echo "change array in file"
     exit
fi

result=${PWD##*/}
result=${result:-/}
touch $result.js
printf "if (!window.nabor)\n\twindow.nabor = {};\nwindow.nabor.importFrom({\n\tnZad: "${#array[@]}",\n \tadres: '../zdn/"$result"/',\n" >> $result.js
printf "\tname: '"$result"',\n});\n" >> $result.js

read -p "Add 'setMinimaxFunctionTask.forbidOpenEnds' to all main.js files? (y/N): " add_forbidOpenEnds
read -p "Add 'setTask.forbidDecimalFractions' to all main.js files? (y/N): " add_forbidDecimalFractions

{
    printf "\n// fast_set metadata\n" >> "$result.js"
    printf "// array entries:\n" >> "$result.js"
    for element in "${array[@]}"; do
        printf "// - %s\n" "$element" >> "$result.js"
    done
    printf "// forbidOpenEnds answer: %s\n" "$add_forbidOpenEnds" >> "$result.js"
    printf "// forbidDecimalFractions answer: %s\n" "$add_forbidDecimalFractions" >> "$result.js"
}

cd "./"
counter=1
for element in "${array[@]}"; do
    # Парсим формат "папка:тип коммент предпочтения"
    folder_num=$(echo "$element" | cut -d ':' -f1)
    rest=$(echo "$element" | cut -d ':' -f2-)
    
    type=$(echo "$rest" | cut -d ' ' -f1)
    comment=$(echo "$rest" | cut -d ' ' -f2 | sed 's/_/ /g')
    descriptions=$(echo "$rest" | cut -d ' ' -f3- | sed "s/\([^ ]\+\)/'\1'/g" | tr ' ' ',' | sed 's/,$//')
    
    if [ "$comment" = "$type" ]; then
        comment=""
    else
        comment=" $comment"
    fi
    
    mkdir "$counter"
    cd "$counter"
    
    # Берём из указанной папки
    source_path="$1/$folder_num/$type.js"
    if [ -f "$source_path" ]; then
        ln -s "$source_path" "$type.js"
    else
        echo "Warning: $source_path not found"
    fi
    
    touch main.js
    printf "window.nomer=[\n" >> main.js
    printf "\t%s,\n" "$type" >> main.js
    printf "].iz()\n" >> main.js
    printf "window.comment='%s%s';\n" "$type$comment" >> main.js
    if [ -n "$comment" ] && [ -n "$descriptions" ]; then
        printf "window.nabor.preferences['%s'] = [%s];\n" "$type" "$descriptions" >> main.js
    fi

    if [[ "$add_forbidOpenEnds" =~ ^[Yy]$ ]]; then
        printf "chas2.task.setMinimaxFunctionTask.forbidOpenEnds = true;\n" >> main.js
    fi

    if [[ "$add_forbidDecimalFractions" =~ ^[Yy]$ ]]; then
        printf "chas2.task.setTask.forbidDecimalFractions = true;\n" >> main.js
    fi

    cd ..
    ((counter++))
done

echo "Done! Created ${#array[@]} tasks from folders 1-12"
