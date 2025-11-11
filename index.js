import "dotenv/config";
import linebot from "linebot";

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

bot.on("message", (event) => {
  console.log(" 完整事件內容 event:\n", event);

  console.log("\n 訊息本體 event.message:\n", event.message);

  console.log("\n 使用者傳來的文字:\n", event.message.text);

  // if(event.message.type ==='text'){

  // }
});

bot.listen("/", process.env.PORT || 3000, () => {
  console.log("\n---------財匯機器人啟動-----\n");
});
