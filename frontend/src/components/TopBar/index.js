import React from 'react';
import logo from '../../assets/logo.png';

const TopBar = () => (
  <header className="bg-white border-b border-gray-200">
    <div className="relative h-16">

      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <img
          src={logo}
          alt="Logo"
          className="h-8 md:h-10 w-auto"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-raleway font-semibold">
          Compare LLM's
        </h1>
      </div>
    </div>
  </header>
);

export default TopBar;