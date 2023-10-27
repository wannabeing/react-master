const paprikaURL = "https://api.coinpaprika.com/v1";
const historyURL = "https://ohlcv-api.nomadcoders.workers.dev";

export async function getCoinList() {
  return await (await fetch(`${paprikaURL}/coins`)).json();
}

export async function getCoinInfo(coinID: string) {
  return await (await fetch(`${paprikaURL}/coins/${coinID}`)).json();
}

export async function getCoinPriceInfo(coinID: string) {
  return await (await fetch(`${paprikaURL}/tickers/${coinID}`)).json();
}

export async function getCoinHistory(coinID: string) {
  return await (await fetch(`${historyURL}/?coinId=${coinID}`)).json();
}
