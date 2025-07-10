import UserContext from "../context/UserContext.js";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

export default function Header() {
  const { user, fetchUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const { CityName } = useParams();
  const profileRef = useRef();

  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfile]);

  const navItems = [
    { to: `/${CityName}`, label: "TouristSpots", exact: true },
    { to: `/${CityName}/Hotels`, label: "Hotels" },
    {
      to:
        user?.role === "hotelowner"
          ? "owner-bookings"
          : user
          ? "my-bookings"
          : "/SignIn",
      label:
        user?.role === "hotelowner"
          ? "Hotel Bookings"
          : user
          ? "My Bookings"
          : "Bookings",
    },
    { to: `/${CityName}/Sample2`, label: "Sample2" },
  ];

  const shouldShowAddHotel =
    user?.role === "hotelowner" && location.pathname.endsWith("/Hotels");

  return (
    <header className="shadow sticky z-50 top-0 bg-white">
      <nav className="relative border-black-200 px-4 lg:px-6 py-2.5 max-w-screen-xl mx-auto flex items-center justify-between">

        <Link to="/" className="flex items-center flex-shrink-0 z-10">
          <img src="/logo4.png" className="mr-3 h-12 w-32" alt="Logo" />
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>


        <div
          className={`absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 ${menuOpen ? "block" : "hidden"
            } lg:block`}
        >
          <ul className="flex flex-col mt-4 lg:flex-row lg:space-x-8 lg:mt-0 text-center font-medium">
            {navItems.map(({ to, label, exact }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={exact}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-4 duration-200 ${isActive ? "text-blue-700" : "text-black-700"
                    } border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>


        <div className="ml-auto flex items-center space-x-4 z-10">
          {shouldShowAddHotel && (
            <Link
              to={`${location.pathname}/add-hotel`}
              onClick={() => setMenuOpen(false)}
              className="hidden lg:block bg-orange-200 hover:bg-orange-300 text-orange-900 font-medium py-2 px-4 rounded-full transition duration-300"
            >
              Add Hotel
            </Link>
          )}


          {user && (
            <button onClick={() => setShowProfile(true)} className="cursor-pointer">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  className="w-10 h-10 rounded-full"
                  alt="avatar"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </button>
          )}
        </div>
      </nav>


      <div
        className={`fixed inset-0 z-50 bg-black/10 transition-opacity duration-300 ease-in-out ${showProfile ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >

        <div
          ref={profileRef}
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${showProfile ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="p-6 relative h-full overflow-y-auto">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Profile</h2>

            {!user ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
              </div>
            ) : (
              <div className="space-y-3">
                <p><strong>Name:</strong> {user.name || user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
