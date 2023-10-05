#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#относительный путь до скрипта и до обрабатываемой папки
#../fast_set.sh ../../matege2023p/4

array=(26740 77394 5 6 7 8 9 510021 4 10 14 26745 26748 2 3 2674501 316351 26750 26847 15 26862 26846 26857 26856 26845 26844 26892 26861 26854 26882 26848 26849 2684901 26851 26852 26853 26855 26858 26859 26896 26758 26759 77414 7741402 26777 7741401 316350 508966 245169 282525 245170 245171 1 11 26755 12 26769 26774 503310 2677401)

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
