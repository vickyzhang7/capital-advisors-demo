import React from 'react';
import './Landing.css';
import landingImage from '../../assets/images/Landing.png'; 
import ContentCard from '../../components/Contentcard/Contented';

const Landing = () => {
  
  return (
    <div className="landing-container">
      <div className="header-section">
        <div className="header-content">
          <div className="header-title">
            Grow Your Wealth with Expert Capital Advisory
          </div>
          <div className="header-description">
            <ul>
              <li><strong>Hassle-Free Investments:</strong> Diversify your portfolio with minimal effort, managed by seasoned capital advisors.</li>
              <li><strong>Tailored Investment Plans:</strong> Choose from real estate projects aligned with your financial goals and risk tolerance.</li>
              <li><strong>Community-Driven Opportunities:</strong> Join investor communities, share insights, and access exclusive opportunities.</li>
              <li><strong>Comprehensive Portfolio Management:</strong> Track and optimize your real estate investments on a user-friendly platform.</li>
            </ul>
          </div>
          <button
            className="scroll-button"
            onClick={() => {
                            const scrollTarget = document.getElementById('scrollTarget');
                            if (scrollTarget) {
                                scrollTarget.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    >
            Learn More
          </button>
        </div>
        <img src={landingImage} alt="landing" className="header-image" />
      </div>

      <div id="scrollTarget" className="card-container">
        <ContentCard
          title="Comprehensive Advisory"
          content="Leverage expert guidance with WZ Investment’s capital advisory services to optimize both your active and passive investment strategies."
        />
        <ContentCard
          title="Diversified Investment Options"
          content="Explore a wide range of asset classes, from equities and bonds to emerging market opportunities, all tailored to meet your financial goals."
        />
        <ContentCard
          title="Data-Driven Strategies"
          content="Benefit from data-driven insights and predictive analytics to make informed decisions and stay ahead in a dynamic investment landscape."
        />
        <ContentCard
          title="Global Reach"
          content="Access international markets and opportunities, ensuring that your portfolio is globally diversified and positioned for growth."
        />
      </div>

      <footer className="footer">
        <div className="footer-text">Weiqi Zhang Copyright 2024  </div>
        <div className="footer-text">Investment Made Easy!</div>
      </footer>
    </div>
  );
};

export default Landing;
