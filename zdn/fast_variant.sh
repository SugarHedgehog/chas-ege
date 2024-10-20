#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#относительный путь до скрипта
#../fast_variant.sh

array=(105
644849
4883
320194
320188
8
7741401
2800001
27957
99574
509060
77480)

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
