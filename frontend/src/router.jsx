// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import CityLayout from "./pages/City/CityLayout.jsx";
import TouristSpots from "./pages/City/TouristSpots.jsx";
import Hotels from "./pages/City/Hotels.jsx";
import Sample1 from "./pages/City/Sample1.jsx";
import Sample2 from "./pages/City/Sample2.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import HotelDetails from "./components/HotelDetails.jsx";
import AddHotel from "./components/Addhotel.jsx";

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
        path: "Hotels/:lon/:lat", 
        element: <HotelDetails />,
      },
      {
        path: "Hotels/add-hotel",
        element: <AddHotel />,
      },
      {
        path: "Sample1",
        element: <Sample1 />,
      },
      {
        path: "Sample2",
        element: <Sample2 />,
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
]);

export default router;
