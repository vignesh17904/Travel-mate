import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "@/utils/ApiConfig";
import { CheckCircle, AlertTriangle } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("Finalizing your booking...");
  const [status, setStatus] = useState("processing"); 

  useEffect(() => {
    const finalizeBooking = async () => {
      const booking = JSON.parse(localStorage.getItem("bookingDetails"));
      if (!booking) {
        setStatus("error");
        setMsg("No booking data found.");
        return;
      }

      try {
        await AxiosInstance.post("/bookings/makebooking", booking);
        localStorage.removeItem("bookingDetails");
        setStatus("success");
        setMsg("✅ Booking successful! Redirecting...");
        setTimeout(() => navigate("/"), 3000);
      } catch (err) {
        setStatus("error");
        setMsg("❌ Booking failed after payment. Please contact support.");
      }
    };

    finalizeBooking();
  }, []);

  const renderContent = () => {
    if (status === "processing") {
      return (
        <div className="flex flex-col items-center justify-center animate-pulse">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-blue-600 text-lg">{msg}</p>
        </div>
      );
    }

    if (status === "success") {
      return (
        <div className="flex flex-col items-center animate-fade-in">
          <CheckCircle size={60} className="text-green-500 mb-4" />
          <p className="text-green-600 text-xl font-semibold">{msg}</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center animate-fade-in">
        <AlertTriangle size={60} className="text-red-500 mb-4" />
        <p className="text-red-600 text-xl font-semibold">{msg}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 px-4">
      <div className="bg-white shadow-xl p-10 rounded-xl w-full max-w-md text-center transition-all duration-300">
        <h2 className="text-2xl font-bold mb-6">Payment Status</h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default PaymentSuccess;
