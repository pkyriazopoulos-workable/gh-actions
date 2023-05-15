#!/bin/bash

# Get the string and separator from command line arguments
string="$1"
separator="$2"
variable_name="$3"

# Split the string on given separator and save the results to an array
IFS="$separator" read -r -a array <<< "$string"

# Trim each string in the array
for i in "${!array[@]}"
do
    array[$i]=\"$(echo "${array[$i]}" | tr -d '[:space:]')\"
done

# Join the array into a string
result="[$(IFS=, ; echo "${array[*]}")]"

# Communicate the result to the next step
echo "$variable_name=$result" >> $GITHUB_OUTPUT
