#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#относительный путь до скрипта и до обрабатываемой папки
#../fast_set.sh ../../matege2023p/4

array=(
27965
27964
27979
27980
2798200002
2798200001
2798400001
2798400002
7
12
27990
525114
27996
27995
28012
27963
317096
317097
324467
27973
27975
27981
1
9
11
28009
5
27960
27962
27957
8
28003
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
     cd ..;
done
