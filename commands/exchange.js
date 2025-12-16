import axios from "axios";
import stockUse from "../templates/stockUse.json" with { type: "json" };
import stockResult from "../templates/stockResult.json" with { type: "json" };
import dayjs from "dayjs";
//import dayjs from 'dayjs' // ES 2015
dayjs().format();
export default async (userStr, event) => {
  console.log("使用者輸入：", userStr);

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
  const nowTime = `${dayjs().format("YYYY")}-${dayjs().format("MM")}-${dayjs().format("DD")}`;

  console.log("\n");

  async function searchExchange(userStr) {
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
          },
        }
      );

      console.log("外匯", exchangeData.data);
    } catch (error) {
      console.log(error);
    }
  }

  return await searchExchange(userStr);
};
