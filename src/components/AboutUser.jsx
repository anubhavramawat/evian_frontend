import React, { useState, useEffect } from "react";
import { useFormData } from "./FormDataContext";
import { getUsersData } from "./ApiRequests";

function AboutUser() {
    //const [data, setData] = useState(null);
    const [data, setData] = useState(() => {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
  });

   useEffect(()=>{
    const getData = async()=>{
     try {
      const userData = await getUsersData()
      setData(userData)
      localStorage.setItem('user', JSON.stringify(userData));
      //console.log(data)
     } 
     catch (error) {
      console.log(error)
     }
    }
    getData();
   },[])

  return (
    <div className="w-screen max-w-xl h-screen p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          About You
        </h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <i className="fa-solid fa-user" style={{color: 'white'}}></i>
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Name
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {data.firstname}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center ">
              <div className="flex-shrink-0">
                <i className="fa-solid fa-phone" style={{color: 'white'}}></i>
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Phone Number
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {data.phone}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <i className="fa-solid fa-envelope" style={{color: 'white'}}></i>
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Email
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {data.email}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center ">
              <div className="flex-shrink-0">
                <i className="fa-solid fa-person-half-dress" style={{color: 'white'}}></i>
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Gender
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {data.gender}
                </p>
              </div>
            </div>
          </li>
          <li className="pt-3 pb-0 sm:pt-4">
            <div className="flex items-center ">
              <div className="flex-shrink-0">
                <i className="fa-solid fa-calendar-days" style={{color: 'white'}}></i>
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Address
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {data.Address}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AboutUser;
