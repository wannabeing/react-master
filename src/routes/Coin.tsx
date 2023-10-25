import { useParams } from "react-router-dom";

interface CoinParams {
  coinID: string;
}
function Coin() {
  const { coinID } = useParams<CoinParams>();

  console.log(coinID);

  return <h1>CoinID테스트 : {coinID}</h1>;
}

export default Coin;
