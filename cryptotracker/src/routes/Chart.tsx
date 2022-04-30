import React from 'react';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from './api';
import ApexChart from 'react-apexcharts';

interface ChartProps {
  coinId: string;
}
interface IHistorical {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );
  console.log(data?.map((price) => price.close));
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type='line'
          series={[
            {
              name: 'Price',
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            chart: {
              toolbar: { show: false },
              height: 500,
              width: 500,
              background: 'transparent',
            },
            grid: { show: false },
            xaxis: {
              type: 'datetime',
              categories: data?.map((price) => price.time_close),
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: { show: false },
            },
            yaxis: { show: false },
            fill: {
              type: 'gradient',
              gradient: {
                gradientToColors: ['blue'],
                stops: [0, 100],
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
            colors: ['red'],
            theme: { mode: 'dark' },
            stroke: {
              curve: 'smooth',
              width: 4,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
