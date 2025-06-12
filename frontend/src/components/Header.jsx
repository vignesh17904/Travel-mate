import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
  


const user = {
  name: "Raja Vignesh",
  email: "rajav@example.com",
  picture: ""
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="shadow sticky z-50 top-0 bg-white">
      <nav className="border-black-200 px-4 lg:px-6 py-2.5 max-w-screen-xl mx-auto flex items-center">
        
        
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
            className="mr-3 h-12"
            alt="Logo"
          />
        </Link>

       
        <div className="flex-1">
          <ul className="flex justify-center space-x-8 font-medium">
            {[
              { to: '', label: 'TouristSpots', exact: true },
              { to: 'Hotels', label: 'Hotels' },
              { to: 'Sample1', label: 'Sample1' },
              { to: 'Sample2', label: 'Sample2' },
            ].map(({ to, label, exact }) => (
              <li key={to}>
<NavLink
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? 'text-blue-700' : 'text-black-700'
                    } border-b border-black-100 hover:bg-black-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* User avatar */}
        <div className="ml-4 flex-shrink-0">
          {user.picture ? (
            <img
              src={user.picture}
              className="w-10 h-10 rounded-full"
              alt="avatar"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
             {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}