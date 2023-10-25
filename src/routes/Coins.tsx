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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinList = styled.ul`
  width: 100%;
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

  useEffect(() => {
    (async () => {
      const json = await (
        await fetch("https://api.coinpaprika.com/v1/coins")
      ).json();

      setData(json.slice(0, 100));
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
              <Link key={coin.id} to={coin.id}>
                <Coin>
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
