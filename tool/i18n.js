//require('dotenv').config({path: '/mnt/c/Users/anon/Documents/Code/Web/curriculum-vitae-ts/.env'});
const { generateRequestUrl, normaliseResponse } = require('google-translate-api-browser');
const https = require('https');
const fs = require("fs");
const { Client } = require("pg");
const fetch = require("node-fetch");
const path = require('path')

const re = /[a-z]+_e$/;

(async () => {
    try {
        async function run_query(query) {
            const client = new Client({
                host: "localhost",
                user: "postgres",
                password: "root",
                database: "portfolio",
                port: 5432,
            });
            await client.connect();
            const result = await client.query(query);
            client.end();
            return result.rows;
        }
        const jsonFile = path.resolve('db/i18n.json')
        let jsonObj = JSON.parse(fs.readFileSync(jsonFile))
        const tables = await run_query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log(tables);
        tables.forEach(async (table) => {
            const columns = await run_query("select column_name from information_schema.columns where table_name = '" + table.table_name + "'");
            //console.log(table.table_name, columns)
            columns.forEach(async col => {
                if (re.test(col.column_name)) {
                    if (!jsonObj[table.table_name]) {
                        jsonObj[table.table_name] = {}
                        fs.writeFileSync(jsonFile, JSON.stringify(jsonObj, null, '\t'))
                    }
                    let colname = col.column_name.substring(0, col.column_name.length - 2);
                    let entries = await run_query(`select ${table.table_name}_id, ${colname} from ${table.table_name}`);
                    entries.forEach(async entry => {
                        let german = entry[colname]

                        if (!jsonObj[table.table_name][entry[`${table.table_name}_id`]]) {
                            jsonObj[table.table_name][entry[`${table.table_name}_id`]] = {}
                            fs.writeFileSync(jsonFile, JSON.stringify(jsonObj, null, '\t'))
                        }
                        if (!jsonObj[table.table_name][entry[`${table.table_name}_id`]][colname]) {
                            jsonObj[table.table_name][entry[`${table.table_name}_id`]][colname] = german
                            fs.writeFileSync(jsonFile, JSON.stringify(jsonObj, null, '\t'))
                        }
                        if (german && !jsonObj[table.table_name][entry[`${table.table_name}_id`]][colname + "_e"]) {
                            const url = generateRequestUrl(german, { to: "en" });

                            https.get(url, (resp) => {
                                let data = '';

                                resp.on('data', (chunk) => {
                                    data += chunk;
                                });

                                resp.on('end', () => {
                                    jsonObj[table.table_name][entry[`${table.table_name}_id`]][colname + "_e"] = normaliseResponse(JSON.parse(data)).text
                                    fs.writeFileSync(jsonFile, JSON.stringify(jsonObj, null, '\t'))
                                    console.log(normaliseResponse(JSON.parse(data)).text);
                                });
                            }).on("error", (err) => {
                                console.log("Error: " + err.message);
                            });
                            /*const { english } = await translate(german, { to: 'en' });
                            //let respe = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=en&dt=t&q=${encodeURI(german).replace('\.', '%2E')}`)
                            //let english = await respe.json();
                            jsonObj[table.table_name][entry[`${table.table_name}_id`]][colname + "_e"] = english
                            fs.writeFileSync(jsonFile, JSON.stringify(jsonObj, null, '\t'))
                            //console.log(english[0][0][0])*/
                        }
                        if (german && !jsonObj[table.table_name][entry[`${table.table_name}_id`]][colname + "_r"]) {
                            const url = generateRequestUrl(german, { to: "ru" });

                            https.get(url, (resp) => {
                                let data = '';

                                resp.on('data', (chunk) => {
                                    data += chunk;
                                });

                                resp.on('end', () => {
                                    jsonObj[table.table_name][entry[`${table.table_name}_id`]][colname + "_r"] = normaliseResponse(JSON.parse(data)).text
                                    fs.writeFileSync(jsonFile, JSON.stringify(jsonObj, null, '\t'))
                                    console.log(normaliseResponse(JSON.parse(data)).text);
                                });
                            }).on("error", (err) => {
                                console.log("Error: " + err.message);
                            });
                            /*const { russian } = await translate(german, { to: 'en' });
                            //let respr = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=ru&dt=t&q=${encodeURI(german).replace('\.', '%2E')}`)
                            //let russian = await respr.json();
                            jsonObj[table.table_name][entry[`${table.table_name}_id`]][colname + "_r"] = russian
                            fs.writeFileSync(jsonFile, JSON.stringify(jsonObj, null, '\t'))
                            //console.log(russian[0][0][0])*/
                        }
                    })
                }
            })
        });
        /*fs.writeFile(
                    `C:/Users/anon/Documents/Code/Web/cv-angular/tool/db/insert_i18n.sql`,
                    JSON.stringify(result.rows, null, " ").replace(/: null/g, ': ""'),
                    (err) => {
                        if (err) {
                            console.error(err);
                        }
                    }
                );*/
        //"select column_name from information_schema.columns where table_name = ''"
    } catch (err) {
        console.error("error executing query:", err);
    }
})();
