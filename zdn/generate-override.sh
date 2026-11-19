#!/usr/bin/env bash
set -euo pipefail

# Скрипт генерирует файл nabor-override.js на основе списка номеров.
# Пример использования:
#   ./generate-override.sh 319157 27741 12345
#   ./generate-override.sh   # затем ввести номера интерактивно

# 1) Список номеров (через пробел): из аргументов или интерактивно
if [ "$#" -gt 0 ]; then
  nums=("$@")
else
  read -r -p "Введите список номеров (через пробел): " line
  # shellcheck disable=SC2206
  nums=($line)
fi

# 2) Номер варианта (по умолчанию 1)
read -r -p "Номер варианта [1]: " variant
variant="${variant:-1}"

# 3) Количество вариантов (по умолчанию 3)
read -r -p "Количество вариантов [3]: " count
count="${count:-3}"

out_path="nabor/nabor-override-${variant}.js"
mkdir -p "$(dirname "$out_path")"

# 4) Генерация файла
{
  cat <<'JS'
console.log('Overriding...');
// Здесь можно писать комментарии. Собственно, вот так!

JS

  # Это у нас так номер варианта пишется!
  printf "\n// Это у нас так номер варианта пишется!\n"
  printf "\$('#variantPrefix').val('%s.');\n" "$variant"

  # Количество вариантов
  printf "\n// Количество вариантов\n"
  printf "\$('#cV').val('%s');\n" "$count"

  # Для каждого варианта создаём блок с назначением window.nomer
  for ((i=1; i<=${#nums[@]} ; i++)); do
    num="${nums[$((i-1))]:-0}"
    printf "window.nabor.upak[%d].main = function(){\n\twindow.nomer = %s;\n}\n\n" "$i" "$num"
  done
} > "$out_path"

echo "Готово: $out_path"
