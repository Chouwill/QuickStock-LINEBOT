import axios from "axios";

export default async () => {
  try {
    const { stockData } = await axios.get(process.env.FINMIND_API_TOKEN);
    console.log(process.env.FINMIND_API_TOKEN);

    console.log("股票", stockData);
  } catch (error) {
    console.log(error);
  }
};
