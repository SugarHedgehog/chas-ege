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
#1 Четырёхугольники
6563
11512
2547
2650
506683
"512423 меньшая_диагональ small_diagonal"
"512423 периметр perimeter"
510126
514394
#2 Теорема Пифагора
1845
"6713 высота height"
"6713 диагональ diagonal"
"10777 площадь area"
"10777 высота height"
"10777 угол angle"
"11382 боковая_сторона_через_медиану_и_основание length_BC_by_median_and_base"
"11382 медиан median"
"11382 боковая_сторона_через_медиану_и_площадь length_BC_by_median_and_area"
11856
"509780 площадь area"
"509780 боковая_сторона side"
"509780 угол angle"
"513740 диагональ diagonal"
"513740 периметр perimeter"
4850
6683
6688
"11067 высота height"
"11067 гипотенуза hypotenuse"
"11232 площадь area"
"11232 сторона side"
"11532 площадь area"
"11532 сторона side"
351634
506418
10173
#3 Синус косинус
"10026"
"10136"
"10188"
"10877 BH_by_sin BH_by_sin"
"10877 CH_by_cos CH_by_cos"
"10935"
"11021 tgC tgC"
"11021 sinA sinA"
"11021 cosA cosA"
"11252 tgA tgA"
"11252 sinA sinA"
"11292 AC_by_median AC_by_median"
"11292 AC_by_base AC_by_base"
"11302"
"11632 sin_BAC_by_diagonals sin_BAC_by_diagonals"
"11632 sin_ABD_by_side_diagonalBD sin_ABD_by_side_diagonalBD"
"11632 sin_BAC_by_side_diagonalAC sin_BAC_by_side_diagonalAC"
"11632 tg_BAC_by_side_diagonalAC tg_BAC_by_side_diagonalAC"
"11632 tg_BAC_by_area_diagonalAC tg_BAC_by_area_diagonalAC"
"11736 sin_CAD sin_CAD"
"11736 tg_CAB tg_CAB"
"11740 sin_CAD sin_CAD"
"11740 tg_CAB tg_CAB"
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
"6708"
#4 Биссектриса медиана
"6623"
"311680"
"10036 A_catheter A catheter"
"10036 A_hypotenuse A hypotenuse"
"10036 C_catheter C catheter"
"10036 C_hypotenuse C hypotenuse"
"10116 side side"
"10116 median median"
"11322 side_AB_by_height side_AB_by_height"
"11322 side_AB_by_median side_AB_by_median"
"11322 bisector bisector"
"11452"
"6603"
#5 Подобные треугольники
"11001"
"11082"
"11502 midline midline"
"11502 side side"
"506338"
"511948" 

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
