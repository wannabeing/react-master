import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import styled from "styled-components";
import TapPrice from "./TapPrice";
import TapChart from "./TapChart";

interface CoinParams {
  coinID: string;
}
interface ICoinInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface ICoinPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 20px auto;
  border: 2px solid ${(props) => props.theme.textColor};
  border-radius: 20px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;

  span:first-child {
    color: ${(props) => props.theme.accentColor};
    padding-right: 5px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TapWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const Taps = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 10px 0;
  gap: 10px;
`;
const Tap = styled.div<{ isActive: boolean }>`
  text-align: center;
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  padding: 10px 20px;
  border-radius: 15px;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

function Coin() {
  const { coinID } = useParams<CoinParams>();
  const { state } = useLocation<ICoinInfo>();
  const [coinInfo, setCoinInfo] = useState<ICoinInfo>();
  const [coinPrice, setCoinPrice] = useState<ICoinPrice>();
  const [loading, setLoading] = useState(true);
  const priceMatch = useRouteMatch("/:coinID/price");
  const chartMatch = useRouteMatch("/:coinID/chart");
  console.log(priceMatch);

  useEffect(() => {
    (async () => {
      const coinInfo = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`)
      ).json();
      const priceInfo = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`)
      ).json();

      setCoinInfo(coinInfo);
      setCoinPrice(priceInfo);
      setLoading(false); // loading 해제
    })();
  }, [coinID]);

  return (
    <>
      {loading ? (
        <PacmanLoader />
      ) : (
        <Container>
          <Header>
            <Link to="/">&larr;</Link>
            <div>
              <span>RANK {state?.rank ? state.rank : coinInfo?.rank} | </span>
              <span> {state?.name ? state.name : coinInfo?.name}</span>
            </div>
          </Header>
          <Body>
            <div>
              {coinInfo?.description
                ? coinInfo.description
                : "testtesttesttesttesttesttesttesttesttesttesttesttest"}
            </div>
            <TapWrapper>
              <Taps>
                <Link to={`/${coinID}/price`}>
                  <Tap isActive={priceMatch ? true : false}>PRICE</Tap>
                </Link>
                <Link to={`/${coinID}/chart`}>
                  <Tap isActive={chartMatch ? true : false}>CHART</Tap>
                </Link>
              </Taps>

              <Switch>
                <Route path={`/${coinID}/price`}>
                  <TapPrice />
                </Route>
                <Route path={`/${coinID}/chart`}>
                  <TapChart />
                </Route>
              </Switch>
            </TapWrapper>
          </Body>
        </Container>
      )}
    </>
  );
}

export default Coin;
