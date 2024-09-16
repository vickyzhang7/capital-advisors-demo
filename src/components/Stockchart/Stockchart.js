import React, { useEffect, useRef } from 'react';
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale, 
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale, 
  Title,
  Tooltip,
  Legend
);

const Stockchart = ({ stockData, stockSymbol }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockData.dates,
        datasets: [
          {
            label: `${stockSymbol} Stock Price`,
            data: stockData.prices,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [stockData, stockSymbol]);

  return <canvas ref={chartRef}></canvas>;
};

export default Stockchart;
