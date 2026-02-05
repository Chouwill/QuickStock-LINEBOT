import "dotenv/config";
import linebot from "linebot";

import commandStock from "./commands/stock.js";
import commandExchange from "./commands/exchange.js";

import template from "./templates/cardOption.json" with { type: "json" };
import stockUse from "./templates/stockUse.json" with { type: "json" };
import exchangeUse from "./templates/exchangeRateUse.json" with { type: "json" };
import selectDateTemplate from "./templates/selectDay.json" with { type: "json" };
import dayjs from "dayjs";
dayjs().format();

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const userState = {}; // 使用者狀態

bot.on("message", async (event) => {
  try {
    // 只處理文字訊息
    if (event.message.type !== "text") {
      await event.reply({ type: "text", text: "請輸入文字訊息" });
      return;
    }

    console.log(event);
    console.log(event.message.text);

    const action1 = template.contents[0].footer.contents[0].action.text; // 匯率
    const action2 = template.contents[1].footer.contents[0].action.text; // 股票

    const userId = event.source.userId; // 使用者ID

    if (event.message.text === action1) {
    console.log("進入匯率功能");

    userState[userId] = { // 初始化狀態
      type: "exchange",
      code: "",
      date: "",
    };
    console.log("使用者狀態:", userState[userId]);

    const exchangeBoard = JSON.parse(JSON.stringify(exchangeUse));

    console.log(exchangeBoard);

    const result = await event.reply({
      type: "flex",
      altText: "XXXX",
      contents: exchangeBoard,
    });

    return result;
  } else if (event.message.text === action2) {
    console.log("進入股票功能");

    userState[userId] = { // 初始化狀態
      type: "stock",
      code: "",
      date: "",
    };
    console.log("使用者狀態:", userState[userId]);

    const stockBoard = JSON.parse(JSON.stringify(stockUse));

    console.log(stockBoard);

    const result = await event.reply({
      type: "flex",
      altText: "XXXX",
      contents: stockBoard,
    });

    return result;
  } else {
    if (!userState[userId]) { // 檢查狀態
      console.log("使用者尚未選擇功能");
      // 引導使用者選擇功能
      const welcomeBoard = JSON.parse(JSON.stringify(template));
      await event.reply({
        type: "flex",
        altText: "請選擇功能",
        contents: welcomeBoard,
      });
      return;
    }

    const currentState = userState[userId];

    if (currentState.type === "exchange") {
      console.log("使用者輸入的匯率資訊", event.message.text);

      currentState.code = event.message.text; // 儲存代號
      console.log("更新後的使用者狀態:", userState[userId]);

      const selectDayBoard = JSON.parse(JSON.stringify(selectDateTemplate));

      console.log(selectDayBoard);

      const dayResult = await event.reply({
        type: "flex",
        altText: "XXXX",
        contents: selectDayBoard,
      });

      return dayResult;
    } else if (currentState.type === "stock") {
      console.log("使用者輸入的股票資訊", event.message.text);

      currentState.code = event.message.text; // 儲存代號
      console.log("更新後的使用者狀態:", userState[userId]);

      const selectDayBoard = JSON.parse(JSON.stringify(selectDateTemplate));

      console.log(selectDayBoard);

      const dayResult = await event.reply({
        type: "flex",
        altText: "XXXX",
        contents: selectDayBoard,
      });

      return dayResult;
    }
  } catch (error) {
    console.error("訊息處理錯誤:", error);
    try {
      await event.reply({ type: "text", text: "發生錯誤，請稍後再試" });
    } catch (replyError) {
      console.error("回覆錯誤:", replyError);
    }
  }
});

bot.on("postback", async (event) => { // 處理回傳
  try {
    const action = event.postback.data;
    const date = event.postback.params?.date;
    const userId = event.source.userId;

    console.log("postback action:", action);
    console.log("postback date:", date);
    console.log("使用者 ID:", userId);

    if (!userState[userId]) {
      console.log("錯誤：使用者狀態不存在");
      // 重新初始化狀態並引導選擇功能
      const welcomeBoard = JSON.parse(JSON.stringify(template));
      await event.reply({
        type: "flex",
        altText: "請重新選擇功能",
        contents: welcomeBoard,
      });
      return;
    }

    const currentState = userState[userId];
    console.log("目前使用者狀態:", currentState);

    if (action === "action=queryToday") { // 查詢今日
      const nowTime = `${dayjs().format("YYYY")}-${dayjs().format("MM")}-${dayjs().format("DD")}`;

      console.log("執行查詢今日,當日是：", nowTime);

      currentState.date = nowTime; // 儲存日期
      console.log("更新後的使用者狀態:", userState[userId]);

      if (currentState.type === "exchange") {
        console.log(
          "查詢今日匯率:",
          currentState.code,
          "日期:",
          currentState.date
        );
        await commandExchange(currentState.code, event, currentState.date);
      } else if (currentState.type === "stock") {
        console.log(
          "查詢今日股票:",
          currentState.code,
          "日期:",
          currentState.date
        );
        await commandStock(currentState.code, event, currentState.date);
      }
    } else if (action === "action=selectDate") { // 選擇日期
      console.log("執行查詢指定日期:", date);

      currentState.date = date; // 儲存日期
      console.log("更新後的使用者狀態:", userState[userId]);

      if (currentState.type === "exchange") {
        console.log(
          "查詢指定日期匯率:",
          currentState.code,
          "日期:",
          currentState.date
        );
        await commandExchange(currentState.code, event, currentState.date);
      } else if (currentState.type === "stock") {
        console.log(
          "查詢指定日期股票:",
          currentState.code,
          "日期:",
          currentState.date
        );
        await commandStock(currentState.code, event, currentState.date);
      }
    }
  } catch (error) {
    console.error("Postback 處理錯誤:", error);
    try {
      await event.reply({ type: "text", text: "發生錯誤，請稍後再試" });
    } catch (replyError) {
      console.error("回覆錯誤:", replyError);
    }
  }
});

bot.listen("/", process.env.PORT || 3000, () => {
  console.log("\n---------財匯機器人啟動-----\n");
});
