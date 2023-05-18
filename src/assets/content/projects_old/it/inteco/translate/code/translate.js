var _a = require('google-translate-api-browser'), generateRequestUrl = _a.generateRequestUrl, normaliseResponse = _a.normaliseResponse;
var https = require('https');
var replace = require("replace");
var promptSync = require("prompt-sync")({ sigint: true });
var fs = require('fs');
// color constants for log output
var reset = "\x1b[0m";
var red = "\x1b[31m";
var green = "\x1b[32m";
var blue = "\x1b[34m";
var yellow = "\x1b[33m";
// regular expression to find values with
var regex_ws = /\n(?!([^\n]|\n#))/gmu;
var regex_name = /^([a-zA-Z\-0-9]\.?)+/gmu;
var regex_value = /=[^\S\r\n].+$/gmu;
var regex = /^([a-zA-Z\-0-9]\.?)+\s+=[^\S\r\n].+$/gmu;
// define variables
var filename = '';
var lang_from = '';
var lang_to = '';
var skip_check = '';
var newfile = '';
// store values
var fromValuePairs = new Map();
var toValuePairs = new Map();
var nrOfOgValues = 0;
var nrOfTranslatedValues = 0;
var nrOfValuesToTranslate = 0;
/**
 * Escapes regex characters in string with \
 * @param {string} str Input string
 * @returns {string} Escaped string
 */
function escapeRegex(str) {
    return String(str).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}
/**
 * Prompts for and returns user input
 * @param {string} s Prompt to be shown
 * @returns {string} User input
 */
function promptS(s) {
    return promptSync(yellow + s + reset);
}
/**
 * Logs s in red
 * @param {string} s String to be logged
 */
function logI(s) {
    console.log(red + s + reset);
}
function getValuePairs(file1, file2) {
}
/**
 * Find all matches inside of a file and return them as string array
 * @param {string} filename File to search through
 * @param {string} regex Regular Expression
 * @returns {(string|Array)} Array of matches
 */
function findMatches(filename, regex) {
    var matches = [];
    fs.readFileSync(filename, 'utf-8').match(regex).forEach(function (match) {
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
function isInString(array, value) {
    var result = false;
    array.forEach(function (name) {
        if (new RegExp(escapeRegex(name) + "\\s").test(value)) {
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
function findDifferences(file1, file2) {
    var matches1 = findMatches(file1, regex);
    var names1 = findMatches(file1, regex_name);
    var matches2 = findMatches(file2, regex);
    var names2 = findMatches(file2, regex_name);
    var filtered1 = names1.filter(function (val) { return !names2.includes(val); });
    var filtered2 = names2.filter(function (val) { return !names1.includes(val); });
    var filtered_values1 = matches1.filter(function (val) {
        return isInString(filtered1, val);
    });
    var filtered_values2 = matches2.filter(function (val) {
        return isInString(filtered2, val);
    });
    if (filtered1.length > 0) {
        logI("New values will be added to \"" + file2 + "\" > " + filtered1.join(", "));
        filtered_values1.forEach(function (line) {
            fs.writeFile(file2, "\n" + line, { flag: "a+" }, function (err) { if (err)
                throw err; });
        });
    }
    if (filtered2.length > 0) {
        logI("Values that are only in \"" + file2 + "\" > " + filtered2.join(", "));
        (function (res) {
            if (res === void 0) { res = promptS("Add these values to \"" + file1 + "\"? [y,n] > "); }
            return res === "y" ?
                filtered_values2.forEach(function (line) { fs.appendFile(file1, "\n" + line, function (err) { if (err)
                    throw err; }); })
                : res === "n" ?
                    logI("\"" + file1 + "\" will stay unedited")
                    : logI("No valid option specified, \"" + file1 + "\" will stay unedited");
        })();
    }
}
/**
 * Replaces text in a given file
 * @param {string} from
 * @param {string} to
 * @param {string} file
 */
function replaceText(name, from, to, file) {
    var full_from = name + from;
    var full_to = name + to;
    var t = (full_to.endsWith('\n') ? full_to : full_to + '\n');
    replace({
        regex: escapeRegex(full_from),
        replacement: t,
        paths: [file],
        recursive: true,
        silent: true
    });
    logI("Translated: " + from + "\nto:         " + to);
}
// copies file contents to new file
function copyNewFile(filename) {
    fs.writeFileSync(filename + "NEW", fs.readFileSync(filename));
    logI("File " + filename + " copied to " + filename + "NEW");
    newfile = filename + "NEW";
}
// save input into variables
function promptVariables() {
    filename = promptS("File to be translated                   > ");
    lang_from = promptS("Origin language           [en,de,fr,it] > ");
    lang_to = promptS("Language to translate to  [en,de,fr,it] > ");
    skip_check = promptS("Translate all without asking?     [y,n] > ");
    newfile = filename.replace("_" + lang_from + ".", "_" + lang_to + ".");
}
/**
 * If file to translate to already exists, ask if new file should be created, else create file to translate to
 * @param {string} existing Filepath (translate from)
 * @param {string} to_check Filepath (translate to)
 */
function checkForExisting(existing, to_check) {
    if (fs.existsSync(to_check)) {
        (function (res) {
            if (res === void 0) { res = promptS("File \"" + to_check + "\" already exists. Write to file [w] or create new [n] > "); }
            return res === 'w' ?
                logI("Writing to \"" + to_check + "\"")
                : res === 'n' ?
                    copyNewFile(to_check)
                    : logI("No valid option specified\nWriting to file " + to_check);
        })();
    }
    else {
        fs.writeFileSync(to_check, fs.readFileSync(existing));
    }
}
// read given file for each value (regex match)
function translate() {
    fs.readFileSync(newfile, 'utf-8').match(regex).forEach(function (match) {
        var tmptext = match.match(regex_value);
        if (tmptext != null) {
            var text_1 = tmptext[0].replace("= ", "");
            var name_1 = match.replace(text_1, '');
            var data_1 = '';
            var translated_1 = "";
            var detected_lang_1 = "";
            var url = generateRequestUrl(text_1, { to: lang_to });
            https.get(url, function (resp) {
                resp.on('data', function (chunk) {
                    data_1 += chunk;
                });
                resp.on('end', function () {
                    // response as json 
                    var jsonData = JSON.parse(data_1);
                    // translated text 
                    translated_1 = jsonData[0][0][0];
                    // capitalize
                    translated_1 = translated_1.charAt(0).toUpperCase() + translated_1.slice(1);
                    detected_lang_1 = jsonData[2];
                    // if google's detected language is already the language to translate to
                    if (detected_lang_1 != lang_to) {
                        // if translation should be checked
                        if (skip_check == "n") {
                            console.log(green + "Original text             (" + lang_from + ") > " + (reset + text_1));
                            console.log(blue + "Translated text           (" + lang_to + ") > " + (reset + translated_1));
                            (function (options) {
                                if (options === void 0) { options = promptS("Translate, Skip, Edit? [t,s,e] > "); }
                                return options === "t" ?
                                    replaceText(name_1, text_1, translated_1, newfile)
                                    : options === "s" ?
                                        logI("Skipping " + text_1)
                                        : options === "e" ?
                                            replaceText(name_1, text_1, promptS("Please type your translation   > "), newfile)
                                            : logI("Skipping, no valid option specified");
                            })();
                        }
                        else {
                            replaceText(name_1, text_1, translated_1, newfile);
                        }
                    }
                    else {
                        logI("Skipping because already  (" + lang_to + ") > " + text_1);
                    }
                });
            }).on("error", function (err) {
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
