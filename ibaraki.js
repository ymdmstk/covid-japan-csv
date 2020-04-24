const ghdownload = require('github-download')
const fs = require('fs');
const rimraf = require('rimraf');
const csv = require('csv');
const constants = require('./constants');

const CSV_HEADER = ['都道府県症例番号', '公表日', '居住市区町村','年代','性別','退院済ﾌﾗｸﾞ'];

function transform(){
    rimraf.sync("ibaraki");

    ghdownload({user: 'a01sa01to', repo: 'covid19-ibaraki', ref: 'development'}, 'ibaraki')
    .on('end', function() {
        const jsonObject = JSON.parse(fs.readFileSync('./ibaraki/data/data.json', 'utf8'));
        let patients = [CSV_HEADER];
        jsonObject.patients.data.forEach(patient => {
            let row = [];
            row.push('8-' + patient.num);
            row.push(patient['リリース日'].replace(/\-/g,'/').substring(0, 10))
            row.push(patient['居住地']);
            row.push(constants.AGE_TRANSLATE[patient['年代']]);
            row.push(patient['性別']);
            row.push(patient['退院'] === '◯' ? 1 : 0);
            patients.push(row);
        });
        
        csv.stringify(patients,(error,output)=>{
            fs.writeFile('output/ibaraki.csv',output,(error)=>{
                console.log('茨城県のCSVを出力しました。');
            })
        })        
    })
}

module.exports = {transform};
