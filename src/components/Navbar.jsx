// import React, { useState } from 'react';
// import headerLogo from '/Logowhite.png';

// const navItems = ["Home", "About", "Services", "Work", "People", "Career", "Contact"];

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="fixed top-0 left-0 w-full h-24 px-4 flex items-center justify-between bg-transparent backdrop-blur-md z-50 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.5)]">

//       {/* Logo */}
//       <div className="w-52 h-20 flex items-center justify-center rounded-xl">
//         <img src={headerLogo} alt="Logo" className="h-16 w-auto object-contain" />
//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex flex-wrap items-center gap-3 mt-6 p-3 bg-white/5 backdrop-blur-md rounded-3xl shadow-[inset_2px_2px_6px_rgba(255,255,255,0.5)]">
//         {navItems.map((item, idx) => (
//           <div
//             key={idx}
//             className="w-36 h-12 flex items-center justify-center rounded-xl text-white font-semibold text-base hover:text-lg hover:shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] hover:backdrop-blur-md hover:bg-white/5"
//           >
//             {item}
//           </div>
//         ))}
//       </div>

//       {/* Hamburger Button - Mobile Only */}
//       <div className="md:hidden z-50">
//         <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col justify-between w-8 h-6 focus:outline-none">
//           <span className="block h-1 bg-white rounded-sm"></span>
//           <span className="block h-1 bg-white rounded-sm"></span>
//           <span className="block h-1 bg-white rounded-sm"></span>
//         </button>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {menuOpen && (
//         <div className="absolute top-24 left-4 right-4 bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center gap-2 md:hidden z-40">
//           {navItems.map((item, idx) => (
//             <div
//               key={idx}
//               className="w-full text-center py-2 rounded-xl text-white font-semibold text-base hover:text-lg hover:bg-white/10"
//             >
//               {item}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import headerLogo from "/Logowhite.png";
import header from "/header.png";
import BG from "/bg.png";

const navItems = [
  "Home",
  "About",
  "Services",
  "Work",
  "People",
  "Career",
  "Contact",
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="max-h-10">
      <div className="fixed left-0 top-0 z-50 flex h-24 w-full items-center gap-20">
        <div className="w-full p-3">
          <img
            src={headerLogo}
            alt="Logo"
            className="h-18 w-auto object-contain"
          />
        </div>
        <div className="fixed left-0 top-0 flex h-24 w-full items-center pl-60">
          <div className="fixed left-0 top-0 flex w-full items-center justify-between">
            <div className="flex h-full items-center">
              <img src={header} alt="Logo" className="h-36 w-auto" />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="bg-white/3 mt-6 hidden flex-wrap items-center gap-3 rounded-3xl p-3 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.5)] backdrop-blur-sm md:flex">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                className="hover:bg-white/3 flex h-12 w-36 cursor-pointer items-center justify-center rounded-xl text-lg font-semibold text-white transition-all duration-200 hover:text-xl hover:shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] hover:backdrop-blur-md"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Hamburger Button - Mobile Only */}
          <div className="px-30 z-50 md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-6 w-8 flex-col justify-between focus:outline-none"
            >
              <span className="block h-1 rounded-sm bg-white"></span>
              <span className="block h-1 rounded-sm bg-white"></span>
              <span className="block h-1 rounded-sm bg-white"></span>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="absolute left-44 right-4 top-24 z-40 flex flex-col items-center gap-2 rounded-xl bg-white/5 p-4 backdrop-blur-md md:hidden">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  className="w-full cursor-pointer rounded-xl py-2 text-center text-base font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:text-lg"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-center bg-cover">
        <img
          src={BG}
          alt="Header"
          className="h-screen w-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Navbar;
