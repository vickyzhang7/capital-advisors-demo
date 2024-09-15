import React from 'react';
import './Ourstory.css';

const Ourstory = () => {
  return (
    <div className="our-story-container">
      <h1 className="our-story-title">Our Story</h1>
      <section className="our-story-content">
        <h2>Who We Are</h2>
        <p>We are a forward-thinking investment firm specializing in Capital Advisory, Real Estate, and Corporate Finance.</p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to empower individuals and businesses by making financial investment accessible, transparent, and beneficial to everyone.
        </p>

        <h2>Our Journey</h2>
        <p>
          What started as a boutique investment firm has evolved into a trusted name in the financial sector.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>Expertise: Decades of experience in financial markets.</li>
          <li>Client-Centric Approach: Tailored solutions for unique financial goals.</li>
          <li>Proven Results: Hundreds of clients achieving financial success.</li>
        </ul>

        <h2>Looking to the Future</h2>
        <p>
          At WZ Investment, we’re always looking ahead. As the financial landscape changes, so do we.
        </p>
        
      </section>
      <button className="cta-button">Join Us</button>
    </div>
  );
};

export default Ourstory;
