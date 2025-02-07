import React, { useState } from "react";

const RideDetailsPage = ({ userLocation }) => {
  const [riderInfo] = useState({
    name: "John Doe",
    vehicle: "Toyota Prius - XY1234",
    phone: "+1 234 567 890",
    latitude: 28.7041,
    longitude: 77.1025,
  });

  const getDistance = () => {
    // Placeholder distance calculation
    return "2.5 km away";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Your Ride is on the Way</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800">Rider Details</h2>
        <p className="text-lg font-medium text-gray-700 mt-2">{riderInfo.name}</p>
        <p className="text-gray-600">{riderInfo.vehicle}</p>
        <p className="text-gray-600">📞 {riderInfo.phone}</p>
        
        <div className="mt-4 p-4 bg-blue-100 rounded-lg">
          <p className="text-gray-700">Rider Location:</p>
          <p className="font-medium text-gray-900">Latitude: {riderInfo.latitude}</p>
          <p className="font-medium text-gray-900">Longitude: {riderInfo.longitude}</p>
          <p className="mt-2 text-green-600 font-bold">{getDistance()}</p>
        </div>
      </div>
    </div>
  );
};

export default RideDetailsPage;
