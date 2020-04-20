const fs = require( 'fs' );
const csv = require('csv');
const axios = require('axios');
const HTMLParser = require('node-html-parser');

const HTML_URL = 'https://www.pref.kyoto.jp/kentai/news/novelcoronavirus.html';
// const HTML_URL = 'https://www.pref.kyoto.jp/kentai/corona/hassei51-100.html';
// const HTML_URL = 'http://www.pref.kyoto.jp/kentai/corona/hassei1-50.html';
const AGE_TRANSLATE = {'－': 'NA', '園児': '0 - 9', '10未満': '0 - 9', '10': '10 - 19', '20': '20 - 29', '30': '30 - 39', '40': '40 - 49', '50': '50 - 59', '60': '60 - 69', '70': '70 - 79', '80': '80 - 89', '90': '90 -'}
const CSV_HEADER = ['都道府県症例番号','公表日', '居住市区町村','性別','年代','ステータス', '退院済ﾌﾗｸﾞ','情報源1'];

async function transform(){
    const response = await axios.get(HTML_URL);
    const root = HTMLParser.parse(response.data);
    const trs = root.querySelectorAll('table')[1].querySelectorAll('tr');
    // const trs = root.querySelectorAll('table')[0].querySelectorAll('tr');

    let patients = [];
    for(let i = 1; i<trs.length; i++){
        let row = [];
        row.push('26-' + trs[i].childNodes[1].rawText.match(/\d+/i)[0]);
        row.push('2020/' + trs[i].childNodes[3].rawText.substring(4).replace('月', '/').replace('日', ''));
        row.push(trs[i].childNodes[9].rawText);
        row.push(trs[i].childNodes[7].rawText === '&nbsp;' ? '' : trs[i].childNodes[7].rawText);
        row.push(AGE_TRANSLATE[trs[i].childNodes[5].rawText]);
        if(trs[i].childNodes.length === 17) {
            row.push(trs[i].childNodes[15].rawText.match(/死亡/) ? '死亡': '');
            row.push(trs[i].childNodes[15].rawText.match(/退院|死亡/) ? 1: 0);
        } else {
            row.push(trs[i].childNodes[13].rawText.match(/死亡/) ? '死亡': '');
            row.push(trs[i].childNodes[13].rawText.match(/退院|死亡/) ? 1: 0);
        }
        let url = '';
        if(trs[i].childNodes[11].childNodes[0].childNodes.length > 0) {
            if(trs[i].childNodes[11].childNodes[0].getAttribute('href').indexOf('http') >= 0) {
                url = trs[i].childNodes[11].childNodes[0].getAttribute('href');
            } else {
                url = 'https://www.pref.kyoto.jp/' + trs[i].childNodes[11].childNodes[0].getAttribute('href') 
            }
        }
        row.push(url);
        patients.push(row);
    }

    patients.push(CSV_HEADER)

    csv.stringify(patients.reverse(),(error,output)=>{
        fs.writeFile('output/kyoto.csv',output,(error)=>{
            console.log('京都府のCSVを出力しました。');
        })
    })     
}

transform()

module.exports = {transform};
