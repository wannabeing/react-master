import Helmet from "react-helmet";
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
import { useQuery } from "react-query";
import { getCoinInfo } from "../api";

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
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.accentColor};
  }
`;

function Coin() {
  const { coinID } = useParams<CoinParams>();
  const { state } = useLocation<ICoinInfo>();
  const priceMatch = useRouteMatch("/:coinID/price");
  const chartMatch = useRouteMatch("/:coinID/chart");

  const { isLoading: infoLoading, data: coinInfo } = useQuery<ICoinInfo>(
    ["coinInfo", coinID],
    () => getCoinInfo(coinID)
  );

  return (
    <Container>
      <Helmet>
        <title>{coinID}</title>
      </Helmet>
      <Header>
        <Link to="/">&larr;</Link>
        <div>
          <span>RANK {state?.rank ? state.rank : coinInfo?.rank} | </span>
          <span> {state?.name ? state.name : coinInfo?.name}</span>
        </div>
      </Header>
      <Body>
        {infoLoading ? (
          <PacmanLoader />
        ) : (
          <>
            <div>{coinInfo?.description ? coinInfo.description : ""}</div>
            <TapWrapper>
              <Taps>
                <Link to={`/${coinID}/chart`}>
                  <Tap isActive={chartMatch ? true : false}>CHART</Tap>
                </Link>
                <Link to={`/${coinID}/price`}>
                  <Tap isActive={priceMatch ? true : false}>PRICE</Tap>
                </Link>
              </Taps>

              <Switch>
                <Route path={`/${coinID}/chart`}>
                  <TapChart coinID={coinID} />
                </Route>
                <Route path={`/${coinID}/price`}>
                  <TapPrice coinID={coinID} />
                </Route>
              </Switch>
            </TapWrapper>
          </>
        )}
      </Body>
    </Container>
  );
}

export default Coin;
