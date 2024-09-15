import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cashinvestment.css';

const Cashinvestment = () => {
  const navigate = useNavigate();
  const investments = [
    {
      title: "real-estate",
      description: "Explore our investment opportunities in Real Estate. Click the button below to learn more.",
    },
    {
      title: "stock-market",
      description: "Explore our investment opportunities in Stock Market. Click the button below to learn more.",
    }
  ];

  const handleInvestClick = (title) => {
    navigate(`/cash-investments/${title}`);
  };
  

  return (
    <div className="cash-investment-container">
      {investments.map((investment, index) => (
        <div key={index} className="cash-investment-item">
          <h2 className="cash-investment-title">{investment.title}</h2>
          <p className="cash-investment-description">{investment.description}</p>
          <button
            className="cash-investment-button"
            onClick={() => handleInvestClick(investment.title)}
          >
            Invest in {investment.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cashinvestment;
