#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#относительный путь до скрипта и до обрабатываемой папки
#../fast_set.sh ../../matege2023p/4


rm -rf *

array=(
2750501
2750502
50024802
50024801
2748702
2748701
2748902
2800001
2542001
31754401
31754402
31754102
31754101
4013101
4013001
4013002
50118802
50118801
2750202
2750201
2750203
2749401
2749202
2749201
4000001
119979
119974
1942001
1942002
323077
32307801
32307802
3230790101
3230790102
323079001
323079002
323079003
323079004
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
for index in ${!array[*]}
do
     mkdir $i;
     cd $i;
     ln -s $1/${array[$index]}.js ${array[$index]}.js;
     ((i++));

     touch main.js
     printf "window.nomer=[\n" >> main.js;
     printf "\t%s,\n" ${array[$index]} >> main.js
     printf "].iz()\nwindow.comment='"${array[$index]}"';\n" >> main.js;
     printf "chas2.task.setMinimaxFunctionTask.forbidOpenEnds = true;\n" >> main.js;
     cd ..;
done
