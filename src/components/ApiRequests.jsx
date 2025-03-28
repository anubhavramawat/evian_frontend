import axios from 'axios';

//  export const login = async (username, password) => {
//   try {
//     // Make the POST request to the API
//     const response = await axios.post('https://dummyjson.com/auth/login', {
//       username,
//       password
//     });

//     // Extract the token from the response
//     const token = response.data.accessToken;

//     // Store the token in localStorage
//     localStorage.setItem('token', token);

//     console.log('Token saved successfully:', token);
//   } catch (error) {
//     console.error('Error occurred during login:', error.response ? error.response.data : error.message);
//   }
// };


export const getOtp = async(phoneNumber, onSubmit)=>{
  //e.preventDefault();

    if (phoneNumber.length === 10) {
      //setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v3.0/sendOtp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber: phoneNumber })
        });

        if (response.ok) {
          const data = await response.json();
          alert("OTP sent successfully!");
          console.log(data);
          //onSubmit(phoneNumber); // Proceed to OTP input
        } else {
          alert("Failed to send OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Please enter a valid phone number.");
    }
}


export const verifyOtp = async(otpCode)=>{
  if(otpCode.length==6){
    try {
      const response = await fetch('http://localhost:8080/api/v3.0/verifyOtp',{
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ otp: otpCode })
      })

      if(response.ok){
        const data = await response.json();
        console.log(data)
        const token = data.token
        localStorage.setItem('token', token);
        window.confirm("OTP Verified Successfully!")
        window.location.href = "/choose";
      }
      else{
        alert("Failed to verify OTP or Invalid otp. Please try again.")
      }
    } catch (error) {
      console.error("Error in verifying OTP:", error);
    }
  }
  else{
    console.log('Please enter a valid Otp.')
  }
}

const token=localStorage.getItem("token")

export const addUser = async(inputs)=>{
  try {
    const response = await fetch('http://localhost:8080/api/v1.0/updateUser',{
      method:"POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputs)
    })
    if(response.ok){
      const data = await response.json();
      console.log("updated data--",data);
    }
  } catch (error) {
    console.error("Error in updating data:", error);
  }
}


export const getUsersData = async()=>{
  try {
    const response = await fetch('http://localhost:8080/api/v1.0/getUserData', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }
    const data = await response.json()
    //console.log(data.Data)
    return data.Data
  } 
  catch (error) {
    console.error('Error fetching user data:', error);
      throw error;
  }
}


export const getlocation = async(currentLocation, searchedLocation)=>{
  console.log(currentLocation, searchedLocation)
  console.log(token);
  localStorage.setItem("searchedLocation", JSON.stringify(searchedLocation))

  try {
    const[currentResponse, searchedResponse] = await Promise.all([
      fetch('http://localhost:8080/api/v4.0/driverLoaction', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(currentLocation)
      }),
      fetch('http://localhost:8080/api/v4.0/driverLoaction', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(searchedLocation)
      })
    ])

    const currentData = await currentResponse.text();
    const searchedData = await searchedResponse.text();

    localStorage.setItem('pickup', currentData)
    localStorage.setItem('drop', searchedData)

    console.log("Current Location Address:", currentData);
    console.log("Destination Location Address:", searchedData);

    // const response = await fetch('http://localhost:8080/api/v4.0/driverLoaction',{
    //   method:"POST",
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(currentLocation)
    // })
    // if(response.ok){
    //   const textData = await response.text();
    //   console.log("Received Address:", textData);
    // } 
    // else {
    //   console.error("API response error:", response.status, response.statusText);
    // }

    const rideResponse = await fetch('http://localhost:8080/api/v4.0/requestRide', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pickup_location: currentData,
        dropLocation: searchedData
      })
    });

    if (rideResponse.ok) {
      const rideData = await rideResponse.json();
      console.log("Ride Request Response:", rideData);
    } else {
      console.error("Error in requesting ride:", rideResponse.status, rideResponse.statusText);
    }
  } catch (error) {
    console.error("Error in getting location:", error);
  }
}


export const Logout = async()=>{
  try {
    const response = await fetch('http://localhost:8080/api/v2.0/driverLogout',{
      method:"POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
    if(response.ok){
      const data = await response.json();
      console.log(data);
      alert('Logged out successfully')
    }
  } catch (error) {
    console.error("Error in logging out:", error);
  }
}


export const currentLocationProducer = async (currentLocation) => {
  setTimeout(async () => {
      try {
          const response = await fetch('http://localhost:8080/api/v2.0/currentLocationProducer', {
              method: "POST",
              headers: {
                  'Authorization': `Bearer ${token}`,
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(currentLocation)
          });

          if (response.ok) {
              const data = await response.json();
              console.log(data);
          } else {
              console.error("Failed to update location. Status:", response.status);
          }
      } catch (error) {
          console.error("Error in updating current location:", error);
      }
  }, 10000)
};
