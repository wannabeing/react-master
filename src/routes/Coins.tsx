import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

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
    background-color: ${(props) => props.theme.accentColor};
  }
`;
const Title = styled.h1`
  /* color: ${(props) => props.theme.accentColor}; */
`;

interface DataInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [data, setData] = useState<DataInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = "https://cryptocurrencyliveprices.com/img/";

  useEffect(() => {
    (async () => {
      // const json = await (
      //   await fetch("https://api.coinpaprika.com/v1/coins")
      // ).json();

      // console.log(json);

      // setData(json.slice(0, 100));

      setData([
        {
          id: "btc-bitcoin",
          name: "Bitcoin",
          symbol: "BTC",
          rank: 1,
          is_new: false,
          is_active: true,
          type: "coin",
        },
        {
          id: "eth-ethereum",
          name: "Ethereum",
          symbol: "ETH",
          rank: 2,
          is_new: false,
          is_active: true,
          type: "coin",
        },
        {
          id: "hex-hex",
          name: "HEX",
          symbol: "HEX",
          rank: 3,
          is_new: false,
          is_active: true,
          type: "token",
        },
      ]);
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>COIN</Title>
      </Header>
      <Body>
        {loading ? (
          <PacmanLoader />
        ) : (
          <CoinList>
            {data.map((coin) => (
              <Link
                key={coin.id}
                to={{
                  pathname: coin.id,
                  state: {
                    name: coin.name,
                    rank: coin.rank,
                  },
                }}
              >
                <Coin>
                  <CoinImg src={`${apiUrl}${coin.id}.png`} alt="코인이미지" />
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
