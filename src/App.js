import React, { useState } from 'react';
import './index.css';

function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const calcBmi = (event) => {
    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert('Please enter a valid Weight and Height');
    } else {
      let bmi = (weight / (height * height) * 703);
      setBmi(bmi.toFixed(1));

      if (bmi < 25) {
        setMessage('You are underweight');
      } else if (bmi >= 25 && bmi < 30) {
        setMessage('You have healthy weight');
      } else {
        setMessage('You are overweight');
      }

      setSubmitted(true);
    }
  };

  let imgSrc;

  if (bmi < 1) {
    imgSrc = null;
  } else {
    if (bmi < 25) {
      imgSrc = require('../src/assets/underweight.png');
    } else if (bmi >= 25 && bmi < 30) {
      imgSrc = require('../src/assets/healthy.png');
    } else {
      imgSrc = require('../src/assets/overweight.png');
    }
  }

  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="container">
        <div className="content-wrapper">
          <h2 className="center" style={{color: "#525834"}}>BMI Calculator</h2>
          <form onSubmit={calcBmi}>
            {!submitted && (
              <>
                <div>
                  <label>Weight (lbs)</label>
                  <input
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div>
                  <label>Height (in)</label>
                  <input
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div>
                  <button className="btn" type="submit">
                    Submit
                  </button>
                </div>
              </>
            )}
            <div>
              <button className="btn btn-outline" onClick={reload} type="button">
                Reload
              </button>
            </div>
          </form>

          {submitted && (
            <>
              <div className="center">
                <h3>Your BMI is: {bmi}</h3>
                <p>{message}</p>
              </div>

              <div className="img-container">
                <img src={imgSrc} alt="bmi result" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
