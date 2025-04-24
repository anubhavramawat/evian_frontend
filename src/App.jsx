import { useEffect, useState } from 'react'
import PhoneInput from './components/PhoneInput'
import OtpInput from './components/OtpInput'
import "./index.css"
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProfileForm from './components/ProfileForm';
import CaptainOrUser from './components/CaptainOrUser';
import captain from './assets/captain.png'
import rider from './assets/user.webp'
import AboutUser from './components/AboutUser';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import RideDetailsPage from './components/mapcomponent/RideDetailsPage';
import DriverLocation from './components/mapcomponent/DriverLocation';
import Approve from './components/mapcomponent/Approve';
import AddPartner from './components/AddPartner';

function App() {

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({});

  const location = useLocation(); // Get the current route

  // Determine if styles should be applied
  const shouldApplyStyles = location.pathname !== '/home' && location.pathname !== '/confirm' && location.pathname !== '/driver';

  const handlePhoneSubmit = (phoneNumber) => {
    setPhone(phoneNumber);
    setStep(2);
    console.log("Sending OTP to:", phoneNumber);
  };

  const handleOtpSubmit = (otpCode) => {
    setOtp(otpCode);
    console.log("Verifying OTP:", otpCode);
    //alert("OTP Verified Successfully!");
    if (window.confirm("OTP Verified Successfully!")) {
      window.location.href = "/form"; // Replace with your desired URL
  }
  };

  return (
    <div className={shouldApplyStyles ? "styled-container" : ""}>
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
          {/* <CaptainOrUser image={captain} name={"Captain"}/> */}
        </div>}
        />
        <Route path='/form' element={<ProfileForm name={["Rider","Captain"]} setFormData={setFormData} />} />
        <Route path='/about' element={<AboutUser formData={formData} />}/>
        <Route path='/menu' element={<Sidebar/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/confirm' element={<RideDetailsPage/>}/>
        {/* <Route path='/driver' element={<DriverLocation/>}/> */}
        <Route path='/approve' element={<Approve/>}/>
        <Route path='/addpartner' element={<AddPartner/>}/>
      </Routes>
      </div>
  )
}

export default function Root(){
  return(
    <Router>
      <App/>
    </Router>
  )
}