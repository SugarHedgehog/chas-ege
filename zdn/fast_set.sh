#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#или 
#array=("8 < comment> <prefernece...>" "3 < comment> <prefernece...>" 23 11 76)
#относительный путь до скрипта и до обрабатываемой папки
#../fast_set.sh ../../matege2023p/4
find . -mindepth 1 ! -name "$(basename "$0")" -exec rm -rf {} +

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
27041001
"27059 givenCrossSectionalArea_findSurfaceArea givenCrossSectionalArea findSurfaceArea"
)

if [[ ${#array[@]} -eq 0 ]]; then
    echo "change array in file"
    exit
fi

result=${PWD##*/}
result=${result:-/}
cat $result.js
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
