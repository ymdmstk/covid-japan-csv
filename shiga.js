const fs = require( 'fs' );
const csv = require('csv');
const axios = require('axios');
const parse = require('csv-parse/lib/sync');
const iconv = require('iconv-lite')

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=1551840287&single=true&output=csv';
const AGE_TRANSLATE = {'10歳未満': '0 - 9', '10代': '10 - 19', '20代': '20 - 29', '30代': '30 - 39', '40代': '40 - 49', '50代': '50 - 59', '60代': '60 - 69', '70代': '70 - 79', '80代': '80 - 89', '90代': '90 -'}
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
        row.push(AGE_TRANSLATE[patient['年代']]);
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
