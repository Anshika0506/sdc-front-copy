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
      <div className="fixed top-0 left-0 w-full h-24 gap-20 flex items-center z-50">
        <div className="w-full p-3">
          <img
            src={headerLogo}
            alt="Logo"
            className="h-18 w-auto object-contain"
          />
        </div>
        <div className="fixed top-0 left-0 w-full h-24 pl-60 flex items-center">
          <div className="fixed top-0 left-0 w-full flex items-center justify-between">
            <div className="h-full flex items-center">
              <img src={header} alt="Logo" className="h-36 w-auto" />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-wrap items-center gap-3 mt-6 p-3 bg-white/3 backdrop-blur-sm rounded-3xl shadow-[inset_2px_2px_6px_rgba(255,255,255,0.5)]">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                className="w-36 h-12 flex items-center justify-center rounded-xl text-white font-semibold text-lg cursor-pointer hover:text-xl transition-all duration-200 hover:shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] hover:backdrop-blur-md hover:bg-white/3"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Hamburger Button - Mobile Only */}
          <div className="md:hidden z-50 px-30">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-between w-8 h-6 focus:outline-none"
            >
              <span className="block h-1 bg-white rounded-sm"></span>
              <span className="block h-1 bg-white rounded-sm"></span>
              <span className="block h-1 bg-white rounded-sm"></span>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="absolute top-24 left-44 right-4 bg-white/5 backdrop-blur-md rounded-xl p-4 flex flex-col items-center gap-2 md:hidden z-40">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  className="w-full text-center py-2 rounded-xl text-white font-semibold text-base cursor-pointer hover:text-lg hover:bg-white/10 transition-all duration-200"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-24 flex items-center justify-center bg-cover">
        <img src={BG} alt="Header" className="h-36 w-auto object-cover h-screen w-screen" />
      </div>
    </div>
  );
};

export default Navbar;
