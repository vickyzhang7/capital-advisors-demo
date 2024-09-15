import React from 'react'
import './Teampage.css'
import Teamcard from '../../components/Teamcard/Teamcard'


const Teampage = () => {
  const teamMembers = [
      {
          name: 'Weiqi Zhang',
          title: 'Co-Founder and CEO',
          imageUrl: require('../../assets/images/Teammember1.png'),
          linkedinUrl: 'https://www.linkedin.com/in/weiqi997/',
          githubUrl: 'https://github.com/vickyzhang7',
      },
      {
          name: 'Vicky Zhang',
          title: 'Co-Founder and CTO',
          imageUrl: require('../../assets/images/Teammember2.png'),
          linkedinUrl: 'https://www.linkedin.com/in/weiqi997/',
          githubUrl: 'https://github.com/vickyzhang7',
      },
      {
        name: 'Weiqi',
        title: 'Web Development',
        imageUrl: require('../../assets/images/Teammember3.png'),
        linkedinUrl: 'https://www.linkedin.com/in/weiqi997/',
        githubUrl: 'https://github.com/vickyzhang7',
    },
    {
      name: 'Vicky',
      title: 'Business',
      imageUrl: require('../../assets/images/Teammember4.png'),
      linkedinUrl: 'https://www.linkedin.com/in/weiqi997/',
      githubUrl: 'https://github.com/vickyzhang7',
  },
  ];

  return (
      <div className="team-page">
          <h1 className="team-page__title">Team</h1>
          <h2 className="team-page__subtitle">About Us</h2>
          <div className="team-page__members">
              {teamMembers.map((member, index) => (
                  <Teamcard key={index} {...member} />
              ))}
          </div>
      </div>
  );
};

export default Teampage
