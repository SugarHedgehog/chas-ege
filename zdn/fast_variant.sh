#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#относительный путь до скрипта
#../fast_variant.sh

array=(145
2774101
27072
1
621772
26668
26777
2750202
27969
7
509197
26726)

if [[ ${#array[@]} -eq 0 ]]; then
     echo "change array in file"
     exit
fi

cd "./"
i=1;
for index in ${!array[*]}
do
     cd $i;
     ((i++));

     touch fipi.js
     printf "window.availableTaskNumbers = [\n" > fipi.js;
     printf "\t%s,\n" ${array[$index]} >> fipi.js
     printf "];\nwindow.nomer = window.availableTaskNumbers.iz();\nwindow.comment='"${array[$index]}"';\n" >> fipi.js;
     cd ..;
done
