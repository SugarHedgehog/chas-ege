#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#относительный путь до скрипта
#../delete_tasks.sh

array=(
     27592
     64485006
     3011
     10
     320211
     3
     26759
     40130
     1
     113443
     509121
     77490)

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
     #sed -i "s/${array[$index]}/\/\/ ${array[$index]}/" fipi.js
     sed -i "/${array[$index]}/d" fipi.js
     cd ..;
done
