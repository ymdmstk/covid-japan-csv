const fs = require( 'fs' );
const csv = require('csv');
const axios = require('axios');
const parse = require('csv-parse/lib/sync');
const xlsx = require("xlsx");
const dateformat = require('dateformat');
const constants = require('./constants');

const HTML_URL = 'http://www.pref.osaka.lg.jp/iryo/osakakansensho/corona.html';
const URL = 'http://www.pref.osaka.lg.jp';

const CSV_HEADER = ['都道府県症例番号','発症日','公表日','居住市区町村','年代','性別','症状'];

async function transform(){
    const html = await axios.get(HTML_URL);
    const path = html.data.match(/<p><a href="(.*\.xlsx)">/i);
    const response = await axios.get(URL + path[1], { responseType: 'arraybuffer' });
    fs.writeFileSync(`./osaka.xlsx`, new Buffer.from(response.data), 'binary');

    const book = xlsx.readFile("osaka.xlsx");
    const sheet1 = book.Sheets["Sheet1"];

    let endCol = sheet1['!ref'].match(/\:[A-Z+]([0-9]+)/)[1]
    sheet1['!ref'] = `A2:G${endCol}`
    let sheet1_json = xlsx.utils.sheet_to_json( sheet1 )

    let patients = [CSV_HEADER];
    sheet1_json.forEach(cl => {
        let row = [];
        row.push('27-' + cl['番号']);

        if(!isNaN(cl['発症日'])) {
            row.push(dateformat(new Date(1900, 0, cl['発症日'] - 1),'yyyy/mm/dd'))
        } else {
            row.push(' ');
        }        
        row.push(dateformat(new Date(1900, 0, cl['報道提供日'] - 1),'yyyy/mm/dd'));
        row.push(cl['居住地']);
        row.push(constants.AGE_TRANSLATE[cl['年代'] + '']);
        row.push(cl['性別']);
        if(cl['症状'] === '―') {
            row.push('');
        }else {
            row.push(cl['症状']);
        }
        patients.push(row);
    })

    csv.stringify(patients,(error,output)=>{
        fs.writeFile('output/osaka.csv',output,(error)=>{
            console.log('大阪府のCSVを出力しました。');
        })
    })     
}

module.exports = {transform};
