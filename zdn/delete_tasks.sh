#переходим в общую папку набора
#заполняем переменную array названиями шаблонов
#array=(8 3 23 11 76)
#относительный путь до скрипта
#../delete_tasks.sh

array=(
     177
     64485008
     27051
     9
     320196
     11
     6
     40130
     28003
     12
     509001
     282859)

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
