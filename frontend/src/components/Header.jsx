import UserContext from "@/context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const { user, fetchUser } = useContext(UserContext);
  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: "", label: "TouristSpots", exact: true },
    { to: "Hotels", label: "Hotels" },
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
    { to: "Sample2", label: "Sample2" },
  ];

  const shouldShowAddHotel =
    user?.role === "hotelowner" && location.pathname.endsWith("/Hotels");
  return (
    <header className="shadow sticky z-50 top-0 bg-white">
      <nav className="relative border-black-200 px-4 lg:px-6 py-2.5 max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0 z-10">
          <img src="/logo4.png" className="mr-3 h-12 w-32" alt="Logo" />
        </Link>

        {/* Hamburger - Mobile Only */}
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

        {/* Nav Links - Centered */}
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 ${
            menuOpen ? "block" : "hidden"
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
                    `block py-2 px-4 duration-200 ${
                      isActive ? "text-blue-700" : "text-black-700"
                    } border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
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

          {/* Avatar */}
          {user && (
            user.avatar ? (
              <img
                src={user.avatar}
                className="w-10 h-10 rounded-full"
                alt="avatar"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
                {user.username?.charAt(0).toUpperCase()}
              </div>
            ))}
        </div>
      </nav>
    </header>
  );
}
