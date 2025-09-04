#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#или 
#array=("8 < comment> <prefernece...>" "3 < comment> <prefernece...>" 23 11 76)
#относительный путь до скрипта и до обрабатываемой папки
#../fast_set.sh ../../matege2023p/4

array=(
#1
26740
#2 same_base
'77394 same_base same_base'
#2 diff_base
'77394 diff_base diff_base'
#2 pow_base
'77394 pow_base pow_base'
#3 same_base
'5 same_base same_base'
#3 diff_base
'5 diff_base diff_base'
#4
6
#6
8
#7
'2674101 positive_degree positive_degree'
'2674101 negative_degree negative_degree'
#9
4
#11
14
#12
26745
#17
316351
#23
26857
#24
26856
#31 a
'26848 integer integer' 
#31 b
'26848 not_integer not_integer'
#33
2684901
#39
26859
#42
26759
#45 a
'26777 sin_cos sin cos'
#45 b
'26777 cos_sin cos sin'
#45 c
'26777 tg_sin tg sin'
#45 d
'26777 tg_cos tg cos'
#47
316350
#48
508966
#49
245169
#50
282525
#51
245170
#52 a
'245171 sin sin'
#52 ba
'245171 cos cos'
#54 integer double_angle
'11 integer_double_angle integer double_angle'
#55
26755
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
    printf "chas2.task.setMinimaxFunctionTask.forbidOpenEnds = true;\n" >> main.js;
    cd ..;
done
