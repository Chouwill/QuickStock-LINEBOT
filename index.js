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

// ========== 狀態管理：以 userId 為 key 儲存每個使用者的查詢狀態 ==========
// 結構範例：
// {
//   "U07fe1b96d1fc2215e1489820e97e51ad": {
//     type: "exchange",  // "exchange" 或 "stock"
//     code: "USD",       // 使用者輸入的代號
//     date: ""           // 查詢日期（空字串表示未選擇）
//   }
// }
const userState = {};

// 1.顯示預設股票/外匯選單

// 2.選曲選單---->進入對應的功能
bot.on("message", async (event) => {
  console.log(event);
  console.log(event.message.text);

  const action1 = template.contents[0].footer.contents[0].action.text; // 匯率
  const action2 = template.contents[1].footer.contents[0].action.text; // 股票

  const userId = event.source.userId; // 取得使用者 ID

  // 3.發送教學使用模板
  if (event.message.text === action1) {
    console.log("進入匯率功能");

    // 初始化或重置該使用者的狀態
    userState[userId] = {
      type: "exchange",
      code: "",
      date: "",
    };
    console.log("使用者狀態:", userState[userId]);

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

    // 初始化或重置該使用者的狀態
    userState[userId] = {
      type: "stock",
      code: "",
      date: "",
    };
    console.log("使用者狀態:", userState[userId]);

    const stockBoard = JSON.parse(JSON.stringify(stockUse));

    console.log(stockBoard);

    const result = await event.reply({
      //  發送股票引導模板
      type: "flex",
      altText: "XXXX",
      contents: stockBoard,
    });

    return result;

    // 4.第一次輸入：輸入代號
  } else {
    // 檢查使用者是否有選擇功能（匯率或股票）
    if (!userState[userId]) {
      console.log("使用者尚未選擇功能");
      return;
    }

    const currentState = userState[userId];

    // 第一次輸入：儲存代號並顯示日期選擇模板
    if (currentState.type === "exchange") {
      console.log("使用者輸入的匯率資訊", event.message.text);

      // 儲存使用者輸入的匯率代號（第一次輸入）
      currentState.code = event.message.text;
      console.log("更新後的使用者狀態:", userState[userId]);

      const selectDayBoard = JSON.parse(JSON.stringify(selectDateTemplate));

      console.log(selectDayBoard);

      const dayResult = await event.reply({
        //  發送日期選擇模板
        type: "flex",
        altText: "XXXX",
        contents: selectDayBoard,
      });

      return dayResult;
    } else if (currentState.type === "stock") {
      console.log("使用者輸入的股票資訊", event.message.text);

      // 儲存使用者輸入的股票代號（第一次輸入）
      currentState.code = event.message.text;
      console.log("更新後的使用者狀態:", userState[userId]);

      const selectDayBoard = JSON.parse(JSON.stringify(selectDateTemplate));

      console.log(selectDayBoard);

      const dayResult = await event.reply({
        //  發送日期選擇模板
        type: "flex",
        altText: "XXXX",
        contents: selectDayBoard,
      });

      return dayResult;
    }
  }
});

// 5.返回查詢資料模板

bot.on("postback", async (event) => {
  const action = event.postback.data;
  const date = event.postback.params?.date;
  const userId = event.source.userId; // 取得使用者 ID

  console.log("postback action:", action);
  console.log("postback date:", date);
  console.log("使用者 ID:", userId);

  // 檢查使用者狀態是否存在
  if (!userState[userId]) {
    console.log("錯誤：使用者狀態不存在");
    return;
  }

  const currentState = userState[userId];
  console.log("目前使用者狀態:", currentState);

  // 處理「直接查詢今日」（第二次選擇：選擇當日）
  if (action === "action=queryToday") {
    const nowTime = `${dayjs().format("YYYY")}-${dayjs().format("MM")}-${dayjs().format("DD")}`;

    console.log("執行查詢今日,當日是：", nowTime);

    // 更新狀態：儲存查詢日期（第二次選擇）
    currentState.date = nowTime;
    console.log("更新後的使用者狀態:", userState[userId]);

    // 根據類型執行查詢
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
  }
  // 處理「選擇日期」（第二次選擇：選擇其他日期）
  else if (action === "action=selectDate") {
    console.log("執行查詢指定日期:", date);

    // 更新狀態：儲存查詢日期（第二次選擇）
    currentState.date = date;
    console.log("更新後的使用者狀態:", userState[userId]);

    // 根據類型執行查詢
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
});

// -----------------------------------------------------------
// 開始監聽LINE
bot.listen("/", process.env.PORT || 3000, () => {
  console.log("\n---------財匯機器人啟動-----\n");
});
