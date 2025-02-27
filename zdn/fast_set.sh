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
#прямлинейное движение
99606
99607
99591
"5 скорость_из_А_в_В speed_on_way_to_point_A_to_B"
"5 скорость_из_В_в_А speed_on_way_to_point_B_to_A"
"6 скорость_первого first_speed"
"6 скорость_второго second_speed"
26580
99594
323850
99592
99612
11
12
#движение по воде
"9 скорость_первого_теплохода speed_of_first"
27482
"7 суммарное_расстояние total_distance"
"7 скорость_течения river_speed"
"7 скорость_транспорта boat_speed"
"8 скорость_течения river_speed"
"8 собственная_скорость boat_speed"
5997
523375
5999
525375
99602  
26590
#работа
"26592 вопрос_про_первого_работника first_worker" 
"26592 вопрос_про_второго_работника second_worker" 
"26595 вопрос_про_первого_работника first_worker" 
"26595 вопрос_про_второго_работника second_worker" 
"26597 вопрос_про_первый_шланг first_hose" 
"26597 вопрос_про_вторый_шланг second_hose" 
99619 
99614
99617
99615
#сплавы
"99571 концентрация_получившегося_раствора final_concentration"
"99572 концентрация_получившегося_раствора final_concentration"
"1 второй_больше,_масса_третьего_сплава second_largest find_third_mass"
"1 первый_больше,_масса_третьего_сплава first_largest find_third_mass"
99575
"99578 масса_вещеества_в_первом_сосуде mass_of_mixin_in_first"
"99578 масса_вещеества_во_втором_сосуде mass_of_mixin_in_second"
"99578 концентрация_в_первом_сосуде procent_of_mixin_in_first"
"99577 масса_первого_раствора first_mass"
#проценты
"13 на_сколько_подорожали increases"
"13 на_сколько_подешевели decrease"
99567 
99568 
99574 
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
