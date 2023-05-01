#!/bin/bash

Red=$(tput setaf 2)
Green=$(tput setaf 3)
Blue=$(tput setaf 5)
None=$(tput setaf 7)

file=$1
from=$2
to=$3
regexline='^([a-zA-Z]+\.?)+\s+=\s{1}.+$'

# grep -REv $regexline $file
# echo '---------------------------------------------------------'

grep -RE $regexline $file | while IFS="" read -r line
do
	word="$(grep -oE '=\s([a-zA-Z]+\s?)+$')"
	# echo "$word"
	# translated="$(trans de:en "$word")"
	trans de:en "$word" | grep -oE '\n\s{4}(((?!,).)+,?)+'
	# setting="$(grep -oE '^([a-zA-Z]*\.?)*')"
	# echo "${Blue}${setting}${None}${word}"
done

replace(){
	files=$(grep -lRE $1 . )
	for f in $files
	do
		echo $f
		grep --include={*.scss,*.css} -RE $1 $f | while read -r line ; do
			old="${line##*$2}"
			old="${old%%$3*}"
			edited="${4}${old}${5}"
			old="${2}${old}${3}"

			output "$line" "$old" "$edited"
			echo 'Do you want to edit this? ' 
			read -r -n 1 answer </dev/tty
                        if [[ $answer =~ ^[Yy]$ ]]
                        then
                                sed -i "s|$old|$edited|g" "$f"
                        fi
		done
	done
}

replaceString(){
        files=$(grep -lR $1 . )
        for f in $files
        do
                echo $f
                grep --include={*.scss,*.css} -R $1 $f | while read -r line ; do	
			output "$line" "$1" "$2"
			echo 'Do you want to edit this? ' 
			read -r -n 1 answer </dev/tty
			if [[ $answer =~ ^[Yy]$ ]]
			then
				sed -i "s|$1|$2|g" "$f"
			fi
		done
        done
}

output(){
	Red=$(tput setaf 2)
        Green=$(tput setaf 3)
	Blue=$(tput setaf 5)
	None=$(tput setaf 7)

        echo "${Blue}${1}${None}"
        echo "${Red}${2@Q}${None} > ${Green}${3@Q}${None}"
}

# pattern='#{\$[a-zA-Z]+\s*\/\s*[1-9]}'
# replace "$pattern" '{' '}' '{calc(' ')}'
# replaceString 'toNumber(quote($lineSize))' 'toNumber(quote(#{$lineSize}))'
