const fs = require( 'fs' );
const csv = require('csv');
const axios = require('axios');
const parse = require('csv-parse/lib/sync');
const iconv = require('iconv-lite')
const constants = require('./constants');

const HTML_URL = 'https://www.pref.mie.lg.jp/YAKUMUS/HP/m0068000071_00022.htm';
const URL = 'https://www.pref.mie.lg.jp';
const CSV_HEADER = ['都道府県症例番号','公表日', '居住市区町村','年代','性別','その他'];

async function transform(){
    const html = await axios.get(HTML_URL);
    const path = html.data.match(/href="(.*\.csv)">県内/i);

    const response = await axios.get(URL + path[1], { responseType: 'arraybuffer' });
    var body = iconv.decode(Buffer.from(response.data), 'windows-31j')
    const records = parse(body, {
        columns: true,
        skip_empty_lines: false
    });
    let patients = [CSV_HEADER];
    records.forEach(patient => {
        let row = [];
        row.push('24-' + patient.No);
        row.push(patient['公表年月日']);
        row.push(patient['居住地']);
        row.push(constants.AGE_TRANSLATE[patient['年代']]);
        row.push(patient['性別']);             
        row.push(patient['退院済みフラグ'])
        patients.push(row);
    });

    csv.stringify(patients,(error,output)=>{
        fs.writeFile('output/mie.csv',output,(error)=>{
            console.log('三重県のCSVを出力しました。');
        })
    })     
}

module.exports = {transform};
