import { useQuery } from "react-query";
import { getCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { title } from "process";

interface ChartProps {
  coinID: string;
}

interface IChartInfo {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const ChartWrapper = styled.div`
  width: 100%;
`;

function TapChart({ coinID }: ChartProps) {
  const { isLoading: chartLoading, data: chartInfo } = useQuery<IChartInfo[]>(
    ["chartInfo", coinID],
    () => getCoinHistory(coinID)
  );
  return (
    <ChartWrapper>
      {chartLoading ? (
        "LOADING"
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: [
                {
                  x: 1538778600000,
                  y: [6629.81, 6650.5, 6623.04, 6633.33],
                },
              ],
            },
          ]}
          options={{
            chart: {
              width: "100%",
            },
            title: {
              align: "left",
              text: coinID,
            },
            xaxis: {
              type: "datetime",
            },
          }}
        />
      )}
    </ChartWrapper>
  );
}
export default TapChart;
