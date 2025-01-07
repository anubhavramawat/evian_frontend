import { useEffect, useState } from 'react'
import PhoneInput from './components/PhoneInput'
import OtpInput from './components/OtpInput'
import "./style.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileForm from './components/ProfileForm';
import CaptainOrUser from './components/CaptainOrUser';
import captain from './assets/captain.png'
import rider from './assets/user.webp'
import AboutUser from './components/AboutUser';
import Sidebar from './components/Sidebar';


function App() {

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({});

  const handlePhoneSubmit = (phoneNumber) => {
    setPhone(phoneNumber);
    setStep(2);
    console.log("Sending OTP to:", phoneNumber);
  };

  const handleOtpSubmit = (otpCode) => {
    setOtp(otpCode);
    console.log("Verifying OTP:", otpCode);
    alert("OTP Verified Successfully!");
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <div className="container">
            {step === 1 ? (
              <PhoneInput onSubmit={handlePhoneSubmit} />
            ) : (
              <OtpInput phone={phone} onSubmit={handleOtpSubmit} />
            )}
          </div>
        } />
        <Route path='/choose' element={
          <div>
          <CaptainOrUser image={rider} name={"Rider"}/>
          <CaptainOrUser image={captain} name={"Captain"}/>
        </div>}
        />
        <Route path='/form' element={<ProfileForm name={["Rider","Captain"]} setFormData={setFormData} />} />
        {console.log(formData)}
        <Route path='/about' element={<AboutUser formData={formData} />}/>
        {console.log(formData)}

        <Route path='/menu' element={<Sidebar/>}/>
      </Routes>
      </Router>
  )
}

export default App
