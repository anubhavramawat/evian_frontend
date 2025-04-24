import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import DetailsPanel from "./DetailsPanel";
import { useNavigate } from "react-router-dom";
import { getlocation } from "../ApiRequests";
import Sidebar from "../Sidebar";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const initialCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

const MapView = () => {
  const [currentLocation, setCurrentLocation] = useState(initialCenter);
  const [currentAddress, setCurrentAddress] = useState("Fetching address...");
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [searchedAddress, setSearchedAddress] = useState(null);
  const [directions, setDirections] = useState(null);
  const [bikeMarkers, setBikeMarkers] = useState([]);
  const [mapInstance, setMapInstance] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const autocompleteRef = useRef(null);
  const [panelHeight, setPanelHeight] = useState(0); // Panel height for drag behavior
  const [dragging, setDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const geocodeLatLng = (coords, setAddressCallback) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: coords }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddressCallback(results[0].formatted_address);
      } else {
        console.error("Error fetching address:", status);
      }
    });
  };
  const handleConfirmRide = () => {
    getlocation(currentLocation, searchedLocation);
    navigate("/confirm");
  };
  const locateCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(coords);
          geocodeLatLng(coords, setCurrentAddress); // Auto-fill the current address field
          setSearchedLocation(null);
          setDirections(null);
          setShowDetails(false);
          generateRandomBikeMarkers(coords);

          if (mapInstance) {
            mapInstance.panTo(coords);
            mapInstance.setZoom(15);
          }
        },
        (error) => {
          console.error("Error fetching location", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const generateRandomBikeMarkers = (center) => {
    const radius = 0.02; // Approx. ~2km in lat/lng
    const bikeMarkers = Array.from({ length: 10 }, () => ({
      lat: center.lat + (Math.random() - 0.5) * radius,
      lng: center.lng + (Math.random() - 0.5) * radius,
    }));
    setBikeMarkers(bikeMarkers);
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const destination = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setSearchedLocation(destination);
      geocodeLatLng(destination, setSearchedAddress);

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: currentLocation,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);

            const bounds = new window.google.maps.LatLngBounds();
            result.routes[0].overview_path.forEach((point) =>
              bounds.extend(point)
            );
            mapInstance.fitBounds(bounds);
            setShowDetails(true);
          } else {
            console.error("Error fetching directions", status);
          }
        }
      );
    }
  };
  const handleDragStart = (e) => {
    setDragging(true);
    const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    setStartY(clientY);
    setStartHeight(panelHeight);
  };

  // Handle drag movement
  const handleDrag = (e) => {
    if (!dragging) return;
    const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
    const diffY = startY - clientY;
    const newHeight = Math.min(Math.max(startHeight + diffY, 0), 300); // Set height limits (min: 0, max: 300px)
    setPanelHeight(newHeight);
  };

  // Handle the end of drag
  const handleDragEnd = () => {
    setDragging(false);

    // Snap to collapsed or expanded state
    if (panelHeight > 200) {
      setPanelHeight(400); // Fully expanded
    } else {
      setPanelHeight(60); // Fully collapsed
    }
  };

  return (
    <>
      {/* <div className="">
      <button onClick={()=>isOpen(true)}>click me</button>
    </div>
    {setIsOpen && <Sidebar/>} */}
      <div className="relative z-40">
        <LoadScript
          googleMapsApiKey="AIzaSyD3HAi9LH89IpmQ6s1euT1bHymBRuqxCmQ"
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={13}
            onLoad={(map) => setMapInstance(map)}
            options={{
              disableDefaultUI: true,
              mapTypeControl: false,
            }}
          >
            {currentLocation && (
              <Marker
                position={currentLocation}
                title="Drag to adjust location"
                draggable={true} // Enable drag for marker
                onDragEnd={(e) => {
                  const newCoords = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  };
                  setCurrentLocation(newCoords); // Update the new location
                  geocodeLatLng(newCoords, setCurrentAddress); // Reverse geocode for address
                }}
              />
            )}
            {bikeMarkers.map((bike, index) => (
              <Marker
                key={index}
                position={bike}
                icon={{
                  url: "https://maps.google.com/mapfiles/kml/shapes/cycling.png",
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                title={`Bike ${index + 1}`}
              />
            ))}
            {searchedLocation && (
              <Marker position={searchedLocation} title="Destination" />
            )}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
          {/* Search Bar */}
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-72">
            {/* Destination Input */}
            <Autocomplete
              onLoad={(ref) => (autocompleteRef.current = ref)}
              onPlaceChanged={onPlaceChanged}
            >
              <div className="relative w-full">
                {/* <button onClick={()=>setIsOpen(true)}>
                  <svg
                    className="w-5 h-5 absolute -left-9 top-1/2 transform -translate-y-1/2 text-black-300"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button> */}
                {/* {isOpen && <Sidebar/>} */}

                <input
                  type="text"
                  placeholder="Enter destination"
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 shadow-md focus:outline-none"
                />
              </div>
            </Autocomplete>

            {/* Current Location Input */}
            <input
              type="text"
              value={currentAddress}
              onChange={(e) => setCurrentAddress(e.target.value)} // Editable fallback
              className="w-full h-10 px-3 rounded-lg border border-gray-300 shadow-md bg-gray-100 focus:outline-none"
              placeholder="Fetching current location..."
              readOnly={!dragging} // Allow typing only if required
            />
          </div>
          {/* Locate Button */}
          <button
            className="absolute bottom-16 right-5 rounded-full w-12 h-12 flex items-center justify-center shadow-lg bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold"
            onClick={locateCurrentPosition}
          >
            📍
          </button>
          {showDetails && (
            <DetailsPanel
              currentAddress={currentAddress}
              searchedAddress={searchedAddress}
              panelHeight={panelHeight}
              setPanelHeight={setPanelHeight}
              setShowDetails={setShowDetails}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              handleConfirmRide={handleConfirmRide}
            />
          )}
        </LoadScript>
      </div>
    </>
  );
};

export default MapView;
