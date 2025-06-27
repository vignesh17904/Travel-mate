import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext"; // adjust if different

const BookingRedirect = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/SignIn");
    } else if (user.role === "owner") {
      navigate("/owner-bookings");
    } else {
      navigate("/my-bookings");
    }
  }, [user, navigate]);

  return <div className="p-4 text-center">Redirecting...</div>;
};

export default BookingRedirect;
