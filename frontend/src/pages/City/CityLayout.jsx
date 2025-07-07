import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import AxiosInstance from "../../utils/AxiosInstance.js";

export default function CityLayout() {
  const { CityName } = useParams(); 
  // console.log("CityLayout CityName:", CityName);

  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  

  useEffect(() => {
    const fetchPlaceId = async () => {
      try {
        const response = await AxiosInstance.get(`/cities/get-placeid/${CityName}`);
        setCurrentPlaceId(response.data.data);
      } catch (error) {
        console.error("Failed to fetch placeid:", error);
      }
    };

    if (CityName) {
      fetchPlaceId();
    }
  }, [CityName]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow max-w-screen-xl mx-auto px-4 py-8 w-full">
        <Outlet context={{ placeid: currentPlaceId }}/>
      </main>
      
      <Footer />
    </div>
  );
}
