#!/bin/bash

# ngrok 啟動腳本
# 用途：將本地 Bot 轉發到公網，讓 LINE 平台可以發送 webhook

PORT=${PORT:-3000}

echo "🚀 啟動 ngrok，轉發本地 PORT $PORT..."
echo "📝 提示：請確保你的 Bot 已經在 PORT $PORT 上運行"
echo ""

# 檢查是否已設定 authtoken
if ! ngrok config check > /dev/null 2>&1; then
    echo "⚠️  尚未設定 ngrok authtoken"
    echo ""
    echo "請先執行以下步驟："
    echo "1. 前往 https://dashboard.ngrok.com/get-started/your-authtoken"
    echo "2. 註冊/登入並複製你的 authtoken"
    echo "3. 執行：ngrok config add-authtoken <YOUR_TOKEN>"
    echo ""
    exit 1
fi

# 啟動 ngrok
ngrok http $PORT

