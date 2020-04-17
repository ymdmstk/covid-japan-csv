const ghdownload = require('github-download')
const fs = require('fs');
const rimraf = require('rimraf');
const csv = require('csv');
const CSV_HEADER = ['都道府県症例番号', '公表日', '居住市区町村','年代','性別','属性','備考'];
const AGE_TRANSLATE = {'10歳未満': '0 - 9', '10代': '10 - 19', '20代': '20 - 29', '30代': '30 - 39', '40代': '40 - 49', '50代': '50 - 59', '60代': '60 - 69', '70代': '70 - 79', '80代': '80 - 89', '90代': '90 -'}

rimraf.sync("gunma");

ghdownload({user: 'bpr-gunma', repo: 'covid19', ref: 'master'}, 'gunma')
 .on('end', function() {
    const jsonObject = JSON.parse(fs.readFileSync('./gunma/data/data.json', 'utf8'));
    let patients = [CSV_HEADER];
    jsonObject.patients.data.forEach(patient => {
        let row = [];
        row.push('10-' + patient.No);
        row.push(patient['date'].replace(/\-/g,'/'))
        row.push(patient['居住地'])
        row.push(AGE_TRANSLATE[patient['年代']])
        row.push(patient['性別'])
        row.push(patient['属性'])
        row.push(patient['備考']);
        patients.push(row);
    });
    
    csv.stringify(patients,(error,output)=>{
        fs.writeFile('gunma.csv',output,(error)=>{
            console.log('処理データをCSV出力しました。');
        })
    })        
})

