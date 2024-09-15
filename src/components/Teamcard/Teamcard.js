import React from 'react'
import './Teamcard.css'

const Teamcard = ({ name, title, imageUrl, linkedinUrl, githubUrl}) => {
  return (
      <div className="team-member">
          <img src={imageUrl} alt={`${name}`} className="team-member__image" />
          <h3 className="team-member__name">{name}</h3>
          <p className="team-member__title">{title}</p>
          <div className="team-member__links">
              {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
              {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>}
          </div>
      </div>
  );
};

export default Teamcard

