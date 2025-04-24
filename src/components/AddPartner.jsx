import React, { useState } from "react";
import { addpartner } from "./ApiRequests";
import { useNavigate } from "react-router-dom";

function AddPartner() {

  const [inputs, setInputs] = useState({
    patner_name: "",
    lastname: "",
    adhar_number: "",
    gender: "",
    Address: "",
    status:"",
    rating:"",
    phone:"",
    license_number:"",
    DOB:"",
    profile_picture:null,
    current_lat:"",
    current_lng:""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    //console.log("Changed:", name, "Value:", value);

    setInputs((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value, // Handles both text and file inputs
      //[name]: type === "file" ? files[0] : name === "rating" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    addpartner(inputs)
    navigate("/home");
  };

  const [loading, setLoading] = useState(false);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Update state with latitude and longitude
        setInputs((prevInputs) => ({
          ...prevInputs,
          current_lat: latitude.toString(),
          current_lng: longitude.toString(),
          Address: `Lat: ${latitude}, Lon: ${longitude}` // Keeping Address as well
        }));
        },
        (error) => console.error("Geolocation error:", error)
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl h-screen p-4">
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="patner_name"
            value={inputs.patner_name}
            onChange={handleChange}
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="patner_name"
            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            First name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="lastname"
            value={inputs.lastname}
            onChange={handleChange}
            id="floating_last_name"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="lastname"
            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Last name
          </label>
        </div>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="phone"
          value={inputs.phone}
          onChange={handleChange}
          id="floating_phone"
          className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone number
        </label>
      </div>
      
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="adhar_number"
          value={inputs.adhar_number}
          onChange={handleChange}
          id="floating_adhar_number"
          className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="adhar_number"
          className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Adhar number
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="license_number"
          value={inputs.license_number}
          onChange={handleChange}
          id="floating_license_number"
          className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="license_number"
          className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          License number
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
      <input
          type="date"
          name="DOB"
          value={inputs.DOB}
          onChange={handleChange}
          id="floating_DOB"
          className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="DOB"
          className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          DOB
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label
          className="block mb-2 text-sm font-medium text-gray-300"
          htmlFor="profile_picture"
        >
          Upload Profile Picture
        </label>
        <input
          className="block w-full text-sm mb-6 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="profile_picture"
          name="profile_picture"
          type="file"
          onChange={handleChange}
          accept="image/*"
        ></input>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <select
          id="gender"
          name="gender"
          value={inputs.gender}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option defaultValue>Gender</option>
          <option value="Male">Male</option>
          <option value="shemale">Female</option>
        </select>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <select
          id="status"
          name="status"
          value={inputs.status}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option defaultValue>Status</option>
          <option value="onDuty">on Duty</option>
          <option value="offDuty">off Duty</option>
        </select>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <select
          id="rating"
          name="rating"
          value={inputs.rating}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option defaultValue>Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="Address"
          value={inputs.Address}
          onChange={handleChange}
          id="floating_repeat_password"
          className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="Address"
          className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Address
        </label>
        <button
        type="button"
        onClick={fetchLocation}
        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
      >
        {loading ? "Fetching..." : "Use Current Location"}
      </button>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full lg:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>

    </form>
  );
}

export default AddPartner;
