import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const DriverLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const dummyPlace = { lat:28.64233024079532, lng:77.29558244348873 }; // Example: New Delhi Coordinates

  // Get User's Current Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          alert("Geolocation failed or permission denied.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // Request Directions
  const fetchDirections = useCallback(() => {
    if (currentLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: dummyPlace,
          destination: currentLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);

            //Extract Distance
            const route = result.routes[0];
            const leg = route.legs[0];
            setDistance(leg.distance.text);

          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [currentLocation, isLoaded]);

  // Trigger Directions Fetch on Location Change
  useEffect(() => {
    fetchDirections();
  }, [fetchDirections]);

  return (
    <div>
        <h2 className="text-red-500">Distance from Dummy Place to Your Location</h2>
      {distance && (
        <h3 className="text-red-500">
          Distance: <strong>{distance}</strong>
        </h3>
      )}
        <LoadScript onLoad={() => setIsLoaded(true)} googleMapsApiKey="AIzaSyBeRVR_oODpdCjDbqyeH11sn07J9j6w6Gk">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "600px" }}
        center={dummyPlace}
        zoom={10}
      >
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </LoadScript>
    </div>
    
    
  );
};

export default DriverLocation;