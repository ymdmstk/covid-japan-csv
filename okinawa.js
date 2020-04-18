const fs = require( 'fs' );
const pdf = require( 'pdf-parse' );
const download = require('download-pdf')
const csv = require('csv');
const axios = require('axios');

const HTML_URL = 'https://www.pref.okinawa.lg.jp/site/hoken/chiikihoken/kekkaku/covid19_hasseijoukyou.html';
const URL = 'https://www.pref.okinawa.lg.jp';
const AGE_TRANSLATE = {'10歳未満': '0 - 9', '10代': '10 - 19', '20代': '20 - 29', '30代': '30 - 39', '40代': '40 - 49', '50代': '50 - 59', '60代': '60 - 69', '70代': '70 - 79', '80代': '80 - 89', '90代': '90 -'}
const CSV_HEADER = ['都道府県症例番号','性別','年代','発症日','確定日', '居住市区町村','その他'];



async function transform(){
    const response = await axios.get(HTML_URL);
    const path = response.data.match(/a href="(.*\.pdf)"/i);
    const options = {
        directory: "./",
        filename: "okinawa.pdf"
    };

    download(URL + path[1], options, function(err){
        let buf = fs.readFileSync( 'okinawa.pdf' );
        pdf( buf ).then(data => {
            let text = data.text;
            text = text.substring(0, text.indexOf('検疫症例のため、県内発生数に含まず'));

            const tmp_rows = text.split('\n');
            let rows = [];
            tmp_rows.forEach(row => {
                if(row.match(/\d+[男性|女性]/g)){
                    rows.push(row);
                }else{
                    rows[rows.length - 1] = rows[rows.length - 1] + row;
                }
            });

            let patients = [CSV_HEADER];
            rows.forEach(row => {
                if(row.match(/\d+[男性|女性]/g)){
                    let matches = row.match(/(\d+)(男性|女性)(\d+代)(\d+月\d+日|確認中)(\d+月\d+日|確認中)(.*市|.*管内|.*都)(.*)/i);
                    if(matches) {
                        matches.shift()
                        matches[0] = '47-' + matches[0];
                        matches[2] = AGE_TRANSLATE[matches[2]];
                        matches[3] = (matches[3] === '確認中') ? '' : '2020/' + matches[3].replace('月','/').replace('日','');
                        matches[4] = (matches[4] === '確認中') ? '' : '2020/' + matches[4].replace('月','/').replace('日','');
                        patients.push(matches)
                    }
                }
            });

            csv.stringify(patients,(error,output)=>{
                fs.writeFile('okinawa.csv',output,(error)=>{
                    console.log('沖縄県のCSVを出力しました。');
                })
            })     
        })
    })
}

module.exports = {transform};
