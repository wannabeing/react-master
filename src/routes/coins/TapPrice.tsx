import { useQuery } from "react-query";
import { getCoinPriceInfo } from "../../api";
import styled from "styled-components";
import { useEffect, useState } from "react";

interface PriceProps {
  coinID: string;
}
interface IPriceInfo {
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

const isIncludeMinus = (value: number | undefined) => {
  if (value) {
    return value.toString().includes("-") ? true : false;
  }
};

const Body = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const PriceWrapper = styled.div`
  padding: 10px;
`;
const PriceInfo = styled.span<{ isUp?: boolean; isDown?: boolean }>`
  color: ${(props) =>
    props.isUp ? "red" : props.isDown ? "#1763b6" : "black"};
  font-size: 15px;
  font-weight: bold;
  margin-left: 5px;
`;

function TapPrice({ coinID }: PriceProps) {
  const { isLoading: priceLoading, data: priceInfo } = useQuery<IPriceInfo>(
    ["priceInfo", coinID],
    () => getCoinPriceInfo(coinID)
  );
  const [bornDay, setBornDay] = useState<string>(""); // 태어난지
  const [price, setPrice] = useState<string>(""); // 가격(한화)

  useEffect(() => {
    const currentDate = new Date();

    if (!priceLoading && priceInfo) {
      // born-date
      const bornDate = new Date(priceInfo.first_data_at);
      const bornDiff = Number(currentDate) - Number(bornDate);
      const bornData = (bornDiff / (1000 * 60 * 60 * 24))
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setBornDay(bornData);

      // price
      const usd = priceInfo.quotes.USD.price.toFixed(0);
      const krw = (Number(usd) * 1350).toString();
      setPrice(krw);
    }
  }, [priceInfo, priceLoading]);

  return (
    <>
      {priceLoading ? (
        ""
      ) : (
        <Body>
          <PriceWrapper>
            태어난지 <PriceInfo>{`${bornDay}일`}</PriceInfo>
          </PriceWrapper>
          <PriceWrapper>
            지금은{" "}
            <PriceInfo>{`${price.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            )}원`}</PriceInfo>{" "}
            (1코인 기준)
          </PriceWrapper>
          <PriceWrapper>
            화성에서 얼마나 머냐면{" "}
            <PriceInfo
              isUp={
                !isIncludeMinus(priceInfo?.quotes.USD.percent_from_price_ath)
              }
              isDown={isIncludeMinus(
                priceInfo?.quotes.USD.percent_from_price_ath
              )}
            >{`${priceInfo?.quotes.USD.percent_from_price_ath}%`}</PriceInfo>{" "}
            (역대가)
          </PriceWrapper>
          <PriceWrapper>
            최근 24시간 거래량은{" "}
            <PriceInfo
              isUp={
                !isIncludeMinus(priceInfo?.quotes.USD.volume_24h_change_24h)
              }
              isDown={isIncludeMinus(
                priceInfo?.quotes.USD.volume_24h_change_24h
              )}
            >{`${priceInfo?.quotes.USD.volume_24h_change_24h}%`}</PriceInfo>
          </PriceWrapper>

          <PriceWrapper>
            어제보다{" "}
            <PriceInfo
              isUp={!isIncludeMinus(priceInfo?.quotes.USD.percent_change_24h)}
              isDown={isIncludeMinus(priceInfo?.quotes.USD.percent_change_24h)}
            >{`${priceInfo?.quotes.USD.percent_change_24h}% (${
              priceInfo?.quotes.USD.percent_change_24h
                ? (
                    Number(price) *
                    (priceInfo.quotes.USD.percent_change_24h / 100)
                  )
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : ""
            }원)`}</PriceInfo>
          </PriceWrapper>

          <PriceWrapper>
            1개월 전보다{" "}
            <PriceInfo
              isUp={!isIncludeMinus(priceInfo?.quotes.USD.percent_change_30d)}
              isDown={isIncludeMinus(priceInfo?.quotes.USD.percent_change_30d)}
            >{`${priceInfo?.quotes.USD.percent_change_30d}% (${
              priceInfo?.quotes.USD.percent_change_30d
                ? (
                    Number(price) *
                    (priceInfo.quotes.USD.percent_change_30d / 100)
                  )
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : ""
            }원)`}</PriceInfo>
          </PriceWrapper>

          <PriceWrapper>
            1년 전보다{" "}
            <PriceInfo
              isUp={!isIncludeMinus(priceInfo?.quotes.USD.percent_change_1y)}
              isDown={isIncludeMinus(priceInfo?.quotes.USD.percent_change_1y)}
            >{`${priceInfo?.quotes.USD.percent_change_1y}% (${
              priceInfo?.quotes.USD.percent_change_1y
                ? (
                    Number(price) *
                    (priceInfo.quotes.USD.percent_change_1y / 100)
                  )
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : ""
            }원)`}</PriceInfo>
          </PriceWrapper>
        </Body>
      )}
    </>
  );
}

export default TapPrice;
