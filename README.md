# covid-japan-csv

```
$ npm i
$ npm start
```

CSVファイルをExcelやOpenOfficeなどで開いて、コピーしたいセル範囲を選択コピーし、
Google SpreadSheet上の貼り付けたいセル上で右クリックして「特殊貼付け」 -> 「値のみ貼り付け」します。

## 対応済み

|  都道府県  |  取得済みカラム  | 元データ形式 | URL |
| ---- | ---- | ---- | ---- |
|  福井  |  公表日,居住市区町村,年代,性別,退院済ﾌﾗｸﾞ,濃厚接触者数 | JSON | <a href="https://github.com/westar7/fukui-covid19/blob/development/data/data.json">URL</a> |
|  群馬  |  公表日,居住市区町村,年代,性別,属性,備考  | JSON | <a href="https://github.com/bpr-gunma/covid19/blob/development/data/data.json">URL</a> |
|  京都  |  公表日,居住市区町村,年代,性別,ステータス,退院済ﾌﾗｸﾞ,情報源1  | HTML | <a href="https://www.pref.kyoto.jp/kentai/news/novelcoronavirus.html">URL</a> |
|  三重  |  公表日,居住市区町村,年代,性別,その他  | CSV | <a href="https://www.pref.mie.lg.jp/YAKUMUS/HP/m0068000071_00022.htm">URL</a> のリンク先のCSV |
|  沖縄  |  性別,年代,発症日,確定日,居住市区町村,その他(職業を含む)  | PDF | <a href="https://www.pref.okinawa.lg.jp/site/hoken/chiikihoken/kekkaku/covid19_hasseijoukyou.html">URL</a> のリンク先のPDF|
|  滋賀  |  公表日,居住市区町村,性別,年代,退院済ﾌﾗｸﾞ  | CSV | <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=1551840287&single=true&output=csv">URL</a> |
|  栃木  |  公表日,居住市区町村,年代,性別,退院済ﾌﾗｸﾞ,退院日,情報源1  | CSV | <a href="https://docs.google.com/spreadsheets/d/1aCIRyol3UncEtstWhT_Yw3I8mCbvpGQU5_HUKB_0JFA/export?format=csv&gid=0">URL</a> |
|  富山  |  公表日,居住市区町村,年代,性別  | JSON | <a href="https://github.com/Terachan0117/covid19-toyama/blob/development/data/data.json">URL</a> |
|  山梨  |  公表日,居住市区町村,年代,性別,退院済ﾌﾗｸﾞ  | JSON | <a href="https://github.com/covid19-yamanashi/covid19/blob/development/data/data.json">URL</a> |
|  茨城  |  公表日,居住市区町村,年代,性別,退院済ﾌﾗｸﾞ  | JSON | <a href="https://github.com/a01sa01to/covid19-ibaraki/blob/development/data/data.json">URL</a> |
|  大阪  |  発症日,公表日,居住市区町村,年代,性別,症状 | Excel | <a href="http://www.pref.osaka.lg.jp/iryo/osakakansensho/corona.html">URL</a> のリンク先のExcel|
|  岐阜  |  公表日,居住市区町村,年代,性別,ステータス,退院済ﾌﾗｸﾞ | CSV | <a href="https://data.gifu-opendata.pref.gifu.lg.jp/dataset/c11223-001">URL</a>|


## 対応できない

|  都道府県  | できない理由 | URL |
| ---- | ---- | ---- |
| 和歌山 | 提供先が見つからない |  |
| 神奈川 | Noがない | <a href="http://www.pref.kanagawa.jp/docs/t3u/dst/s0060925.html">URL<a>|
| 愛媛 | Noがない | <a href="https://github.com/ehime-covid19/covid19/blob/master/data/data.json">URL</a> |
| 島根 | Noがない | <a href="https://github.com/TaigaMikami/shimane-covid19/blob/shimane/data/data.json">URL</a> |
