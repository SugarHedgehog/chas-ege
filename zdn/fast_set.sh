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

    "77438 кубическая_минимум cubic minimum"
    "77438 кубическая_максимум cubic maximum"
    "77438 кубическая_и_квадратичная_минимум cubic_and_quadratic minimum"
    "77438 кубическая_и_квадратичная_максимум cubic_and_quadratic maximum"

    "315835 с_линейной_минимум linear minimum"
    "315835 с_линейной_максимум linear maximum"
    "315835 без_линейной_минимум not_linear minimum"
    "315835 без_линейной_максимум not_linear maximum"

    "77455 степень_минимум pow minimum"
    "77455 степень_максимум pow maximim"
    "77455 корень_минимум sqrt minimum"
    "77455 корень_максимум sqrt maximim"

    "77460 степень_минимум pow minimum"
    "77460 степень_максимум pow maximim"
    "77460 корень_минимум sqrt minimum"
    "77460 корень_максимум sqrt maximim"

    "77490 минимум minimum"
    "77490 максимум maximum"

    "26695 косинус_минимум cos minimum"
    "26695 косинус_максимум cos maximum"
    "26695 синус_минимум sin minimum"
    "26695 синус_максимум sin maximum"

    "26700 косинус_минимум cos minimum"
    "26700 косинус_максимум cos maximum"
    "26700 синус_минимум sin minimum"
    "26700 синус_максимум sin maximum"

    "26702 минимум minimum"
    "26702 максимум maximum"

    "26704 минимум minimum"
    "26704 максимум maximum"
    17
    10
    27
    
    "77486 положительная_степень_минимум positive_pow minimum"
    "77486 положительная_степень_максимум positive_pow maximum"
    "77486 отрицательная_степень_минимум negative_pow minimum" 
    "77486 отрицательная_степень_максимум negative_pow maximum"

    "26717 минимум minimum"
    "26717 максимум maximum"

    "26719 минимум minimum"
    "26719 максимум maximum"

    "315127 минимум minimum"
    "315127 максимум maximum"

    "282859 минимум minimum"
    "282859 максимум maximum"

    "282862 минимум minimum"
    "282862 максимум maximum"

    "26726 минимум minimum"
    "26726 максимум maximum"

    "26713 минимум minimum"
    "26713 максимум maximum"

    "26691 минимум minimum"
    "26691 максимум maximum"

    "26724 минимум minimum"
    "26724 максимум maximum"

    "77480 минимум minimum"
    "77480 максимум maximum"

    "77492 минимум minimum"
    "77492 максимум maximum"

    "77467 x/(x^2+c)_минимум xfrac minimum"
    "77467 x/(x^2+c)_максимум xfrac maximum"
    "77467 (x^2+c)/x_минимум fracx minimum"
    "77467 (x^2+c)/x_максимум fracx maximum"
    
    "77470 x/(x^2+c)_минимум xfrac minimum"
    "77470 x/(x^2+c)_максимум xfrac maximum"
    "77470 (x^2+c)/x_минимум fracx minimum"
    "77470 (x^2+c)/x_максимум fracx maximum"
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
    printf "window.nomer=[\n" > main.js;
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
