#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#или 
#array=("8 < comment> <prefernece...>" "3 < comment> <prefernece...>" 23 11 76)
#относительный путь до скрипта и до обрабатываемой папки
#../fast_set.sh ../../matege2023p/4
find . -mindepth 1 ! -name "$(basename "$0")" -exec rm -rf {} +

array=(
"27505 kMoreZero kMoreZero"
"27505 kLessZero kLessZero"
"500248 derivative_is_positive_symbol derivative_is_positive symbol"
"500248 derivative_is_negative_symbol derivative_is_negative symbol"
562751
"2542 number number"
"317544 derivative_is_smallest_number derivative_is_smallest number"
"317544 derivative_is_largest_number derivative_is_largest number"
"27494 maximum_points_on_the_segment_number maximum_points_on_the_segment number"
"27494 minimum_points_on_the_segment_number minimum_points_on_the_segment number"
"27492 largest_value largest_value"
"27492 smallest_value smallest_value"
"317541 function_is_increasing function_is_increasing"
"317541 function_is_decreasing function_is_decreasing"
"27502 extreme_point_on_the_segment extreme_point_on_the_segment"
)

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

cd "./"
i=1;
for element in "${array[@]}"; do
    type=$(echo "$element" | cut -d ' ' -f1)
    comment=$(echo "$element" | cut -d ' ' -f2 | sed 's/_/ /g')
    descriptions=$(echo "$element" | cut -d ' ' -f3- | sed "s/\([^ ]\+\)/'\1'/g" | tr ' ' ',' | sed 's/,$//')
    
    if [ "$comment" = "$type" ]; then
        comment=""
    else
        comment=" $comment"
    fi
    
    
    mkdir "$i";
    cd "$i";
    ln -s "$1/$type.js" "$type.js";
    ((i++));
    
    touch main.js
    printf "window.nomer=[\n" >> main.js;
    printf "\t%s,\n" "$type" >> main.js
    printf "].iz()\n" >> main.js
    printf "window.comment='%s%s';\n" "$type$comment" >> main.js;
    if [ -z "$comment" ]; then
        descriptions=""
    else
        printf "window.nabor.preferences['%s'] = [%s];\n" "$type" "$descriptions" >> main.js;
    fi

    if [[ "$add_forbidOpenEnds" =~ ^[Yy]$ ]]; then
        printf "chas2.task.setMinimaxFunctionTask.forbidOpenEnds = true;\n" >> main.js;
    fi

    if [[ "$add_forbidDecimalFractions" =~ ^[Yy]$ ]]; then
        printf "chas2.task.setTask.forbidDecimalFractions = true;\n" >> main.js;
    fi

    cd ..;
done
