import React, { useState, useEffect } from 'react';
import Stockchart from '../../components/Stockchart/Stockchart';

const Stockmarket = () => {
  const [stockSymbol, setStockSymbol] = useState('AAPL');  
  const [stockData, setStockData] = useState({ dates: [], prices: [] });

  const fetchStockData = async (symbol) => {
    try {
      const response = await fetch(`https://capital-advisors-demo.onrender.com/stock/${symbol}`);
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };
  
  // http://127.0.0.1:5001/stock/${symbol}`
  //https://capital-advisors-demo.onrender.com/stock/${symbol}

  
  useEffect(() => {
    fetchStockData(stockSymbol);
  }, [stockSymbol]);

  const handleSelectChange = (event) => {
    setStockSymbol(event.target.value);  
  };

  return (
    <div>
      <div className="stock-market-container">
        <h2>Stock Market Investment</h2>
        <p>
          Stock market investment is a popular way to build wealth and diversify your investment portfolio. At WZ Investment, we offer a range of stock market investment opportunities for our clients.
        </p>
        <p>
          Whether you’re looking to invest in individual stocks, mutual funds, or exchange-traded funds (ETFs), we have the expertise to help you achieve your financial goals.
        </p>
        <p>
          Our team of investment professionals will guide you through the investment process, from stock selection to portfolio management. We’ll help you make informed decisions and maximize your returns.
        </p>
        <p>
          Ready to invest in the stock market? Contact us today to get started.
        </p>

        <div>
          <label htmlFor="stock-select">Select Stock: </label>
          <select id="stock-select" value={stockSymbol} onChange={handleSelectChange}>
            <option value="AAPL">Apple (AAPL)</option>
            <option value="GOOGL">Google (GOOGL)</option>
            <option value="AMZN">Amazon (AMZN)</option>
            <option value="TSLA">Tesla (TSLA)</option>
          </select>
        </div>

        
        <Stockchart stockData={stockData} stockSymbol={stockSymbol} />
      </div>
    </div>
  );
};

export default Stockmarket;
