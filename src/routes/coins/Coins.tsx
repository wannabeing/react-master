import styled from "styled-components";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { PacmanLoader } from "react-spinners";
import { useQuery } from "react-query";
import { getCoinList } from "../../api";
import { useSetRecoilState } from "recoil";
import { darkThemeAtom } from "../../atoms";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
`;
const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinList = styled.ul`
  width: 100%;
`;
const CoinImg = styled.img`
  width: 4vw;
`;
const Coin = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.accentColor};
  }
`;
const DarkDiv = styled.div`
  position: absolute;
  right: 10%;
`;

interface IData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const imgApiUrl = "https://cryptocurrencyliveprices.com/img/";
  const { isLoading, data } = useQuery<IData[]>("getCoinList", getCoinList);
  const setDarkTheme = useSetRecoilState(darkThemeAtom);

  return (
    <Container>
      <Helmet>
        <title>COIN</title>
      </Helmet>
      <Header>
        <h1>COIN</h1>
        <DarkDiv>
          <button onClick={() => setDarkTheme((prev) => !prev)}>
            다크모드
          </button>
        </DarkDiv>
      </Header>

      <Body>
        {isLoading ? (
          <PacmanLoader />
        ) : (
          <CoinList>
            {data?.slice(0, 100).map((coin) => (
              <Link
                key={coin.id}
                to={{
                  pathname: `/coin/${coin.id}`,
                  state: {
                    name: coin.name,
                    rank: coin.rank,
                  },
                }}
              >
                <Coin>
                  <CoinImg
                    src={`${imgApiUrl}${coin.id}.png`}
                    alt="코인이미지"
                  />
                  <span>{coin.name}</span>
                  <span>&rarr;</span>
                </Coin>
              </Link>
            ))}
          </CoinList>
        )}
      </Body>
    </Container>
  );
}

export default Coins;
