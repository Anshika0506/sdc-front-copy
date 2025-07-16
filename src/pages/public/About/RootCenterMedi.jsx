// File: components/RootCenterMedi.jsx
import React from "react";
import medi from "../../../assets/center.svg";
import center from "../../../assets/medi1.svg";

const RootCenterMedi = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 max-w-6xl mx-auto mt-20 px-4">
      <div
        className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white shadow-md w-full max-w-sm"
        style={{
          boxShadow:
            "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
        }}
      >
        <h3
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 48 }}
        >
          Root
        </h3>
        <p
          className="text-sm font-mono text-gray-200 text-justify py-[8px] pr-[11px] pl-[8px]"
          style={{ fontWeight: 400, fontSize: 16 }}
        >
          Potter ipsum wand elf parchment wingardium. Ludo glory house
          peruvian-night-powder crush dobby last wand. Order azkaban umbrella
          elder hunt knight-bus lion. Floor head map carriages giant out
          slytherin's. Hexed mrs memory of peg-leg great dress catherine floo.
          Downfall easy is sticking this hair 10 azkaban.
        </p>
      </div>

      <div className="-ml-10 mt-[1rem] z-0 rounded-xl w-[300px] h-[300px] flex items-center justify-center">
        <img src={center} alt="Centre for Innovation" className="object-contain" />
      </div>

      <div className="-ml-15 mt-[1rem] z-0 rounded-2xl w-[300px] h-[300px] flex items-center justify-center">
        <img src={medi} alt="Medicaps University" className="object-contain" />
      </div>
    </div>
  );
};

export default RootCenterMedi;
