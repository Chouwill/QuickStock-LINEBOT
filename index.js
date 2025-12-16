import "dotenv/config";
import linebot from "linebot";

import commandStock from "./commands/stock.js";
import commandExchange from "./commands/exchange.js";

import template from "./templates/cardOption.json" with { type: "json" };
import stockUse from "./templates/stockUse.json" with { type: "json" };
import exchangeUse from "./templates/exchangeRateUse.json" with { type: "json" };

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

let selectTemplate = ""; // 儲存LINE使用者對話狀態
// let userTextValue = "";

// 1.顯示預設股票/外匯選單

// 2.選曲選單---->進入對應的功能
bot.on("message", async (event) => {
  console.log(event);
  console.log(event.message.text);

  const action1 = template.contents[0].footer.contents[0].action.text; // 匯率
  const action2 = template.contents[1].footer.contents[0].action.text; // 股票

  // 3.發送教學使用模板
  if (event.message.text === action1) {
    console.log("進入匯率功能");
    selectTemplate = action1; // 儲存目前在匯率狀態

    const exchangeBoard = JSON.parse(JSON.stringify(exchangeUse));

    console.log(exchangeBoard);

    const result = await event.reply({
      //  發送匯率引導模板
      type: "flex",
      altText: "XXXX",
      contents: exchangeBoard,
    });

    return result;
  } else if (event.message.text === action2) {
    console.log("進入股票功能");
    selectTemplate = action2; // 儲存目前在股票狀態

    const stockBoard = JSON.parse(JSON.stringify(stockUse));

    console.log(stockBoard);

    const result = await event.reply({
      //  發送股票引導模板
      type: "flex",
      altText: "XXXX",
      contents: stockBoard,
    });

    return result;

    // 4.輸入代號 開始查詢
  } else {
    if (selectTemplate === action1) {
      commandExchange(event.message.text, event);
      // TODO: 匯率查詢功能待實作
    } else if (selectTemplate === action2) {
      commandStock(event.message.text, event);

      console.log("使用者輸入的代號是", event.message.text);
    }
  }
});

// 5.返回查詢資料模板

// -----------------------------------------------------------
// 開始監聽LINE
bot.listen("/", process.env.PORT || 3000, () => {
  console.log("\n---------財匯機器人啟動-----\n");
});
