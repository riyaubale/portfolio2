import React, { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-8 h-8 focus:outline-none"
        aria-label="Toggle menu"
      >
        {/* Line 1 */}
        <span
          className={`absolute left-0 top-2 h-0.5 w-full bg-black transition-transform duration-300 ${
            open ? 'rotate-45 translate-y-1' : ''
          }`}
        ></span>
        {/* Line 2 */}
        <span
          className={`absolute left-0 bottom-2 h-0.5 w-full bg-black transition-transform duration-300 ${
            open ? '-rotate-45 -translate-y-1' : ''
          }`}
        ></span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-white border rounded-xl shadow-lg p-4 space-y-2">
          <a href="#projects" className="block text-gray-800 hover:text-blue-600">Projects</a>
          <a href="#experience" className="block text-gray-800 hover:text-blue-600">Experience</a>
          <a href="#about" className="block text-gray-800 hover:text-blue-600">About</a>
          <a href="#contact" className="block text-gray-800 hover:text-blue-600">Contact</a>
        </div>
      )}
    </div>
  );
}
