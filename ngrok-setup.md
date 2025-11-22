# ngrok 轉送連接埠設定筆記

## 📋 概述

ngrok 用於將本地開發的 LINE Bot 轉發到公網，讓 LINE 平台可以發送 webhook 到本地環境。

## 🔧 安裝步驟

### 1. 安裝 ngrok

```bash
brew install ngrok/ngrok/ngrok
```

### 2. 取得 authtoken

1. 前往：https://dashboard.ngrok.com/get-started/your-authtoken
2. 註冊/登入（免費帳號即可）
3. 複製你的 authtoken

### 3. 設定 authtoken

```bash
ngrok config add-authtoken <YOUR_TOKEN>
```

### 4. 驗證設定

```bash
ngrok config check
```

應該會顯示：`Valid configuration file at ...`

## 🚀 使用方式

### 啟動流程

**終端 1：啟動 Bot**
```bash
npm run dev
```

等待看到 `---------財匯機器人啟動-----` 訊息

**終端 2：啟動 ngrok 轉送**
```bash
npm run ngrok
```

或直接執行：
```bash
./start-ngrok.sh
```

### ngrok 輸出說明

ngrok 啟動後會持續運行（這是正常的），你會看到類似：

```
Forwarding   https://xxxx-xxxx-xxxx.ngrok-free.app -> http://localhost:3000

Session Status                online
Account                       [你的帳號]
Forwarding                    https://xxxx.ngrok-free.app -> http://localhost:3000
```

## 🔗 設定 LINE Webhook

1. 複製 ngrok 提供的 HTTPS URL（例如：`https://xxxx.ngrok-free.app`）
2. 前往 LINE Developer Console：https://developers.line.biz/console/
3. 選擇你的 Bot Channel
4. 進入「Messaging API」頁籤
5. 找到「Webhook URL」設定
6. 貼上 ngrok 的 HTTPS URL + `/`（例如：`https://xxxx.ngrok-free.app/`）
7. 點擊「Update」
8. 啟用「Webhook」開關

## 🔍 驗證與監控

### 查看 ngrok 狀態

在瀏覽器開啟：http://localhost:4040

可以看到：
- 轉送的 URL
- 收到的請求記錄
- 連線狀態

### 測試連線

1. 在 LINE Developer Console 點擊「Verify」按鈕測試連線
2. 或直接傳訊息給你的 Bot，看終端是否有收到 event 日誌

### 檢查 ngrok API

```bash
curl http://localhost:4040/api/tunnels
```

會回傳 JSON，包含 `public_url` 欄位。

## ⚠️ 注意事項

1. **兩個終端都要保持運行**：
   - 一個跑 Bot（`npm run dev`）
   - 一個跑 ngrok（`npm run ngrok`）
   - ` npm run dev npm run ngrok`

2. **免費版 URL 會變動**：
   - ngrok 免費版每次啟動 URL 會不同
   - 如果關閉 ngrok，需要重新設定 LINE 的 Webhook URL
   - 付費版可以設定固定網域

3. **PORT 設定**：
   - 預設轉發 PORT 3000
   - 可在 `.env` 設定 `PORT` 環境變數
   - 腳本會自動讀取 `PORT` 或使用預設值 3000

## 📝 專案檔案說明

- `start-ngrok.sh`：ngrok 啟動腳本
- `package.json`：已加入 `npm run ngrok` 指令

## 🎯 快速指令參考

```bash
# 啟動 Bot
npm run dev

# 啟動 ngrok（需在另一個終端）
npm run ngrok

# 檢查 ngrok 設定
ngrok config check

# 查看 ngrok 狀態（瀏覽器）
open http://localhost:4040
```

## 📅 設定日期

2025-01-XX（請自行填入日期）

## 🔑 Authtoken 位置

已設定在：`/Users/chouwill/Library/Application Support/ngrok/ngrok.yml`

---

**提示**：此筆記記錄了 ngrok 的基本設定與使用方式，方便日後參考。

