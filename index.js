import "dotenv/config";
import linebot from "linebot";

import commandStock from "./commands/stock.js";

import template from "./templates/cardOption.json" with { type: "json" };
import stockUse from "./templates/stockUse.json" with { type: "json" };

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

let selectTemplate = "";
let userTextValue = "";

// bot.on("follow", async (event) => {
//   console.log("新用戶已加入");

//   const mouldboard = JSON.parse(JSON.stringify(template));
//   console.log(mouldboard);

//   // mouldboard.contents[0].body.contents.text

//   console.log(mouldboard.contents[0].body.contents[0].text);

//   // return mouldboard

//   // 在被加入好友  發送模板
//   const result = await event.reply({
//     type: "flex",
//     altText: "歡迎使用財匯機器人",
//     contents: mouldboard,
//   });

//   return result;
// });

bot.on("message", async (event) => {
  // console.log(" 完整事件內容 event:\n", event);

  // console.log("\n 訊息本體 event.message:\n", event.message);

  console.log("\n 使用者傳來的文字:\n", event.message.text);

  console.log("000000000000000000000--------");

  if (event.message.type === "text") {
    // await  event.reply("這次開發測試：.....你好")
    userTextValue = event.message.text;
    console.log("使用者輸入的---文字", userTextValue);

    const action1 = template.contents[0].footer.contents[0].action.text;
    const action2 = template.contents[1].footer.contents[0].action.text;

    // console.log("--------1", action1);
    // console.log("--------2", action2);

    if (userTextValue === action1) {
      console.log("現在狀態：----查詢匯率");
      //await event.reply("查詢匯率")

      selectTemplate = action1; //儲存當前狀態在哪
    } else if (userTextValue === action2) {
      console.log("現在狀態：----進入股票");
      selectTemplate = action2; //儲存當前狀態在哪

      const stockBoard = JSON.parse(JSON.stringify(stockUse));

      console.log(stockBoard);

      const result = await event.reply({
        type: "flex",
        altText: "XXXX",
        contents: stockBoard,
      });

      return result;
    } else {
      if (selectTemplate === action1) {
        // TODO: 匯率查詢功能待實作
      } else if (selectTemplate === action2) {
        commandStock(userTextValue,event);

        console.log("使用者輸入的代號是", userTextValue);
      }
    }
  }
});

bot.listen("/", process.env.PORT || 3000, () => {
  console.log("\n---------財匯機器人啟動-----\n");
});
