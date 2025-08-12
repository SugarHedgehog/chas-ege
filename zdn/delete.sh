#!/usr/bin/env bash
set -euo pipefail

DIR="${1:-}"
[[ -d "$DIR" ]] || { echo "Usage: $0 <directory>"; exit 1; }

echo "Broken symlinks in $DIR:"
find "$DIR" -type l ! -exec test -e {} \; -print

echo "Deleting broken symlinks..."
find "$DIR" -type l ! -exec test -e {} \; -delete
