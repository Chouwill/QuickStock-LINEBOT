---


---

# QuickStock LINE Bot
（LINE 官方帳號：股匯即時報）

---

## LINE 官方帳號
官方帳號 ID: @510idbpd

[官方帳號連結](https://line.me/R/ti/p/@510idbpd)


掃描 QR Code 加入好友：

<img
  src="./docs/QuickStock LINE Bot.png"
  alt="LINE 官方帳號 QR Code"
  width="200"
/>




---

## 功能說明
- 提供查詢當日匯率
- 提供查詢當日股票交易資訊
- 提供互動式選單、自訂日期查詢歷史紀錄

---

## 使用技術
- Node.js（執行環境）
- LINE Messaging API（Bot 平台）
- linebot（Webhook 與訊息處理）
- axios（第三方 API 串接）
- dayjs（日期格式與查詢處理）
- FinMind API(股票、外匯資料來源提供)

---

## 環境變數設定

請在專案根目錄建立 `.env` 檔案，並設定以下環境變數：

CHANNEL_ID
CHANNEL_SECRET
CHANNEL_ACCESS_TOKEN
FINMIND_API_TOKEN


---

## 專案啟動方式

安裝套件：

npm install

啟動專案：

npm run dev

---


