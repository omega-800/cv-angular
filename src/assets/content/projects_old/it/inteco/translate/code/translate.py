import re, getopt, sys, shutil
from googletrans import Translator

"""
python script which translates a given file (eg messages_de.properties) into a copy of that file (eg messages_en.properties)
for each line of the given file it matches the regex (everything after = and before \n), translates it and writes to newly createds file
args: -f (file) -i (input language) -o (output language) -a (write all changes without asking)
if without -a: asks every time to either accept change, skip or manually edit translation

python3 translate.py -f dialogs_de.properties -i de -o fr -a 
creates file dialogs_fr.properties and writes all changes without confirmation
"""

# console output colors
BLUE = '\033[94m'
CYAN = '\033[96m'
GREEN = '\033[92m'
ENDC = '\033[0m'

# regex pattern for finding entries to translate
regex = re.compile('= .+\n')

# google translator
translator = Translator()

# default variables
file='urimapping/uri_de.properties'
origin_lang='de'
dest_lang='fr'
translate_all=True

# method for translating file
def translate(file, origin_lang, dest_lang):
    # create a copy of the file, renamed to destination language (messages_de.properties > messages_en.properties)
    translated_file = file.replace(origin_lang+".", dest_lang+".")
    shutil.copy(file, translated_file)
    filedata=''

    # assign contents of file as a string to variable
    with open(file, encoding="windows-1252") as f:
        filedata = f.read()

    with open(file, encoding="windows-1252") as f:
        # for each line get matching string
        for line in f:
            result = regex.search(line)

            # if part of the line matches
            if result: 
                # remove leading character =
                text = result.group().replace("= ",'')
                # escape characters $ and ; (if not, exception arises when translating)
                escaped = text.translate(str.maketrans({"$":  r"\$", ";":  r"\;"}))
                # translate
                translated_escaped = translator.translate(escaped,src=origin_lang,dest=dest_lang).text.capitalize()+"\n"
                # remove escaped characters
                translated = translated_escaped.replace("\$",'$').replace("\;",';')

                # output translation
                print(BLUE+"ORIGINAL:      "+text+ENDC)
                print(GREEN+"TRANSLATED:    "+translated+ENDC)

                # if -a was given as args then skip confirmation
                if translate_all:
                    # replace matched string inside the text with translated string
                    filedata = filedata.replace(text,translated)
                else:
                    # get input if it should be translated, skipped, or manually edited
                    option = input("t=translate s=skip e=edit > ")
                    if option == 't':
                        # replace matched string inside the text with translated string
                        filedata = filedata.replace(text,translated)
                    elif option == 's':
                        print("skipped")
                    elif option =='e':
                        # replace matched string inside the text with string given through cli
                        translated = input("your translation > ")+"\n"
                        filedata = filedata.replace(text,translated)
                
                # write changes to new file
                with open(translated_file, 'w', encoding="utf-8") as f:    
                    f.write(filedata)

# get args from command line 
# available are: 
# -f (file)
# -i (input language)
# -o (output language)
# -a (write all changes without asking)
# eg -f messages_de.properties -i de -o en

opts, args = getopt.getopt(sys.argv[1:],"f:i:o:a")
for opt, arg in opts:
    if opt == '-f':
        file = arg
    elif opt == '-i':
        origin_lang = arg
    elif opt == '-o':
        dest_lang = arg
    elif opt == '-a':
        translate_all=True

translate(file, origin_lang, dest_lang)
               
