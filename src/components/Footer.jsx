import React from "react";
import logo from "../assets/LogoWhite.png";
import mail from "../assets/mail.png";
import phone from "../assets/phone.png";
import linkeldin from "../assets/linkeldin.png";
import location from "../assets/location.png";
import instagram from "../assets/instagram.png";

const Footer = () => {
  return (
    <footer
      className="bg-white/10 backdrop-blur-md w-full h-[505.65863037109375px] gap-[10px] rounded-xl py-[70px] px-[30px] "
      style={{
        boxShadow: "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
      }}
    >
      <div>
        <img
          src={logo}
          alt=""
          className="w-[240px] h-[96.65863037109375px] ml-[35rem]"
        />
        <div className="mt-15 flex justify-center space-x-15">
          <a href="#home" className="">
            Home
          </a>
          <a href="#about" className="">
            About
          </a>
          <a href="#services" className="">
            Services
          </a>
          <a href="#work" className="">
            Work
          </a>
          <a href="#people" className="">
            People
          </a>
          <a href="#careers" className="">
            Careers
          </a>
          <a href="#contact" className="">
            Contact
          </a>
          <a href="#admin" className="">
            Admin
          </a>
        </div>
        <div
          className="w-[350px] h-[15px] rounded-[5px] px-[30px] py-[10x] gap-[10px] mt-[3rem] ml-[32rem]"
          style={{
            boxShadow:
              "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
          }}
        ></div>
        <div className="mt-[2rem]  flex flex-wrap items-center justify-center gap-30 text-black text-sm rounded-md">
          <div className="flex items-center ">
            {/* <Mail size={16} /> */}
            <img
              src={mail}
              alt=""
              className="h-[1.5rem] w-[1.5rem] mr-[0.5rem]"
            />
            <span>sdc@medicaps.ac.in</span>
          </div>

          {/* Phone */}
          <div className="flex items-center ">
            {/* <Phone size={16} /> */}
            <img
              src={phone}
              alt=""
              className="h-[1.5rem] w-[1.5rem] mr-[0.5rem]"
            />
            <span>+91-07313111500</span>
          </div>

          {/* Instagram */}
          <div className="flex items-center ">
            {/* <FaInstagram size={16} /> */}
            <img
              src={instagram}
              alt=""
              className="h-[1.5rem] w-[1.5rem] mr-[0.2rem]"
            />
            <span>medicaps_sdc</span>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-2">
            {/* <FaLinkedin size={16} /> */}
            <img
              src={linkeldin}
              alt=""
              className="h-[1.5rem] w-[1.5rem] mr-[0.2rem]"
            />
            <span>SDC_MedicapsUniversity</span>
          </div>
        </div>
        {/* Address */}
        <div className="mt-[2rem]  flex flex-wrap items-center justify-center gap-3 text-black text-sm  rounded-md">
          {/* <MapPin size={16} /> */}
          <img src={location} alt="" className="h-[1.5rem] w-[1.5rem] " />
          <span>A.B. Road Pigdamber, Rau, Indore, Madhya Pradesh 453331</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
