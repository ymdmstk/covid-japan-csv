const fs = require( 'fs' );
const csv = require('csv');
const axios = require('axios');
const parse = require('csv-parse/lib/sync');
const iconv = require('iconv-lite')
const constants = require('./constants');

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=1551840287&single=true&output=csv';
const CSV_HEADER = ['都道府県症例番号','公表日', '居住市区町村','性別','年代','退院済ﾌﾗｸﾞ'];

async function transform(){
    const response = await axios.get(CSV_URL);
    const records = parse(response.data, {
        columns: true,
        skip_empty_lines: false
    });
    let patients = [CSV_HEADER];
    records.forEach(patient => {
        let row = [];
        row.push('25-' + patient['']);
        row.push(patient['リリース日']);
        row.push(patient['居住地']);
        row.push(patient['性別']);        
        row.push(constants.AGE_TRANSLATE[patient['年代']]);
        row.push(patient['退院'] === '○' ? 1 : 0)
        patients.push(row);
    });

    csv.stringify(patients,(error,output)=>{
        fs.writeFile('output/shiga.csv',output,(error)=>{
            console.log('滋賀県のCSVを出力しました。');
        })
    })     
}

module.exports = {transform};
