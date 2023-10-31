import { useQuery } from "react-query";
import { getCoinHistory } from "../../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

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
        ""
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                chartInfo?.map((chart) => ({
                  x: chart.time_open,
                  y: [
                    parseFloat(chart.open),
                    parseFloat(chart.high),
                    parseFloat(chart.low),
                    parseFloat(chart.close),
                  ],
                })) ?? [],
            },
          ]}
          options={{
            chart: {
              width: "100%",
              toolbar: {
                tools: {
                  selection: false,
                  pan: false,
                },
              },
            },
            title: {
              align: "left",
              text: coinID.toUpperCase(),
            },
            xaxis: {
              type: "datetime",
              labels: {
                datetimeFormatter: {
                  minute: "HH:mm",
                },
              },
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </ChartWrapper>
  );
}
export default TapChart;
