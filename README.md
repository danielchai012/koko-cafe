# KOKO Cafe Langkawi — 品牌形象頁與菜單

純靜態網站（無框架、無建置步驟），內容為馬來西亞蘭卡威 Kuah 的 KOKO Cafe Langkawi（Vege, Muslim Friendly）。

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | 形象首頁：品牌故事、招牌餐點、飲食友善標示、空間與餐點相簿、顧客回饋、來店資訊 |
| `menu.html` | 菜單頁：11 個真實分類、18 個已收錄品項、分類列與關鍵字即時篩選、菜單實拍放大檢視 |
| `assets/css/` | 設計令牌（`site.css`）、菜單頁樣式（`menu.css`）、版面基元（`od-layout.css`） |
| `assets/js/` | 共用行為（`site.js`）、菜單篩選（`menu.js`） |
| `assets/photos/` | 店面與餐點照片 |
| `assets/credits.json` | 每張照片與每段文字資訊的來源、查詢日期與備註 |

## 上線

GitHub Pages 以 `main` 分支的 repository 根目錄發佈，網址：
`https://danielchai012.github.io/koko-cafe/`

## 內容來源與注意事項

- 店名、地址、電話、營業時間、人均消費、評分與菜單分類／品項名稱，取自 KOKO Cafe Langkawi 的 Google 地圖店家頁面（2026-11-24 查詢）。
- 公開來源沒有可引用的文字價格，因此網站不顯示價格，一律標示「以店內菜單為準」，未編造任何數字。
- 照片取自店方在 Google 地圖的公開相簿，版權仍屬店方或上傳者。**正式對外使用前，建議先取得店家同意或改用店家提供的原始照片檔**，並直接替換 `assets/photos/` 下的同名檔案即可。
- 若要改字級、顏色、間距，只需編輯 `assets/css/site.css` 頂部的 token。
