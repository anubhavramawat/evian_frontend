import React, { useState } from "react";
import "../External_css/PhoneOtp.css"
import { Link } from "react-router-dom";
import { verifyOtp } from "./ApiRequests";

function OtpInput({ phone, onSubmit }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    const otpArray = [...otp];
    otpArray[index] = value;
    setOtp(otpArray);

    // Auto focus on the next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    verifyOtp(otpCode)
    // if (otpCode.length === 6) {
    //   onSubmit(otpCode);
    // } else {
    //   alert("Please enter a valid OTP.");
    // }

  };

  return (
    <div className="card">
      <h2>OTP Verification</h2>
      <p>Enter the code we sent to {phone}</p>
      <form onSubmit={handleSubmit}>
        <div className="otp-group">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="otp-input"
            />
          ))}
        </div>
        <button type="submit" className="btn">
          Submit
          {/* <a href="/form">Submit</a> */}
        </button>
      </form>
      <p className="resend-link">Didn't receive the OTP? <a href="#">Resend</a></p>
    </div>
  );
}

export default OtpInput;