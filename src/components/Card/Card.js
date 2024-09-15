import React from 'react';
import { Card as AntdCard, Row, Col} from 'antd';
import RiseIcon from '../../assets/icons/rise.svg';
import FallIcon from '../../assets/icons/fall.svg';

import './Card.css';

const Card = ({
  title,
  imgUrl,
  propertyType,
  price,
  marketCap,
  capRate,
  priceChange,
  onClick,
  button, 
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) => {
  return (
    <div className="card-container">
      <AntdCard
        style={{
          borderColor: '#f0f0f0',
        }}
        hoverable
        cover={<img alt={title} src={imgUrl} />}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
      <div className="card-word">
        <Row style={{ marginTop: '10px' }}>
          <span className="property-type">Property Type: {propertyType}</span>
        </Row>
        <Row>
          <Col span={12} className="value-container">
            <span className="value">${Number(price).toLocaleString()}</span>
            <span className="label">Price/Token</span>
          </Col>
          <Col span={12} className="value-container" style={{ alignItems: 'flex-end' }}>
            <span className="value">${Number(marketCap).toLocaleString()}</span>
            <span className="label">Market Cap</span>
          </Col>
          <Col span={12} className="value-container">
            <span className="value">{(capRate * 100).toFixed(2)}%</span>
            <span className="label">Cap Rate</span>
          </Col>
          <Col span={12} className="value-container" style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <div>
              {priceChange >= 0 ? <img src={RiseIcon} alt="rise" /> : <img src={FallIcon} alt="fall" />}
              <span style={{ color: priceChange >= 0 ? '#1FAA60' : '#EA4646', marginLeft: '3px' }}>
                {(priceChange * 100).toFixed(2)}%
              </span>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
        {button}
        </Row>
        </div>
              </AntdCard>
    </div>
  );
};

export default Card;
