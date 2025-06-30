import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import CityLayout from "./pages/City/CityLayout.jsx";
import TouristSpots from "./pages/City/TouristSpots.jsx";
import Hotels from "./pages/City/Hotels.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import HotelDetails from "./components/HotelDetails.jsx";
import AddHotel from "./components/Addhotel.jsx";
import BookingPage from "./pages/City/BookingPage.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import OwnerBookings from "./pages/OwnerBookings.jsx";
import PaymentSuccess from "./pages/City/PaymentSuccess.jsx";
import PaymentCancel from "./pages/City/PaymentCancel.jsx"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/:CityName",
    element: <CityLayout />,
    children: [
      {
        index: true,
        element: <TouristSpots />,
      },
      {
        path: "Hotels",
        element: <Hotels />,
      },
      {
        path: "Hotels/:lon/:lat/:_id",
        element: <HotelDetails />,
      },
      {
        path: "Hotels/add-hotel",
        element: <AddHotel />,
      },
      {
        path: "Hotels/book/:_id", 
        element: <BookingPage />,
      },
      {
        path: "owner-bookings",
        element: <OwnerBookings />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
    ],
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment-cancel",
    element: <PaymentCancel />,
  },
]);

export default router;
