import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AxiosInstance from "../../utils/AxiosInstance.js";

const PaymentCancel = () => {
  const [params] = useSearchParams();
  const bookingId = params.get("bookingId");

  useEffect(() => {
    if (bookingId) {
      AxiosInstance.post("/bookings/cancel-booking", { bookingId });
    }
  }, [bookingId]);

  return <div className="p-10 text-red-600 text-2xl">Payment Cancelled!</div>;
};

export default PaymentCancel;
