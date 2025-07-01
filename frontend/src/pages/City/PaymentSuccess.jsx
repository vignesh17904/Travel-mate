import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AxiosInstance from "@/utils/ApiConfig";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const bookingId = params.get("bookingId");

  useEffect(() => {
    if (bookingId) {
      AxiosInstance.post("/bookings/update-status", {
        bookingId,
        status: "paid",
      });
    }
  }, [bookingId]);

  return <div className="p-10 text-green-600 text-2xl">Payment Successful!</div>;
};

export default PaymentSuccess;
