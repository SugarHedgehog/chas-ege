#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#относительный путь до скрипта
#../fast_variant.sh

array=(
     135
     4504
     27068
     11
     621772
     5
     4
     5
     27996
     99574
     509192
     77455
)

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
