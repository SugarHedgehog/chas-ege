#!/bin/bash

echo "Начинаю коммитить файлы по одному..."

# Коммитим все неотслеживаемые .js файлы
for file in $(git ls-files --others --exclude-standard | grep '\.js$'); do
    echo "Коммит: $file"
    git add "$file"
    git commit -m "[zdn] [new] - $(basename "$file")"
done

echo "Все .js файлы закоммичены!"
