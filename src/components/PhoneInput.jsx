import React, { useState } from "react";
//import "../External_css/PhoneOtp.css"
import { getOtp} from './ApiRequests'


function PhoneInput({ onSubmit }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      onSubmit(phoneNumber);
    } else {
      alert("Please enter a valid phone number.");
    }
    //login('emilys', 'emilyspass')
    getOtp(phoneNumber, onSubmit)
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md text-center">
      <h2 className="mb-2 text-xl text-blue-600">Welcome to Evian</h2>
      <p>We will send you a One Time Password (OTP) on this mobile number</p>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 my-5">
          <span className="bg-gray-100 p-2 rounded-md">+91</span>
          <input
            className="flex-1 p-2 border border-gray-300 rounded-md"
            type="text"
            placeholder="Enter mobile no."
            maxLength="10"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white border-none px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
          Get OTP
        </button>
      </form>
      <p className="mt-2 text-sm">Already have an account? <a className="text-blue-600 no-underline" href="#">Log in</a></p>
    </div>
  );
}

export default PhoneInput;
