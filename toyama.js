const ghdownload = require('github-download')
const fs = require('fs');
const rimraf = require('rimraf');
const csv = require('csv');
const constants = require('./constants');

const CSV_HEADER = ['都道府県症例番号', '公表日', '居住市区町村','年代','性別'];

function transform(){
    rimraf.sync("toyama");

    ghdownload({user: 'Terachan0117', repo: 'covid19-toyama', ref: 'development'}, 'toyama')
    .on('end', function() {
        const jsonObject = JSON.parse(fs.readFileSync('./toyama/data/data.json', 'utf8'));
        let patients = [CSV_HEADER];
        jsonObject.patients.data.forEach(patient => {
            let row = [];
            row.push('16-' + patient.No);
            row.push(patient['判明日'].replace(/\-/g,'/'))
            row.push(patient['居住地'])
            row.push(constants.AGE_TRANSLATE[patient['年代']])
            row.push(patient['性別'])
            patients.push(row);
        });
        
        csv.stringify(patients,(error,output)=>{
            fs.writeFile('output/toyama.csv',output,(error)=>{
                console.log('富山県のCSVを出力しました。');
            })
        })        
    })
}

module.exports = {transform};
