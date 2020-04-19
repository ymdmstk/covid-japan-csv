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
|  福井  |  公表日,居住市区町村,年代,性別,退院済ﾌﾗｸﾞ,濃厚接触者数 | JSON | https://github.com/westar7/fukui-covid19/blob/development/data/data.json |
|  群馬  |  公表日,居住市区町村,年代,性別,属性,備考  | JSON | https://github.com/bpr-gunma/covid19/blob/development/data/data.json |
|  京都  |  公表日,居住市区町村,性別,年代,ステータス,退院済ﾌﾗｸﾞ,情報源1  | HTML | https://www.pref.kyoto.jp/kentai/news/novelcoronavirus.html |
|  三重  |  公表日,居住市区町村,性別,年代,その他  | CSV | https://www.pref.mie.lg.jp/common/content/000886460.csv |
|  沖縄  |  性別,年代,発症日,確定日,居住市区町村,その他(職業を含む)  | PDF | https://www.pref.okinawa.lg.jp/site/hoken/chiikihoken/kekkaku/covid19_hasseijoukyou.html のリンク先のPDF|
|  滋賀  |  公表日,居住市区町村,性別,年代,退院済ﾌﾗｸﾞD  | CSV | https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=1551840287&single=true&output=csv |
|  栃木  |  公表日,居住市区町村,年代,性別,退院済ﾌﾗｸﾞ,退院日,情報源1  | CSV | https://docs.google.com/spreadsheets/d/1aCIRyol3UncEtstWhT_Yw3I8mCbvpGQU5_HUKB_0JFA/export?format=csv&gid=0 |
|  富山  |  公表日,居住市区町村,年代,性別  | JSON | https://github.com/Terachan0117/covid19-toyama/blob/development/data/data.json |
|  山梨  |  公表日,居住市区町村,年代,性別,退院済ﾌﾗｸﾞ  | JSON | https://github.com/covid19-yamanashi/covid19/blob/development/data/data.json |

## 対応できない

|  都道府県  | できない理由 | URL |
| ---- | ---- | ---- | ---- |
| 和歌山 | 提供先が見つからない |  |
| 愛媛 | Noがない | https://github.com/ehime-covid19/covid19/blob/master/data/data.json |
| 島根 | Noがない | https://github.com/TaigaMikami/shimane-covid19/blob/shimane/data/data.json |
