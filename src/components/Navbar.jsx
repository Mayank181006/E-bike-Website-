import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <>
      <nav className="w-full text-black fixed top-0 left-0 z-[999] bg-white/5 backdrop-blur-md ">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center h-16">
          <div
            className="h-8 w-20 bg-no-repeat bg-contain bg-center"
            style={{ backgroundImage: `url(${logo})` }}
          />

          <div className="hidden sm:flex w-3/5 justify-between font-medium text-sm items-center">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Products</a>
            <a href="#" className="nav-link">Gallery</a>
            <a href="#" className="nav-link">Contact Us</a>
            <button className='w-fit h-fit px-3 py-2 bg-[linear-gradient(to_right,_#B5D9E9,_#5bc1c5)]  rounded-xl shadow-md hover:shadow-lg hover:scale-105 cursor-pointer transition-all ease-in-out'>Pre-Order</button>
          </div>

          <div className="sm:hidden">
            <button onClick={() => setIsOpen(true)} aria-label="Open Menu">
              <FaBars className='cursor-pointer' size={22} />
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#E0EDF5] text-black z-[1001] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end px-6 py-4 ">
          <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
            <FaTimes className='cursor-pointer' size={28} />
          </button>
        </div>
        <div className="flex flex-col space-y-6 text-lg px-10 mt-10">
          <a href="#" onClick={() => setIsOpen(false)} className="hover:text-[#90D5D0]">Home</a>
          <a href="#" onClick={() => setIsOpen(false)} className="hover:text-[#90D5D0]">Products</a>
          <a href="#" onClick={() => setIsOpen(false)} className="hover:text-[#90D5D0]">Gallery</a>
          <a href="#" onClick={() => setIsOpen(false)} className="hover:text-[#90D5D0]">Contact Us</a>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
