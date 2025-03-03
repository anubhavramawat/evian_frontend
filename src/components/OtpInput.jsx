import React, { useState } from "react";
//import "../External_css/PhoneOtp.css"
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
    <div className="bg-white p-5 rounded-lg shadow-md text-center">
      <h2 className="mb-2 text-xl text-blue-600">OTP Verification</h2>
      <p>Enter the code we sent to {phone}</p>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2 my-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-10 h-12 text-center text-xl border border-gray-300 rounded-md"
            />
          ))}
        </div>
        <button type="submit" className="bg-blue-600 text-white border-none px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
          Submit
          {/* <a href="/form">Submit</a> */}
        </button>
      </form>
      <p className="mt-2 text-sm">Didn't receive the OTP? <a className="text-blue-600 no-underline" href="#">Resend</a></p>
    </div>
  );
}

export default OtpInput;