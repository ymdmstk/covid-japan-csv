const fs = require( 'fs' );
const csv = require('csv');
const axios = require('axios');
const parse = require('csv-parse/lib/sync');
const iconv = require('iconv-lite')

const CSV_URL = 'https://www.pref.mie.lg.jp/common/content/000886460.csv';
const AGE_TRANSLATE = {'10歳未満': '0 - 9', '10代': '10 - 19', '20代': '20 - 29', '30代': '30 - 39', '40代': '40 - 49', '50代': '50 - 59', '60代': '60 - 69', '70代': '70 - 79', '80代': '80 - 89', '90代': '90 -'}
const CSV_HEADER = ['都道府県症例番号','公表日', '居住市区町村','性別','年代','その他'];

async function transform(){
    const response = await axios.get(CSV_URL, { responseType: 'arraybuffer' });
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
        row.push(patient['性別']);        
        row.push(AGE_TRANSLATE[patient['年代']]);
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
