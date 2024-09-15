import React, { useState } from 'react';
import axios from 'axios';
import './Contactpage.css'; // Import the CSS file for styling

const Contactpage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Choose one', // default value
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Define API URL based on the environment
  const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://capital-advisors-demo.com/api/contact' 
    : 'http://localhost:5001/api/contact';

  const solutionsItems = ['Choose one','Cash Investments', 'Risk Management', 'Debt Finance Consulting'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiUrl, formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const closeModal = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      subject: 'Choose one',
      message: '',
    });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="contact-input"
          />
        </label>
        
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="contact-input"
          />
        </label>
        
        <label>
          Solutions:
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="contact-input"
          >
            {solutionsItems.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="contact-textarea"
          ></textarea>
        </label>
        
        <button type="submit" className="contact-button">
          Send
        </button>
      </form>
      {submitted && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>Thank you for contacting us!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contactpage;
