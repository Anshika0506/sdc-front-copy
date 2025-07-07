import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import meshGradient from "../../../assets/mesh-gradient.webp";
import map from "../../../assets/map.svg";
import instaIcon from "../../../assets/instagram.webp";
import linkedinIcon from "../../../assets/linkeldin.png";

const faqs = [
  {
    question: "Quality services provided at affordable rates?",
    answer: "",
  },
  {
    question: "Minimum prices for the maximum output advertise anything?",
    answer:
      "Potter ipsum wand elf parchment wingardium. Ludo glory house peruvian-night-powder crush dobby last wand. Order azkaban umbrella elder hunt knight-bus lion. Floor head map carriages giant out slytherin’s. Hexed mrs memory of peg-leg great dress catherine floo. Downfall easy is sticking this hair 10 azkaban.",
  },
  {
    question:
      "Advertising that makes all the difference leaping over boundaries?",
    answer: "",
  },
  {
    question: "Minimum prices for the maximum output advertise anything?",
    answer: "",
  },
  {
    question: "Quality services provided at affordable rates?",
    answer: "",
  },
];

const navLinks = [
  "Home",
  "About",
  "Services",
  "Work",
  "People",
  "Careers",
  "Contact",
  "Admin",
];

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(1);

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-25"
      style={{
        backgroundImage: `url(${meshGradient})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Outer Glass Card */}
      <div className="relative w-full max-w-[1200px] rounded-3xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col items-center gap-12 px-8 py-16 md:px-16 md:py-16">
        {/* Outer Glass Overlay */}
        <div className="absolute w-[1769.14px] h-[1083.81px] left-[-196.57px] top-[-263.5px] bg-white/5 backdrop-blur-[3px] z-0" />
        {/* Heading & Subheading */}
        <div className="relative z-10 flex flex-col items-center gap-3.5">
          <div className="inline-flex justify-center items-center gap-2.5">
            <div className="text-white text-[40px] md:text-[64px] font-bold font-inter leading-[48px] md:leading-[72px] text-center">
              Let’s Build the Future, Together.
            </div>
          </div>
          <div className="inline-flex justify-center items-center gap-2.5">
            <div className="max-w-[758px] text-center text-[#D2D2D2] text-[22px] md:text-[28px] font-medium font-inter leading-8 md:leading-9">
              Have a vision? We’re here to help you code it into reality. Reach
              out — innovation starts with a conversation.
            </div>
          </div>
        </div>
        {/* Info Card */}
        <div className="relative w-full max-w-[980px] h-auto md:h-56 px-4 md:px-7 py-5 rounded-3xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden flex justify-center items-center gap-2.5">
          {/* Inner Glass Overlay */}
          <div className="absolute w-[1260px] h-[435.08px] left-[-140px] top-[-105.78px] bg-white/5 backdrop-blur-[3px] z-0" />
          <div className="relative z-10 w-full flex flex-col md:flex-row justify-center items-center gap-10">
            {/* Contact */}
            <div className="w-40 min-w-[160px] flex-1 flex flex-col justify-center items-start gap-3">
              <div className="self-stretch p-0.5 flex items-center gap-2.5">
                <div className="text-white text-2xl font-semibold font-inter leading-[32px]">
                  Contact
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="p-0.5 flex flex-col gap-1">
                  <div className="text-white text-base font-normal font-ibmplexmono leading-6">
                    Phone No.
                  </div>
                  <div className="text-[#D2D2D2] text-sm font-normal font-ibmplexmono leading-5">
                    +91-07313111500
                  </div>
                </div>
                <div className="self-stretch p-0.5 flex flex-col gap-1">
                  <div className="text-white text-base font-normal font-ibmplexmono leading-6">
                    Email ID
                  </div>
                  <div className="text-[#D2D2D2] text-sm font-normal font-ibmplexmono leading-5">
                    sdc@medicaps.ac.in
                  </div>
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="hidden md:block w-20 h-0 origin-top-left -rotate-90 outline-1 outline-offset-[-0.5px] outline-white"></div>
            {/* Social Media */}
            <div className="w-40 min-w-[160px] flex-1 flex flex-col justify-center items-center gap-3">
              <div className="self-stretch p-0.5 flex items-center gap-2.5">
                <div className="text-white text-2xl font-semibold font-inter leading-[32px]">
                  Social Media
                </div>
              </div>
              <div className="self-stretch flex flex-col gap-2">
                <a
                  href="https://instagram.com/medicaps_sdc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#AA1E6B] rounded-lg shadow-[0px_0px_25px_0px_rgba(142,45,226,0.25)] flex items-center gap-2"
                  
                  src={instaIcon}
                >
                  <FaInstagram className="w-5 h-5" />
                  <span className="text-white text-xs font-semibold font-inter uppercase tracking-tight">
                    Instagram
                  </span>
                </a>
                <a
                  href="https://linkedin.com/company/sdc-medicapsuniversity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#AA1E6B] rounded-lg shadow-[0px_0px_25px_0px_rgba(142,45,226,0.25)] flex items-center gap-2"
                  
                  src={linkedinIcon}
                >
                  <FaLinkedin className="w-5 h-5" />
                  <span className="text-white text-xs font-semibold font-inter uppercase tracking-tight">
                    Linked in
                  </span>
                </a>
              </div>
            </div>
            {/* Divider */}
            <div className="hidden md:block w-20 h-0 origin-top-left -rotate-90 outline-1 outline-offset-[-0.5px] outline-white"></div>
            {/* Operating Hour */}
            <div className="w-40 min-w-[160px] flex-1 flex flex-col justify-center items-start gap-3">
              <div className="self-stretch p-0.5 flex items-center gap-2.5">
                <div className="text-white text-2xl font-semibold font-inter leading-[32px]">
                  Operating Hour
                </div>
              </div>
              <div className="self-stretch p-0.5 flex flex-col gap-1">
                <div className="text-white text-base font-normal font-ibmplexmono leading-6">
                  Mon - Fri
                </div>
                <div className="text-[#D2D2D2] text-sm font-normal font-ibmplexmono leading-5">
                  8:30 AM - 5:00 PM IST
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="hidden md:block w-20 h-0 origin-top-left -rotate-90 outline-1 outline-offset-[-0.5px] outline-white"></div>
            {/* Office Address */}
            <div className="w-40 min-w-[160px] flex-1 flex flex-col justify-center items-start gap-3">
              <div className="self-stretch p-0.5 flex items-center gap-2.5">
                <div className="text-white text-2xl font-semibold font-inter leading-[32px]">
                  Office Address
                </div>
              </div>
              <div className="self-stretch p-0.5 flex items-center gap-2.5">
                <div className="text-[#D2D2D2] text-sm font-normal font-ibmplexmono leading-5">
                  A.B. Road Pigdamber, Rau, Indore,
                  <br />
                  Madhya Pradesh -453331
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Form Section */}
      <div className="w-full max-w-[1440px] py-16 flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full">
          {/* Indore Map Image on the left */}
          <img
            className="w-[320px] md:w-[586px] h-[260px] md:h-[474px] p-2.5 rounded-2xl object-cover"
            src={map}
            alt="Indore Map"
          />
          {/* Contact Form on the right */}
          <form className="w-full max-w-[586px] flex flex-col justify-between items-center gap-4">
            <div className="w-full flex flex-col gap-3.5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white text-sm font-semibold font-inter uppercase tracking-wide">
                  Name
                </label>
                <div className="relative h-12 flex items-center rounded-[10px] shadow-[inset_2px_2px_6px_0px_rgba(255,255,255,0.50)] overflow-hidden px-4 py-3">
                  <div className="absolute w-[753.43px] h-24 left-[-83.71px] top-[-22.67px] bg-white/5 backdrop-blur-[3px]" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="relative z-10 bg-transparent outline-none border-none w-full text-base font-normal font-ibmplexmono text-[#D2D2D2] placeholder:text-[#D2D2D2]"
                  />
                </div>
              </div>
              {/* Contact & Query */}
              <div className="flex flex-col md:flex-row gap-2.5 w-full">
                {/* Contact */}
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-white text-sm font-semibold font-inter uppercase tracking-wide">
                    Contact
                  </label>
                  <div className="relative h-12 flex items-center rounded-[10px] shadow-[inset_2px_2px_6px_0px_rgba(255,255,255,0.50)] overflow-hidden px-4 py-3">
                    <div className="absolute w-96 h-24 left-[-41.14px] top-[-22.67px] bg-white/5 backdrop-blur-[3px]" />
                    <input
                      type="text"
                      placeholder="Enter phone no."
                      className="relative z-10 bg-transparent outline-none border-none w-full text-base font-normal font-ibmplexmono text-[#D2D2D2] placeholder:text-[#D2D2D2]"
                    />
                  </div>
                </div>
                {/* Query */}
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-white text-sm font-semibold font-inter uppercase tracking-wide">
                    Query
                  </label>
                  <div className="relative h-12 flex items-center rounded-[10px] shadow-[inset_2px_2px_6px_0px_rgba(255,255,255,0.50)] overflow-hidden px-4 py-3">
                    <div className="absolute w-96 h-24 left-[-41.14px] top-[-22.67px] bg-white/5 backdrop-blur-[3px]" />
                    <select className="relative z-10 bg-transparent outline-none border-none w-full text-base font-normal font-ibmplexmono text-[#D2D2D2]">
                      <option value="" className="text-black">
                        Select query
                      </option>
                      <option value="general" className="text-black">
                        General
                      </option>
                      <option value="partnership" className="text-black">
                        Partnership
                      </option>
                      <option value="support" className="text-black">
                        Support
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Mail */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white text-sm font-semibold font-inter uppercase tracking-wide">
                  Mail
                </label>
                <div className="relative h-12 flex items-center rounded-[10px] shadow-[inset_2px_2px_6px_0px_rgba(255,255,255,0.50)] overflow-hidden px-4 py-3">
                  <div className="absolute w-[753.43px] h-24 left-[-83.71px] top-[-22.67px] bg-white/5 backdrop-blur-[3px]" />
                  <input
                    type="email"
                    placeholder="Enter Gmail id"
                    className="relative z-10 bg-transparent outline-none border-none w-full text-base font-normal font-ibmplexmono text-[#D2D2D2] placeholder:text-[#D2D2D2]"
                  />
                </div>
              </div>
              {/* Message */}
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-white text-sm font-semibold font-inter uppercase tracking-wide">
                  Message
                </label>
                <div className="relative flex-1 min-h-[96px] flex items-start rounded-[10px] shadow-[inset_2px_2px_6px_0px_rgba(255,255,255,0.50)] overflow-hidden px-4 py-3">
                  <div className="absolute w-[753.43px] h-60 left-[-83.71px] top-[-59.03px] bg-white/5 backdrop-blur-[3px]" />
                  <textarea
                    placeholder="Describe your query"
                    className="relative z-10 bg-transparent outline-none border-none w-full h-24 resize-none text-base font-normal font-ibmplexmono text-[#D2D2D2] placeholder:text-[#D2D2D2]"
                  />
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-8 py-4 bg-pink-700 rounded-[10px] shadow-[0px_0px_25px_0px_rgba(142,45,226,0.25)] flex justify-center items-center gap-4 mt-2"
            >
              <span className="text-white text-base font-semibold font-inter uppercase tracking-tight">
                Submit
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-[1440px] flex flex-col items-center mt-16">
        {/* FAQ Heading */}
        <div className="w-full flex flex-col items-center pb-8">
          <div className="text-white text-5xl font-semibold font-inter leading-[56px] mb-8">
            FAQ
          </div>
        </div>
        <div className="w-full flex flex-col items-center pb-16">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-5">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`w-[95vw] max-w-[952px] p-6 bg-white rounded-[10px] flex flex-col justify-center items-center gap-4 overflow-hidden transition-all duration-300 ${
                    openFaq === idx ? "" : ""
                  }`}
                  data-faq-number={`faq ${idx + 1}`}
                  data-state={openFaq === idx ? "open" : "closed"}
                >
                  <div className="self-stretch inline-flex justify-between items-center">
                    <div className="flex-1 text-black text-base font-normal font-ibmplexmono leading-normal">
                      {faq.question}
                    </div>
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                      className="w-5 h-5 flex items-center justify-center relative"
                      aria-label={openFaq === idx ? "Close" : "Open"}
                    >
                      {/* Plus/Minus icon */}
                      <span
                        className={`block w-0.5 h-4 bg-black rounded absolute left-2 top-0 transition-all duration-200 ${
                          openFaq === idx ? "opacity-0" : "opacity-100"
                        }`}
                      />
                      <span
                        className={`block w-0.5 h-4 bg-black rounded absolute left-2 top-0 transition-all duration-200 ${
                          openFaq === idx ? "opacity-0" : "opacity-100"
                        }`}
                      />
                    </button>
                  </div>
                  {openFaq === idx && faq.answer && (
                    <div className="self-stretch flex justify-start items-center gap-2.5">
                      <div className="flex-1 text-zinc-500 text-sm font-normal font-ibmplexmono leading-tight">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Glassmorphic Contact Details Card */}
      </div>
    </div>
  );
};

export default Contact;
