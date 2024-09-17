import React, { useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import Modal from 'react-modal';
import './Riskmanagement.css';

const Riskmanagement = () => {
  const initialAnswers = {
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: ''
  };

  const [riskScore, setRiskScore] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [answers, setAnswers] = useState(initialAnswers);

  const handleChange = (event) => {
    setAnswers({
      ...answers,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Check if all answers are selected
    const unansweredQuestions = Object.values(answers).some(answer => answer === '');
  
    if (unansweredQuestions) {
      alert("Please answer all the questions before submitting.");
      return;
    }
  
    const score = calculateRiskScore();
    setRiskScore(score);
    setModalIsOpen(true);
    setAnswers(initialAnswers); // Reset answers to initial state
  };
  

  const calculateRiskScore = () => {
    let totalScore = 0;
    Object.values(answers).forEach(answer => {
      if (answer === 'low') totalScore += 10;
      if (answer === 'medium') totalScore += 30;
      if (answer === 'high') totalScore += 50;
    });
    return totalScore / 5; // Normalize score out of 100
  };

  const getAdvice = () => {
    if (riskScore <= 30) return "Based on your score, we recommend a conservative investment strategy with lower risk assets.";
    if (riskScore <= 70) return "You have a moderate risk tolerance. A balanced portfolio with a mix of assets would be suitable for you.";
    return "You have a high risk tolerance. You can explore more aggressive investment strategies for potentially higher returns.";
  };

  return (
    <div className="risk-management-container">
      <h1 className="title">Risk Management Test</h1>
      <form className="risk-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>1. How much risk can you tolerate?</label>
          <select name="q1" value={answers.q1} onChange={handleChange} className="select-input">
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>2. What is your investment horizon?</label>
          <select name="q2" value={answers.q2} onChange={handleChange} className="select-input">
            <option value="">Select</option>
            <option value="low">Short-term</option>
            <option value="medium">Medium-term</option>
            <option value="high">Long-term</option>
          </select>
        </div>

        <div className="form-group">
          <label>3. How do you react to market fluctuations?</label>
          <select name="q3" value={answers.q3} onChange={handleChange} className="select-input">
            <option value="">Select</option>
            <option value="low">Very worried</option>
            <option value="medium">Somewhat worried</option>
            <option value="high">Not worried</option>
          </select>
        </div>

        <div className="form-group">
          <label>4. How important is liquidity to you?</label>
          <select name="q4" value={answers.q4} onChange={handleChange} className="select-input">
            <option value="">Select</option>
            <option value="low">Very important</option>
            <option value="medium">Somewhat important</option>
            <option value="high">Not important</option>
          </select>
        </div>

        <div className="form-group">
          <label>5. What is your primary investment goal?</label>
          <select name="q5" value={answers.q5} onChange={handleChange} className="select-input">
            <option value="">Select</option>
            <option value="low">Preserve capital</option>
            <option value="medium">Steady income</option>
            <option value="high">Grow wealth</option>
          </select>
        </div>

        <div className="form-group">
          <label>6. How do you handle investment losses?</label>
          <select name="q6" value={answers.q6} onChange={handleChange} className="select-input">
            <option value="">Select</option>
            <option value="low">Sell immediately</option>
            <option value="medium">Wait and observe</option>
            <option value="high">Buy more</option>
          </select>
        </div>

        <div className="form-group">
          <label>7. How would you describe your financial knowledge?</label>
          <select name="q7" value={answers.q7} onChange={handleChange} className="select-input">
            <option value="">Select</option>
            <option value="low">Basic</option>
            <option value="medium">Intermediate</option>
            <option value="high">Advanced</option>
          </select>
        </div>

        <div className="form-group">
          <label>8. How diversified is your current portfolio?</label>
          <select name="q8" value={answers.q8} onChange={handleChange} className="select-input">
            <option value="">Select</option>
            <option value="low">Not diversified</option>
            <option value="medium">Moderately diversified</option>
            <option value="high">Well diversified</option>
          </select>
        </div>

        <div className="form-group">
          <label>9. How do you approach financial planning?</label>
          <select name="q9" value={answers.q9} onChange={handleChange} className="select-input">
            <option value="">Select</option>
            <option value="low">Short-term planning</option>
            <option value="medium">Medium-term planning</option>
            <option value="high">Long-term planning</option>
          </select>
        </div>

        <div className="form-group">
          <label>10. How do you feel about debt in your investment strategy?</label>
          <select name="q10" value={answers.q10} onChange={handleChange} className="select-input">
            <option value="">Select</option>
            <option value="low">Avoid at all costs</option>
            <option value="medium">Manageable debt is okay</option>
            <option value="high">Use debt to leverage returns</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>

      <Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  className="modal"
  overlayClassName="modal-overlay"
>
  <h2 className="modal-title">Your Risk Score: {riskScore}</h2>
  <GaugeChart id="gauge-chart" className='chart' nrOfLevels={3} percent={riskScore / 100} />
  <p className="advice">{getAdvice()}</p>
  <button onClick={() => setModalIsOpen(false)} className="close-button">Close</button>
</Modal>

    </div>
  );
};

export default Riskmanagement;
