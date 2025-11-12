import "dotenv/config";
import linebot from "linebot";

import commandStock from "./commands/stock.js";

import template from "./templates/cardOption.json" with {type: 'json'}

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});
bot.on("follow", async (event) => {
  console.log("新用戶已加入");


  const mouldboard = JSON.parse(JSON.stringify(template));
  console.log(mouldboard);

  mouldboard.contents[0].body.contents.text

  console.log(mouldboard.contents[0].body.contents[0].text);

  // return mouldboard


  const result = await event.reply({
    type:'flex',
    altText:"歡迎使用財匯機器人",
    contents: mouldboard
  });

  return result
});

bot.on("message", async (event) => {
  // console.log(" 完整事件內容 event:\n", event);

  // console.log("\n 訊息本體 event.message:\n", event.message);

  // console.log("\n 使用者傳來的文字:\n", event.message.text);

  console.log("000000000000000000000--------");

if(event.message.type ==='text'){
  event.reply("這次開發測試：.....你好")
  const userText = event.message.text
  console.log("使用者點擊模板的文字",userText);

  const action1 = template.contents[0].footer.contents[0].action.text
  const action2 = template.contents[1].footer.contents[0].action.text

  console.log("--------1",action1);
  console.log("--------2",action2);

  if(userText=== action1){
    console.log("查詢匯率");
    event.reply("查詢匯率")

  }else if(userText === action2){
    console.log("進入股票");
    event.reply("進入股票")

    commandStock(event)


  }



}

});

bot.listen("/", process.env.PORT || 3000, () => {
  console.log("\n---------財匯機器人啟動-----\n");
});
