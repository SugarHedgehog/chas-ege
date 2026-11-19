#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

branch="$(git branch --show-current)"
if [[ -z "$branch" ]]; then
    echo "Ошибка: сначала переключись на ветку."
    exit 1
fi

echo "Коммитим в текущую ветку: $branch"

# Чтобы чужие подготовленные изменения не попали в коммиты.
if ! git diff --cached --quiet; then
    echo "Ошибка: есть staged-изменения."
    echo "Сними их с индекса командой: git reset"
    echo "Сами изменения файлов сохранятся."
    exit 1
fi

# Собираем изменённые, удалённые и новые файлы.
# --others раскрывает новые папки до отдельных файлов.
mapfile -d '' -t files < <(
    git ls-files --modified --others --exclude-standard -z -- zdn/ |
        sort -zu
)

count=0

for file in "${files[@]}"; do
    # Сам скрипт не коммитим.
    [[ "$file" == "zdn/recommit-zdn.sh" ]] && continue

    if git --literal-pathspecs ls-files --error-unmatch -- "$file" \
        >/dev/null 2>&1; then
        kind="fix"
    else
        kind="new"
    fi

    git --literal-pathspecs add -A -- "$file"

    if git diff --cached --quiet; then
        continue
    fi

    git commit -m "[zdn] [$kind] - ${file##*/}"
    count=$((count + 1))
done

echo "Готово. Создано коммитов: $count"
git status --short
