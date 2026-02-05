import axios from "axios";
import exchangeUse from "../templates/exchangeRateUse.json" with { type: "json" };
import exchangeResult from "../templates/exchangeRateResult.json" with { type: "json" };
import dayjs from "dayjs";
//import dayjs from 'dayjs' // ES 2015
dayjs().format();
export default async (userStr, event, queryDate = null) => {
  console.log("使用者輸入：", userStr);
  console.log("查詢日期參數：", queryDate);

  // console.log("stockUse", stockUse);

  console.log("\n");
  console.log("\n");
  console.log("\n");
  console.log("\n");
  var now = dayjs();

  // console.log(
  //   "nowTime",
  //   `${dayjs().format("YYYY")}-${dayjs().format("MM")}-${dayjs().format("DD")}`
  // );

  const nowTime = // 查詢日期
    queryDate ||
    `${dayjs().format("YYYY")}-${dayjs().format("MM")}-${dayjs().format("DD")}`;
  console.log("實際使用的查詢日期：", nowTime);
  let todayWeekDay = dayjs().day();

  // function isWeekend() {
  //   console.log("今天幾日", nowDay);

  //   if (todayWeekDay == 0 || todayWeekDay == 6) {
  //     console.log(parseInt(nowDay-2));
  //     console.log(typeof nowDay);
  //   } else {
  //     console.log(typeof nowDay);
  //     console.log("今天為星期一到日");

  //   }
  // }
  // isWeekend();

  console.log("\n");

  async function searchExchange(userStr) { // 查詢匯率
    try {
      const token = process.env.FINMIND_API_TOKEN;
      console.log(
        "----------LINE使用者目前輸入的內容-----------------",
        userStr
      );

      const exchangeData = await axios.get(
        "https://api.finmindtrade.com/api/v3/data",
        {
          params: {
            dataset: "TaiwanExchangeRate",
            data_id: userStr.toUpperCase(),
            date: nowTime,
            // date: "2025-12-15",
          },
        }
      );
      console.log("今天日期", typeof todayWeekDay);

      console.log("外匯", exchangeData.data.data);
      const resultTemplate = JSON.parse(JSON.stringify(exchangeResult)); // 結果模板

      if (exchangeData.data.data.length === 0) { // 無資料處理
        console.log("今天沒有資料");
        resultTemplate.body.contents[0].text = `匯率:${userStr.toUpperCase()}`;
        resultTemplate.body.contents[1].text = `日期：${nowTime}`;
        resultTemplate.body.contents[6].text = `目前非外匯交易時間`;
        const result = await event.reply({
          type: "flex",
          altText: "000",
          contents: resultTemplate,
        });
        return result;
      } else {
        resultTemplate.body.contents[0].text = `匯率：${exchangeData.data.data[0].currency} / TWD`;
        resultTemplate.body.contents[1].text = `日期：${exchangeData.data.data[0].date}`;
        resultTemplate.body.contents[2].text = `即期買入：${exchangeData.data.data[0].spot_buy}`;
        resultTemplate.body.contents[3].text = `即期賣出：${exchangeData.data.data[0].spot_sell}`;
        resultTemplate.body.contents[4].text = `現金買入：${exchangeData.data.data[0].cash_buy}`;
        resultTemplate.body.contents[5].text = `現金賣出：${exchangeData.data.data[0].cash_sell}`;
        resultTemplate.body.contents[6].text = ` `;

        const result = await event.reply({
          type: "flex",
          altText: "000",
          contents: resultTemplate,
        });
        return result;
      }
    } catch (error) {
      console.error("查詢匯率錯誤:", error);
      // 確保錯誤時也要回應使用者
      try {
        await event.reply({
          type: "text",
          text: "查詢匯率時發生錯誤，請稍後再試",
        });
      } catch (replyError) {
        console.error("回覆錯誤:", replyError);
      }
      throw error; // 重新拋出錯誤，讓上層知道
    }
  }

  try {
    return await searchExchange(userStr);
  } catch (error) {
    // 錯誤已在 searchExchange 中處理
    return null;
  }
};
