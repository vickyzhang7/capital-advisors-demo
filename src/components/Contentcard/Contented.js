import React, { useState } from 'react';
import './ContentCard.css';

const ContentCard = ({ title, content }) => {
  const [showContent, setShowContent] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => setShowContent(true)}
      onMouseLeave={() => setShowContent(false)}
      >
      <div className="card-title">{title}</div>
      {showContent && (
        <div className="hidden-content">
          {content}
        </div>
      )}
    </div>
  );
};

export default ContentCard;
