import axios from "axios";
// import stockUse from "../templates/stockUse.json" with  {type:'json'}
export default async (userStr) => {
  console.log("使用者輸入：",userStr);




  async function  searchStock(userStr){
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
      const price = await axios.get("https://api.finmindtrade.com/api/v4/data?", {
        params: {
          dataset: "TaiwanStockPrice",
          data_id: userStr,
          start_date: "2025-11-07",
          end_date: "2025-11-07",
          token: token,
        },
      });

      console.log("name", name);
      console.log("price", price);

      let [nameRes, priceRes] = await Promise.all([name, price]);

      console.log("nameRes 股票代號、名稱", nameRes.data);

      console.log("priceRes 價格", priceRes.data);


      console.log(typeof nameRes);

      const concatData = nameRes.data.data.concat(priceRes.data.data);

      console.log("合併後", concatData);
    } catch (error) {
      console.log(error);
    }
  }
searchStock(userStr)
};
