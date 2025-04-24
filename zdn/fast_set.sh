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
"169853 A A"
"169853 B B"
"169853 C C"
"311680"
"340384"
"348415 hypotenuse hypotenuse"
"348415 area area"
"348415 catheter catheter"
"348593"
"348610 A A"
"348610 B B"
"348610 C C"
"348758"
"348795 find_median find_median"
"348795 find_bisector find_bisector"
"348795 find_height find_height"
"348795 find_side_from_median find_side_from_median"
"348795 find_side_from_bisector find_side_from_bisector"
"348795 find_side_from_height find_side_from_height"
"348885"
"349100 A A"
"349100 B B"
"349100 C C"
"349580 AB AB"
"349580 BC BC"
"349580 CA CA"
"356079 sinA sinA"
"356079 cosA cosA"
"356079 tgA tgA"
"356079 ctgA ctgA"
"356079 sinC sinC"
"356079 cosC cosC"
"356079 tgC tgC"
"356079 ctgC ctgC"
"356109 side_from_sinA side_from_sinA"
"356109 side_from_cosA side_from_cosA"
"356109 side_from_tgA side_from_tgA"
"356109 side_from_ctgA side_from_ctgA"
"356109 side_from_sinC side_from_sinC"
"356109 side_from_cosC side_from_cosC"
"356109 side_from_tgC side_from_tgC"
"356109 side_from_ctgC side_from_ctgC"
"356159 B B"
"356159 A A"
"356159 C C"
"356180 A_left A left"
"356180 A_right A right"
"356180 B_left B left"
"356180 B_right B right"
"356180 C_left C left"
"356180 C_right C right"
"356190"
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
