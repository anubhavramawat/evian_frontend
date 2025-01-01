import React, { useState } from "react";
import "../External_css/PhoneOtp.css"


function PhoneInput({ onSubmit }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      onSubmit(phoneNumber);
    } else {
      alert("Please enter a valid phone number.");
    }
  };

  return (
    <div className="card">
      <h2>Welcome to Evian</h2>
      <p>We will send you a One Time Password (OTP) on this mobile number</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <span>+91</span>
          <input
            type="text"
            placeholder="Enter mobile no."
            maxLength="10"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Get OTP
        </button>
      </form>
      <p className="login-link">Already have an account? <a href="#">Log in</a></p>
    </div>
  );
}

export default PhoneInput;
