const { generateRequestUrl, normaliseResponse } = require('google-translate-api-browser');
const https = require('https');
var replace = require("replace");
var promptSync = require("prompt-sync")({sigint: true});
var fs = require('fs');

// color constants for log output
const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const blue = "\x1b[34m";
const yellow = "\x1b[33m";

// regular expression to find values with
const regex_ws : RegExp = /\n(?!([^\n]|\n#))/gmu;
const regex_name : RegExp = /^([a-zA-Z\-0-9]\.?)+/gmu;
const regex_value : RegExp = /=[^\S\r\n].+$/gmu;
const regex : RegExp = /^([a-zA-Z\-0-9]\.?)+\s+=[^\S\r\n].+$/gmu;

// define variables
let filename : string = '';
let lang_from : string = '';
let lang_to : string = '';
let skip_check : string = '';
let newfile : string = '';

// store values
let fromValuePairs = new Map<string, string>();
let toValuePairs = new Map<string, string>();
let nrOfOgValues : number = 0;
let nrOfTranslatedValues : number = 0;
let nrOfValuesToTranslate : number = 0;

/**
 * Escapes regex characters in string with \
 * @param {string} str Input string
 * @returns {string} Escaped string
 */
function escapeRegex(str : string) : string {
    return String(str).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&')
}
/**
 * Prompts for and returns user input
 * @param {string} s Prompt to be shown
 * @returns {string} User input
 */
function promptS(s : string) : string {
    return promptSync(yellow+s+reset);
}
/**
 * Logs s in red
 * @param {string} s String to be logged
 */
function logI(s : string) {
    console.log(red+s+reset)
}

function getValuePairs(file1 : string, file2 : string) {

}

/**
 * Find all matches inside of a file and return them as string array
 * @param {string} filename File to search through
 * @param {string} regex Regular Expression
 * @returns {(string|Array)} Array of matches
 */
function findMatches(filename : string, regex : RegExp) : string[] {
    let matches : string[] = [];
    fs.readFileSync(filename, 'utf-8').match(regex).forEach((match: string)=> {
        matches.push(match);
    });
    return matches;
}
/**
 * Checks if any string from array is a substring of value
 * @param {(string|Array)} array Of values to comnpare with
 * @param {string} value To compare
 * @returns {boolean} Result 
 */
function isInString(array : string[], value : string) : boolean {
    let result = false;
    array.forEach((name : string) => {
        if(new RegExp(escapeRegex(name)+"\\s").test(value)){
            result = true;
        }
    });
    return result;
}
/**
 * Finds differences regarding the names between two files and prompts to write changes
 * @param string1 
 * @param string2 
 */
function findDifferences(file1 : string, file2 : string){
    let matches1 : string[] = findMatches(file1, regex);
    let names1 : string[] = findMatches(file1, regex_name);
    let matches2 : string[] = findMatches(file2, regex);
    let names2 : string[] = findMatches(file2, regex_name);

    let filtered1 : string[] = names1.filter(val => !names2.includes(val));
    let filtered2 : string[] = names2.filter(val => !names1.includes(val));

    let filtered_values1 : string[] = matches1.filter(val => {
        return isInString(filtered1, val);
    });
    
    let filtered_values2 : string[] = matches2.filter((val) => {
        return isInString(filtered2, val);
    });

    if(filtered1.length > 0) { 
        logI(`New values will be added to "${file2}" > ${filtered1.join(", ")}`); 
        filtered_values1.forEach(line => { 
            fs.writeFile(file2, "\n"+line, { flag: "a+"}, (err : any) => { if (err) throw err}); 
        });
    }
    if(filtered2.length > 0) {
        logI(`Values that are only in "${file2}" > ${filtered2.join(", ")}`); 
        ((res : string = promptS(`Add these values to "${file1}"? [y,n] > `)) =>
            res === "y" ? 
                filtered_values2.forEach(line => { fs.appendFile(file1, "\n"+line, (err : any) => { if (err) throw err}); }) 
                : res === "n" ? 
                    logI(`"${file1}" will stay unedited`)
                    : logI(`No valid option specified, "${file1}" will stay unedited`)
        )();
    }
}
/**
 * Replaces text in a given file
 * @param {string} from 
 * @param {string} to 
 * @param {string} file 
 */
function replaceText(name : string, from : string, to : string, file : string) {
    let full_from = name+from;
    let full_to = name+to;
    let t : string = (full_to.endsWith('\n') ? full_to : full_to+'\n');
    replace({
        regex: escapeRegex(full_from),
        replacement: t,
        paths: [file],
        recursive: true,
        silent: true,
    });
    logI(`Translated: ${from}\nto:         ${to}`);
}
// copies file contents to new file
function copyNewFile(filename : string){
    fs.writeFileSync(`${filename}NEW`, fs.readFileSync(filename));
    logI(`File ${filename} copied to ${filename}NEW`);
    newfile = `${filename}NEW`;
}
// save input into variables
function promptVariables(){
    filename = promptS("File to be translated                   > ");
    lang_from = promptS("Origin language           [en,de,fr,it] > ");
    lang_to = promptS("Language to translate to  [en,de,fr,it] > ");
    skip_check = promptS("Translate all without asking?     [y,n] > ");
    newfile = filename.replace("_"+lang_from+".", "_"+lang_to+".");
}
/**
 * If file to translate to already exists, ask if new file should be created, else create file to translate to
 * @param {string} existing Filepath (translate from)
 * @param {string} to_check Filepath (translate to)
 */
function checkForExisting(existing : string, to_check : string){
    if(fs.existsSync(to_check)){ ((res : string = promptS(`File "${to_check}" already exists. Write to file [w] or create new [n] > `)) => 
        res === 'w' ?
            logI(`Writing to "${to_check}"`)
            : res === 'n' ?
                copyNewFile(to_check)
                : logI(`No valid option specified\nWriting to file ${to_check}`)
    )();
    } else {
        fs.writeFileSync(to_check, fs.readFileSync(existing));
    }
}
// read given file for each value (regex match)
function translate(){
    fs.readFileSync(filename, 'utf-8').match(regex).forEach((match: string)=> {
        let tmptext = match.match(regex_value);
        if(tmptext != null){
            let text : string = tmptext[0].replace("= ", "");
            let name : string = match.replace(text, '');
            let data : string = '';
            let translated : string = "";
            let detected_lang : string = "";
            const url = generateRequestUrl(text, { to: lang_to });
            https.get(url, (resp: { on: (arg0: string, arg1: { (chunk: any): void; }) => void; }) => {

                resp.on('data', (chunk: any) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    // response as json 
                    let jsonData = JSON.parse(data);
                    // translated text 
                    translated = jsonData[0][0][0];
                    // capitalize
                    translated = translated.charAt(0).toUpperCase() + translated.slice(1);
                    
                    detected_lang = jsonData[2];
                    
                    // if google's detected language is already the language to translate to
                    if(detected_lang != lang_to){
                        // if translation should be checked
                        if (skip_check=="n") {
                            console.log(`${green}Original text             (${lang_from}) > ${reset+text}`);
                            console.log(`${blue}Translated text           (${lang_to}) > ${reset+translated}`);
                            ((options : string = promptS("Translate, Skip, Edit? [t,s,e] > ")) =>
                                options === "t" ?
                                    replaceText(name, text, translated, newfile)
                                    : options === "s" ?
                                        logI("Skipping "+text)
                                        : options === "e" ?
                                            replaceText(name, text, promptS("Please type your translation   > "), newfile)
                                            : logI("Skipping, no valid option specified")
                            )();
                        } else {
                            replaceText(name, text, translated, newfile);
                        }
                    }else{
                        logI("Skipping because already  ("+lang_to+") > "+text);
                    }
                });
                
            }).on("error", (err: { message: string; }) => {
                logI("Error: " + err.message);
            });
        }
    });
}

promptVariables();
checkForExisting(filename, newfile);
getValuePairs(filename, newfile);
findDifferences(filename, newfile);
translate();
//fs.writeFileSync(newfile, fs.readFileSync(newfile).toString().replace(regex_ws,''));