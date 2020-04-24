const fs = require( 'fs' );
const csv = require('csv');
const axios = require('axios');
const parse = require('csv-parse/lib/sync');
const iconv = require('iconv-lite')
const constants = require('./constants');

const CSV_URL = 'https://data.gifu-opendata.pref.gifu.lg.jp/dataset/4661bf9d-6f75-43fb-9d59-f02eb84bb6e3/resource/9c35ee55-a140-4cd8-a266-a74edf60aa80/download/210005gifucovid19patients.csv';
const CSV_HEADER = ['都道府県症例番号','公表日', '居住市区町村','年代','性別','ステータス','退院済ﾌﾗｸﾞ','海外渡航歴ﾌﾗｸﾞ'];

async function transform(){
    const response = await axios.get(CSV_URL, { responseType: 'arraybuffer' });
    const body = iconv.decode(Buffer.from(response.data), 'windows-31j')
    const records = parse(body, {
        columns: true,
        skip_empty_lines: false
    });
    let patients = [CSV_HEADER];
    records.forEach(patient => {
        let row = [];
        row.push('21-' + patient.No);
        row.push(patient['公表_年月日'].replace(/\-/g,'/'));
        row.push(patient['患者_居住地']);
        row.push(constants.AGE_TRANSLATE[patient['患者_年代']]);
        row.push(patient['患者_性別']);    
        row.push(patient['患者_状態']);
        row.push(patient['退院済フラグ']);
        row.push(patient['患者_渡航歴の有無フラグ']);
        patients.push(row);
    });

    csv.stringify(patients,(error,output)=>{
        fs.writeFile('output/gifu.csv',output,(error)=>{
            console.log('岐阜県のCSVを出力しました。');
        })
    })     
}

module.exports = {transform};
