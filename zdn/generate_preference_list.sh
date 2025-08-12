#!/bin/bash

OUTPUT_FILE="result.txt"
> "$OUTPUT_FILE"

process_elements() {
    local filename=$1
    local elements_list=("${@:2}")
    local result=()
    
    if [ ${#elements_list[@]} -eq 2 ]; then
        IFS=',' read -ra arr1 <<< "${elements_list[0]}"
        IFS=',' read -ra arr2 <<< "${elements_list[1]}"
        for i in "${arr1[@]}"; do
            for j in "${arr2[@]}"; do
                result+=("$filename $i $j")
            done
        done
    else
        for elements in "${elements_list[@]}"; do
            IFS=',' read -ra arr <<< "$elements"
            for element in "${arr[@]}"; do
                result+=("$filename $element")
            done
        done
    fi
    
    printf '%s\n' "${result[@]}"
}

for file in *; do
    [[ "$file" == "${0##*/}" ]] && continue
    [[ ! -f "$file" ]] && continue

    filename=$(basename "$file" | cut -d. -f1)
    elements_list=()
    
    # JS syntax processing
    js_arrays=$(grep -Eo 'preference[a-zA-Z0-9_]*[[:space:]]*=[[:space:]]*\[[^]]*\]' "$file")
    if [ -n "$js_arrays" ]; then
        while read -r array; do
            elements=$(echo "$array" | 
                      sed -E 's/.*\[//;
s/\].*//;
s/'\''/"/g;
s/,/","/g;
s/^[[:space:]]*//;
s/[[:space:]]*$//')
            elements_list+=("$elements")
        done <<< "$js_arrays"
    fi

    # Bash syntax processing
    if grep -q -E 'preference[a-zA-Z0-9_]*=\([^)]*\)' "$file"; then
        (source "$file" &>/dev/null
         compgen -v | grep 'preference' | while read -r var; do
             elements=$(declare -p "$var" 2>/dev/null | 
                       sed -n "s/^declare -a ${var}='(\(.*\))/\1/p" |
                       tr -s ' ' ',' |
                       sed "s/^'//;s/'$//")
             elements_list+=("$elements")
         done)
    fi

    if [ ${#elements_list[@]} -gt 0 ]; then
        process_elements "$filename" "${elements_list[@]}" | 
            sed 's/"//g; s/^[[:space:]]*\|[[:space:]]*$//g; s/^/"/; s/$/"/' >> "$OUTPUT_FILE"
    else
        echo "\"$filename\"" >> "$OUTPUT_FILE"
    fi
done

echo "Processing complete. Results saved to $OUTPUT_FILE"
