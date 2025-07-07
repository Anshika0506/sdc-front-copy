import React from "react";
import img from "../../../assets/SDCframe.svg";

const Content = () => {
  return (
  <div className="w-full px-2 sm:px-4 md:px-10 py-12 flex justify-center items-center">
    <div className="w-full max-w-7xl flex flex-row justify-center items-center gap-2 sm:gap-6 overflow-x-auto">
      {/* Text Card */}
      <div className="w-[52vw] sm:w-[45vw] md:w-[380px] aspect-square relative rounded-3xl bg-white/10 shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] overflow-hidden flex flex-col justify-center items-center shrink-0">
        {/* Glass Effect */}
        <div className="w-[624.86px] h-[811.88px] absolute left-[-69.43px] top-[-197.39px] bg-white/5 backdrop-blur-[3px] -z-10" />

        {/* Content */}
        <div className="w-full px-4 sm:px-6 py-6 flex flex-col items-start gap-4">
          {/* Heading */}
          <div className="text-white/80 text-lg sm:text-2xl md:text-3xl font-semibold font-['Inter'] leading-tight">
            Who are we?
          </div>

          {/* Description */}
          <div className="text-white/80 text-xs sm:text-sm md:text-base font-['IBM_Plex_Mono'] leading-relaxed">
            Potter ipsum wand elf parchment wingardium. Ludo glory house peruvian-night-powder crush dobby last wand.
            Order azkaban umbrella elder hunt knight-bus lion. Floor head map carriages giant out slytherin’s.
            Hexed mrs memory of peg-leg great dress catherine floo. Downfall easy is sticking this hair 10 azkaban.
          </div>
        </div>
      </div>

      {/* Image Box */}
      <div className="w-[42vw] sm:w-[45vw] md:w-[380px] aspect-square relative rounded-2xl overflow-hidden shrink-0">
        <img
          src={img}
          alt="Placeholder"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);

};

export default Content;
