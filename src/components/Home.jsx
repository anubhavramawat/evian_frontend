import React, { useState, useEffect, useRef } from "react";
import MapView from "../components/mapcomponent/MapView"
import RideDetailsPage from "../components/mapcomponent/RideDetailsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//AIzaSyBeRVR_oODpdCjDbqyeH11sn07J9j6w6Gk
const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749, // Latitude (e.g., San Francisco)
  lng: -122.4194, // Longitude
};

//const socket = io("http://192.168.29.232:5000"); // Connect to the backend

const Home = () => {
  const [location, setLocation] = useState(null);
  const [userLocations, setUserLocations] = useState([]);

  // Send location to the server
  const sendLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(coords);
          socket.emit("send_location", coords);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // useEffect(() => {
  //   // Listen for location updates from other users
  //   socket.on("receive_location", (location) => {
  //     console.log(location);
  //     setUserLocations((prevLocations) => [...prevLocations, location]);
  //   });
  //   return () => socket.off("receive_location");
  // }, []);

  return (
    <div>
      <MapView location={location} userLocations={userLocations} sendLocation={sendLocation}/>
      <RideDetailsPage/>
    </div>
    // <>
    //  <Router>
    //   <Routes>
    //     <Route path="/" element={<MapView
    //      location={location}
    //       userLocations={userLocations}
    //      sendLocation={sendLocation}
    //    />} />
    //     <Route path="/RideDetailsPage" element={<RideDetailsPage />} />
    //   </Routes>
    // </Router>
    // </>

    // <div className="h-screen flex flex-col">
      
    //   <MapView
    //     location={location}
    //     userLocations={userLocations}
    //     sendLocation={sendLocation}
    //   />
    // </div>
  );
};

export default Home;