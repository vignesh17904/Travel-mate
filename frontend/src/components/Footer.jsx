import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-12">
      <div className="max-w-screen-xl mx-auto px-4 text-center text-gray-600 text-sm">
        <p>
          &copy; {new Date().getFullYear()} TravelMate. All rights reserved.
        </p>
        <p className="mt-2">
          Discover the beauty of India with us. Explore, experience, and enjoy your journey!
        </p>
      </div>
    </footer>
  );
}
