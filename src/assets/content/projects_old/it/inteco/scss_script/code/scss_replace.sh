#!/bin/bash

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

pattern='#{\$[a-zA-Z]+\s*\/\s*[1-9]}'
pattern2='#\{[0-9]+%\s*\/\s*\$[a-zA-Z]+\}'
pattern3='\(\$[a-zA-Z]+\/[0-9]+\*[0-9]+\s*-\s*\$[a-zA-Z]+\)'
pattern4='\s\(\$[a-zA-Z]+\s*\/\s*[0-9]+\)'
pattern5='\s\(\(.+\)\s*\/\s*[0-9]+\)'
pattern6='\s\(\$[a-zA-Z]+\s*\/\s*(\$[a-zA-Z]+|[0-9]+)\*'
pattern7='[a-z]+-[a-z]+\.[0-9]{2}s'
pattern8=':\s([0-9]+\%|\$[a-zA-Z]+)\s?\/\s?([0-9]+\%|\$[a-zA-Z]+)\s\*'

replace "$pattern" '{' '}' '{calc(' ')}'
replace "$pattern2" '{' '}' '{calc(' ')}'
replace "$pattern3" '(' ' -' '(calc(' ') -'
replace "$pattern4" ' (' ')' ' calc(' ')'
replace "$pattern5" ' ((' ')' ' calc(' ')'
replace "$pattern6" ' (' '*' ' (calc(' ')*'
replace "$pattern8" ': ' ' *' ': calc(' ') *'

replaceString 'toNumber(quote($size))' 'toNumber(quote(#{$size}))'
replaceString 'toNumber(quote($lineSize))' 'toNumber(quote(#{$lineSize}))'
replaceString '%ar-main:before' '%ar-main-before'
replaceString '%ar-main-t:before' '%ar-main-t-before'
replaceString '%ar-main-m:before' '%ar-main-m-before'
