import React from "react";
import logo from "../assets/LogoWhite.png";
import mail from "../assets/mail.png";
import phone from "../assets/phone.png";
import linkeldin from "../assets/linkeldin.png";
import location from "../assets/location.png";
import instagram from "../assets/instagram.webp";

const Footer = () => {
  return (
  <footer
    className="bg-white/10 backdrop-blur-md w-full gap-[10px] rounded-xl py-[70px] px-[20px] sm:px-[30px] h-auto"
    style={{
      boxShadow: "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
    }}
  >
    <div className="w-full">
      <img
        src={logo}
        alt=""
        className="w-[180px] sm:w-[240px] h-auto mx-auto"
      />

      <div className="mt-12 text-white flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm sm:text-base">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#work">Work</a>
        <a href="#people">People</a>
        <a href="#careers">Careers</a>
        <a href="#contact">Contact</a>
        <a href="#admin">Admin</a>
      </div>

      <div
        className="w-full sm:w-[546.43px] h-[15px] rounded-[5px] px-[30px] py-[10px] gap-[10px] mt-[3rem] mx-auto"
        style={{
          boxShadow:
            "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
        }}
      ></div>

      <div className="mt-[2rem] flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white text-sm rounded-md">
        <div className="flex items-center">
          <img
            src={mail}
            alt=""
            className="h-[1.5rem] w-[1.5rem] mr-[0.5rem]"
          />
          <span>sdc@medicaps.ac.in</span>
        </div>

        <div className="flex items-center">
          <img
            src={phone}
            alt=""
            className="h-[1.5rem] w-[1.5rem] mr-[0.5rem]"
          />
          <span>+91-07313111500</span>
        </div>

        <div className="flex items-center">
          <img
            src={instagram}
            alt=""
            className="h-[1.5rem] w-[1.5rem] mr-[0.2rem]"
          />
          <span>medicaps_sdc</span>
        </div>

        <div className="flex items-center gap-2">
          <img
            src={linkeldin}
            alt=""
            className="h-[1.5rem] w-[1.5rem] mr-[0.2rem]"
          />
          <span>SDC_MedicapsUniversity</span>
        </div>
      </div>

      <div className="mt-[2rem] flex flex-wrap items-center justify-center gap-3 text-white/80 text-sm rounded-md text-center px-4">
        <img src={location} alt="" className="h-[1.5rem] w-[1.5rem]" />
        <span>
          A.B. Road Pigdamber, Rau, Indore, Madhya Pradesh 453331
        </span>
      </div>
    </div>
  </footer>
);

};

export default Footer;
