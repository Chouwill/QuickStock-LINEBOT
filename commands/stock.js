import axios from "axios";
import stockUse from "../templates/stockUse.json" with { type: "json" };
import stockResult from "../templates/stockResult.json" with { type: "json" };
import dayjs from "dayjs";
//import dayjs from 'dayjs' // ES 2015
dayjs().format();
export default async (userStr, event, queryDate = null) => {
  console.log("使用者輸入：", userStr);
  console.log("查詢日期參數：", queryDate);

  console.log("stockUse", stockUse);

  console.log("\n");
  console.log("\n");
  console.log("\n");
  console.log("\n");
  var now = dayjs();

  // console.log(
  //   "nowTime",
  //   `${dayjs().format("YYYY")}-${dayjs().format("MM")}-${dayjs().format("DD")}`
  // );
  
  const nowTime = queryDate || `${dayjs().format("YYYY")}-${dayjs().format("MM")}-${dayjs().format("DD")}`; // 查詢日期
  console.log("實際使用的查詢日期：", nowTime);

  console.log("\n");

  async function searchStock(userStr) { // 查詢股票
    try {
      const token = process.env.FINMIND_API_TOKEN;
      console.log(
        "----------LINE使用者目前輸入的內容-----------------",
        userStr
      );

      const name = await axios.get("https://api.finmindtrade.com/api/v3/data", {
        params: {
          dataset: "TaiwanStockInfo",
          data_id: userStr,
        },
      });
      const price = await axios.get(
        "https://api.finmindtrade.com/api/v4/data?",
        {
          params: {
            dataset: "TaiwanStockPrice",
            data_id: userStr,
            start_date: nowTime,
            end_date: nowTime,
            // start_date: "2025-12-13",
            // end_date: "2025-12-13",
            token: token,
          },
        }
      );

      console.log("name", name);
      console.log("price", price);

      let [nameRes, priceRes] = await Promise.all([name, price]);

      console.log("nameRes 股票代號、名稱", nameRes.data);

      console.log("priceRes 價格", priceRes.data);

      console.log(typeof nameRes);

      const concatData = nameRes.data.data.concat(priceRes.data.data); // 合併資料

      console.log("合併後", concatData);

      const resultTemplate = JSON.parse(JSON.stringify(stockResult)); // 結果模板

      if (concatData.length === 0) { // 無資料處理
        console.log("今天沒有資料");
        resultTemplate.body.contents[0].text = `匯率:${userStr}`;
        resultTemplate.body.contents[1].text = `日期：${nowTime}`;
        resultTemplate.body.contents[7].text = `目前非股票交易時間`;
        const result = await event.reply({
          type: "flex",
          altText: "000",
          contents: resultTemplate,
        });
        return result;
      } else if (!concatData[1]) { // 資料檢查
        console.log("資料不完整，concatData[1] 不存在");
        console.log("今天沒有資料");
        resultTemplate.body.contents[0].text = `股票:${userStr}`;
        resultTemplate.body.contents[1].text = `日期：${nowTime}`;
        resultTemplate.body.contents[7].text = `目前非股票交易時間`;
        const result = await event.reply({
          type: "flex",
          altText: "000",
          contents: resultTemplate,
        });
        return result;
      } else {
        resultTemplate.body.contents[0].text = `${concatData[0].stock_name + concatData[1].stock_id}`;
        resultTemplate.body.contents[1].text = `日期:${concatData[1].date}`;
        resultTemplate.body.contents[2].text = `收盤價:${concatData[1].close}`;
        resultTemplate.body.contents[3].text = `開盤價:${concatData[1].open}`;
        resultTemplate.body.contents[4].text = `成交量:${concatData[1].open}`;
        resultTemplate.body.contents[5].text = `最高價:${concatData[1].max}`;
        resultTemplate.body.contents[6].text = `最低價:${concatData[1].min}`;
        resultTemplate.body.contents[7].text = ` `;

        const result = await event.reply({
          type: "flex",
          altText: "000",
          contents: resultTemplate,
        });
        return result;
      }

      // console.log("股票代號＝＝＝＝＝＝",concatData[0].stock_name +concatData[0].stock_name )
      // console.log(
      //   "stockUse標題",
      //   stockUse.body.contents[0].text +
      //     concatData[0].stock_name +
      //     concatData[0].stock_id
      // );

      // const stockResultTemplate =
      //   stockResult.body.contents[0].text +
      //   concatData[0].stock_name +
      //   concatData[0].stock_id;

      // const result = await event.reply({
      //   type: "flex",
      //   altText: "000",
      //   contents: resultTemplate,
      // });
      // return result;
    } catch (error) {
      console.error("查詢股票錯誤:", error);
      // 確保錯誤時也要回應使用者
      try {
        await event.reply({
          type: "text",
          text: "查詢股票時發生錯誤，請稍後再試",
        });
      } catch (replyError) {
        console.error("回覆錯誤:", replyError);
      }
      throw error; // 重新拋出錯誤，讓上層知道
    }
  }
  try {
    return await searchStock(userStr);
  } catch (error) {
    // 錯誤已在 searchStock 中處理
    return null;
  }
};
