const axios = require('axios');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const csv = require('csv');
const constants = require('./constants');

const URL = 'https://docs.google.com/spreadsheets/d/1aCIRyol3UncEtstWhT_Yw3I8mCbvpGQU5_HUKB_0JFA/export?format=csv&gid=0';
const CSV_HEADER = ['都道府県症例番号', '公表日', '居住市区町村','年代','性別','退院済ﾌﾗｸﾞ','退院日','情報源1'];

async function transform(){
    const response = await axios.get(URL);
    const records = parse(response.data, {
        columns: true,
        from_line: 6,
        skip_empty_lines: false
    });
    let patients = [CSV_HEADER];
    records.forEach(patient => {
        let row = [];
        row.push('9-' + patient.ID);
        row.push(patient['日付（発表日）'].replace(/\-/g,'/'))
        row.push(patient['居住地']);
        row.push(constants.AGE_TRANSLATE[patient['年代']]);
        row.push(patient['性別']);
        const flag = patient['退院日'].length == 0 ? 0: 1;
        row.push(flag)
        row.push(patient['退院日'].replace(/\-/g,'/'))
        row.push(patient['ソース']);
        patients.push(row);
    });

    csv.stringify(patients,(error,output)=>{
        fs.writeFile('output/tochigi.csv',output,(error)=>{
            console.log('栃木県のCSVを出力しました。');
        })
    })     
};

module.exports = {transform};
