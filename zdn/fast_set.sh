#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#относительный путь до скрипта и до обрабатываемой папки
#../fast_set.sh ../../matege2023p/4


rm -rf *

array=(
    "77427 с_линейной_минимум linear minimum"
    "77427 с_линейной_максимум linear maximum"
    "77427 без_линейной_минимум not_linear minimum"
    "77427 без_линейной_максимум not_linear maximum"
    77438
    315835
    #77455
    #77455
    #77460
    #77460
    #77490
    #26695
    #26700
    #26702
    #26704
    #17
    #10
    #27
    #77486
    #26717
    #26717
    #26719
    #315127
    #282859
    #282859
    #282862
    #26726
    #26726
    #26713
    #26691
    #26724
    #77480
    #77492
    #77467
    #77467
    #77467
    #77467
    #77470
    #77470
    #77470
    #77470
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
