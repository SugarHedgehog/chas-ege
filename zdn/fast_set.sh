array=(10 3 8 4 2066 5541 6080 2069 1945  73  99  109  105  27589  27793  27758  27764  27762  27623  27592  319157  4850  3353  3354  5941  11  127  131  119  125  169  177  181  173  135  145  149  153  157  161  165  185
)
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

#переходим в общую папку набора
#.././fast_set.sh ../../matege2023p/5
