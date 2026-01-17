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
'8 sinA_findTrigValue sinA findTrigValue'
'8 cosA_findTrigValue cosA findTrigValue'
6080
'2069 angleInTriangle angleInTriangle'
'2069 angleBetweenMedianAndBbiseector angleBetweenMedianAndBbiseector'
'5541 angleInTriangle angleInTriangle'
'5541 angleBetweenHightAndBisector angleBetweenHightAndBisector'
'311680 findAngleC findAngleC'
'311680 findExternalAngleB findExternalAngleB'
'27758 findAngleC findAngleC'
'27758 findAngleCBD findAngleCBD'
'27758 findAngleBDC findAngleBDC'
27623
'27592 ABCareaOfTriangleADF  ABCareaOfTriangleADF'
'27592 ABCareaOfTrapezoidBCDF  ABCareaOfTrapezoidBCDF'
4850
'319157 areaOfTriangle areaOfTriangle'
'319157 areaOfTrapezoid areaOfTrapezoid'
'11 centralAngle centralAngle'
'11 inscribedAngle inscribedAngle'
'125 centralAngle centralAngle'
'125 inscribedAngle inscribedAngle'
177
181
'173 findABC findABC'
'173 findABD findABD'
'173 findCAD findCAD'
'135 degreeMeasureOfArc degreeMeasureOfArc'
'135 angleACO angleACO'
157
185   
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
