#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#или 
#array=("8 < comment> <prefernece...>" "3 < comment> <prefernece...>" 23 11 76)
#относительный путь до скрипта и до обрабатываемой папки
#../fast_set.sh ../../matege2023p/4
find . -mindepth 1 ! -name "$(basename "$0")" -exec rm -rf {} +


rm -rf *

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
