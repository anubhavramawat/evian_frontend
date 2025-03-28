import React, { useEffect, useState } from "react";

const Approve = () => {
  const [rideRequest, setRideRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch ride request from API
  const fetchRideRequest = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/getRideRequest"); // Replace with your API URL

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      console.log("API Response:", data); // Debugging log

      if (data?.ride) {
        setRideRequest(data.ride); // Store actual ride request
      } else {
        throw new Error("No ride data from API");
      }
    } catch (error) {
      console.error("Error fetching ride request:", error);

      // Check if locations exist in localStorage
      const storedPickup = localStorage.getItem("pickup") || "Connaught Place, Delhi";
      const storedDrop = localStorage.getItem("drop") || "Indira Gandhi Airport, Delhi";
      const searchedLocation = JSON.parse(localStorage.getItem("searchedLocation"))

      // *Ensure Dummy Data is Applied*
      setRideRequest({
        pickup: storedPickup,
        drop: storedDrop,
        fare: 250,
        lat: searchedLocation.lat,
        lng: searchedLocation.lng,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRideRequest(); // Initial fetch
    const interval = setInterval(fetchRideRequest, 5000); // Poll every 5s
    return () => clearInterval(interval); // Cleanup
  }, []);

  const handleAccept = () => {
    alert("Ride Accepted ✅");
    setRideRequest(null);
  };

  const handleDecline = () => {
    alert("Ride Declined ❌");
    setRideRequest(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {rideRequest ? (
        <RideRequest requestData={rideRequest} onAccept={handleAccept} onDecline={handleDecline} />
      ) : (
        <p className="text-gray-500">Waiting for ride requests...</p>
      )}
    </div>
  );
};

function RideRequest({ requestData, onAccept, onDecline }) {
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (timeLeft <= 0) {
      onDecline();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    const audio = new Audio("/ride_request_sound.mp3");
    audio.play();
    if (navigator.vibrate) navigator.vibrate(500);
  }, []);

  return (
    
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-2xl p-4 w-80 border border-gray-200">
      <h2 className="text-lg font-semibold">New Ride Request</h2>
      <p className="text-gray-600">Pickup: {requestData.pickup}</p>
      <p className="text-gray-600">Drop: {requestData.drop}</p>
      <p className="text-gray-600">Fare: ₹{requestData.fare}</p>

      {/* Google Maps for Pickup Location */}
      <iframe
  src={`https://www.google.com/maps?q=${requestData.lat},${requestData.lng}&output=embed`}
  className="w-full h-40 rounded-lg mt-2"
></iframe>

      <div className="flex justify-between items-center mt-3">
        <span className="text-red-500 font-bold">{timeLeft}s</span>

        <div className="flex gap-3">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={onAccept}>
            Accept
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={onDecline}>
            Decline
          </button>
        </div>
      </div>
    </div>
    
  );
}

export default Approve