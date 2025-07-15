import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import cross from "../../../assets/cross.svg";
import attachicon from "../../../assets/attachicon.png"; // or .png depending on your file


const branches = ["CSE", "CS-AI", "CS-DS", "IT"];
const years = ["1st", "2nd", "3rd", "4th"];
const positions = [
  "Frontend Developer",
  "Backend Developer",
  "UI Designer",
  "Social Media Manager",
];

const Career = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const roles = [
    ["President", "Vice President"],
    ["Secretary", "Project Manager"],
    ["Technical Head", "Design Head"],
    ["Team Lead", "Developer"],
    ["Designer", "Trainee"],
  ];
  const [showModal, setShowModal] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    year: "",
    branch: "",
    enrollment: "",
    position: "",
    experience: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
    console.log("Resume attached:", e.target.files[0]);
  };

  const handleApply = () => {
    console.log("Form Submitted:", formData);
    console.log("Attached Resume:", resumeFile);
    setShowModal(false);
  };

  return (
    <div>
      <div className=" text-white px-6 sm:px-20 py-24 font-sans">
        <h2 className="text-4xl font-bold mb-10  pb-4">Career At SDC</h2>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-white">
          {roles.map(([left, right], index) => (
            <React.Fragment key={index}>
              {/* Left Cell */}
              <div className="border-b md:border-r border-white px-4 py-6">
                <h3 className="text-lg font-semibold">{left}</h3>
                <p className="text-white/80 text-sm mt-1 font-mono leading-6">
                  Potter ipsum wand elf parchment wingardium. Trevor bagman
                  above he nagini tell is trevor.
                </p>
              </div>

              {/* Right Cell */}
              <div className="border-b border-white px-4 py-6">
                <h3 className="text-lg font-semibold">{right}</h3>
                <p className="text-white/80 text-sm mt-1 font-mono leading-6">
                  Potter ipsum wand elf parchment wingardium. Trevor bagman
                  above he nagini tell is trevor.
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h4 className="text-lg font-bold mb-2">
            Build More Than Code — Build a Better Future
          </h4>
          <p className="text-white/80 mb-4 mx-auto text-sm max-w-2xl font-mono leading-6">
            Join our team of innovators, problem-solvers, and changemakers. Your
            skills can drive real-world impact.
            <br />
            Ready to make a difference?
          </p>
          <button
            style={{
              boxShadow: "0px 6px 30px rgba(255, 255, 255, 0.1)",
            }}
            className="bg-[#AA1E6B] text-white font-semibold px-6 py-3 rounded-md transition"
            onClick={() => setShowModal(true)}
          >
            JOIN US NOW
          </button>
         {showModal && (
                 <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                   <div
                     style={{
                       boxShadow:
                         "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
                       // Remove fixed positioning (left, top, position: "absolute") to center with flexbox
                       background: "rgba(0, 0, 0, 0.15)",
                       backdropFilter: "blur(5px)",
                     }}
                     className=" bg-black/10 p-6 rounded-xl w-[95%] max-w-4xl relative"
                   >
                     <h1 className="font-sans font-medium text-[18px] leading-[1.5] tracking-normal text-center justify-center w-full h-[36px] text-3xl opacity-100 text-white ">
                       Application Form
                     </h1>
                     <button
                       onClick={() => setShowModal(false)}
                       className="absolute top-3 right-4 text-white text-xl"
                     >
                       <img
                         src={cross}
                         alt=""
                         className="mt-[0.4rem] h-[20px] w-[20px]"
                       />
                     </button>
                     <form className="space-y-4">
                       <div className="text-left">
                         <div className="mt-[2rem]">
                           <label
                             className="text-14 text-white uppercase ml-[0.5rem] "
                             style={{
                               fontFamily: "Inter",
                               fontWeight: 600,
                               fontSize: 14,
                             }}
                           >
                             Name
                           </label>
                           <input
                             name="name"
                             value={formData.name}
                             onChange={handleChange}
                             style={{
                               boxShadow:
                                 "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
                               fontFamily: "IBM Plex Mono",
                               fontWeight: 400,
                               wordWrap: "break-word",
                             }}
                             className="w-full pl-[1rem] bg-transparent border border-white/30 rounded-xl px-3 py-2 text-white "
                             placeholder="Enter your Full name"
                           />
                         </div>
                         <div className="flex mt-[0.5rem] gap-5">
                           <div>
                             <label
                               className=" text-white uppercase ml-[0.5rem]"
                               style={{
                                 fontFamily: "Inter",
                                 fontWeight: 600,
                                 fontSize: 14,
                               }}
                             >
                               Contact Number
                             </label>
                             <input
                               name="contact"
                               value={formData.contact}
                               onChange={handleChange}
                               onInput={(e) => {
                                 let val = e.target.value.replace(/[^0-9]/g, "");
         
                                 // If first diGitIcon is NOT 6,7,8,9 — block it
                                 if (val.length === 1 && !/^[6-9]/.test(val)) {
                                   val = "";
                                 }
         
                                 // Always limit to 10 diGitIcons
                                 val = val.slice(0, 10);
                                 e.target.value = val;
                               }}
                               style={{
                                 boxShadow:
                                   "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
                                 fontFamily: "IBM Plex Mono",
                                 fontWeight: 400,
                                 wordWrap: "break-word",
                               }}
                               className="w-[410px] pl-[1rem] bg-transparent border border-white/30 rounded-xl px-3 py-2 text-white"
                               placeholder="Enter your Contact no."
                             />
                           </div>
                           <div>
                             <label
                               className=" text-white uppercase ml-[0.5rem]"
                               style={{
                                 fontFamily: "Inter",
                                 fontWeight: 600,
                                 fontSize: 14,
                               }}
                             >
                               Email
                             </label>
                             <input
                               name="email"
                               value={formData.email}
                               onChange={handleChange}
                               onInput={(e) => {
                                 const val = e.target.value;
         
                                 // If the user types '@' and the domain isn't medicaps.ac.in, block it
                                 if (
                                   val.includes("@") &&
                                   !val.endsWith("@medicaps.ac.in")
                                 ) {
                                   // Optional: auto-replace domain
                                   const prefix = val.split("@")[0];
                                   e.target.value = prefix + "@medicaps.ac.in";
                                 }
                               }}
                               style={{
                                 boxShadow:
                                   "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
                                 fontFamily: "IBM Plex Mono",
                                 fontWeight: 400,
                                 wordWrap: "break-word",
                               }}
                               className="w-[420px] pl-[1rem] bg-transparent border border-white/30 rounded-xl px-3 py-2 text-white"
                               placeholder="Enter your Email ID"
                             />
                           </div>
                         </div>
                         <div className="flex mt-[0.5rem] gap-5">
                           <div>
                             <label
                               className=" text-white uppercase ml-[0.5rem] "
                               style={{
                                 fontFamily: "Inter",
                                 fontWeight: 600,
                                 fontSize: 14,
                               }}
                             >
                               Year
                             </label>
                             <Listbox
                               value={selectedYear}
                               onChange={(val) => {
                                 setSelectedYear(val);
                                 setFormData((prev) => ({ ...prev, year: val }));
                               }}
                             >
                               <div className="relative mt-1 w-[410px]">
                                 <Listbox.Button
                                   className="relative w-[412px] cursor-pointer rounded-xl bg-transparent border border-white/30 text-left px-4 py-2 text-white shadow-lg backdrop-blur-sm"
                                   style={{
                                     boxShadow:
                                       "2px 2px 4px #00000040, inset 2px 2px 6px #FFFFFF80",
                                     fontFamily: "IBM Plex Mono",
                                     fontWeight: 400,
                                     wordWrap: "break-word",
                                   }}
                                 >
                                   {selectedYear ? (
                                     selectedYear
                                   ) : (
                                     <span className="text-white opacity-50">
                                       Select your Year
                                     </span>
                                   )}
                                 </Listbox.Button>
                                 <Listbox.Options
                                   style={{
                                     boxShadow:
                                       "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
                                   }}
                                   className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-black/50 text-white shadow-lg backdrop-blur-sm border border-white/30"
                                 >
                                   {years.map((year, idx) => (
                                     <Listbox.Option
                                       key={idx}
                                       value={year}
                                       className={({ active }) =>
                                         `cursor-pointer px-4 py-2 ${
                                           active ? "bg-white/20" : "bg-transparent"
                                         }`
                                       }
                                     >
                                       {year}
                                     </Listbox.Option>
                                   ))}
                                 </Listbox.Options>
                               </div>
                             </Listbox>
                           </div>
                           <div>
                             <label
                               className="text-xs text-white uppercase ml-[0.5rem]"
                               style={{
                                 fontFamily: "Inter",
                                 fontWeight: 600,
                                 fontSize: 14,
                               }}
                             >
                               Branch
                             </label>
                             <Listbox
                               value={selectedBranch}
                               onChange={(val) => {
                                 setSelectedBranch(val);
                                 setFormData((prev) => ({ ...prev, branch: val }));
                               }}
                             >
                               <div className="relative mt-1">
                                 <Listbox.Button
                                   className="relative w-[410px] cursor-pointer rounded-xl bg-transparent border border-white/30 text-left px-4 py-2 text-white shadow-lg backdrop-blur-sm"
                                   style={{
                                     boxShadow:
                                       "2px 2px 4px #00000040, inset 2px 2px 6px #ffffff80",
                                     fontFamily: "IBM Plex Mono",
                                     fontWeight: 400,
                                     wordWrap: "break-word",
                                   }}
                                 >
                                   {selectedBranch ? (
                                     selectedBranch
                                   ) : (
                                     <span className="w-[410px] h-[40px] pl-[1rem] bg-transparent border-white/30 rounded-xl px-3 py-2 text-white opacity-50">
                                       Select your Branch
                                     </span>
                                   )}
                                 </Listbox.Button>
         
                                 <Listbox.Options
                                   style={{
                                     boxShadow:
                                       "2px 2px 4px 0px #00000040, inset 2px 2px 6px #ffffff80",
                                   }}
                                   className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-black/10 text-white shadow-lg backdrop-blur border border-white/30"
                                 >
                                   {branches.map((branch, idx) => (
                                     <Listbox.Option
                                       key={idx}
                                       value={branch}
                                       className={({ active }) =>
                                         `cursor-pointer px-4 py-2 ${
                                           active ? "bg-white/20 " : "bg-transparent "
                                         }`
                                       }
                                     >
                                       {branch}
                                     </Listbox.Option>
                                   ))}
                                 </Listbox.Options>
                               </div>
                             </Listbox>
                           </div>
                         </div>
                         <div className="flex mt-[0.5rem] gap-5">
                           <div>
                             <label
                               className="text-xs text-white uppercase ml-[0.5rem]"
                               style={{
                                 fontFamily: "Inter",
                                 fontWeight: 600,
                                 fontSize: 14,
                               }}
                             >
                               Enrollment Number
                             </label>
                             <input
                               name="enrollment"
                               value={formData.enrollment}
                               onChange={handleChange}
                               style={{
                                 boxShadow:
                                   "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
                                 fontFamily: "IBM Plex Mono",
                                 fontWeight: 400,
                                 wordWrap: "break-word",
                               }}
                               className="w-[410px] h-[40px] pl-[1rem] bg-transparent border border-white/30 rounded-xl px-3 py-2 text-white backdrop-opacity-50"
                               placeholder="Enter your Enrollment no."
                             />
                           </div>
                           <div>
                             <label
                               className="text-xs text-white uppercase ml-[0.5rem]"
                               style={{
                                 fontFamily: "Inter",
                                 fontWeight: 600,
                                 fontSize: 14,
                               }}
                             >
                               Position
                             </label>
                             <Listbox
                               value={selectedPosition}
                               onChange={(val) => {
                                 setSelectedPosition(val);
                                 setFormData((prev) => ({
                                   ...prev,
                                   position: val,
                                 }));
                               }}
                             >
                               <div className="relative mt-1 w-[420px]">
                                 <Listbox.Button
                                   className="relative w-full cursor-pointer rounded-xl bg-transparent border border-white/30 text-left px-4 py-2 text-white shadow-lg backdrop-blur-sm"
                                   style={{
                                     boxShadow:
                                       "2px 2px 4px #00000040, inset 2px 2px 6px #FFFFFF80",
                                     fontFamily: "IBM Plex Mono",
                                     fontWeight: 400,
                                     wordWrap: "break-word",
                                   }}
                                 >
                                   {selectedPosition ? (
                                     selectedPosition
                                   ) : (
                                     <span className="w-[410px] h-[40px] pl-[1rem] bg-transparent border-white/30 rounded-xl text-white opacity-50">
                                       Select Position to Apply
                                     </span>
                                   )}
                                 </Listbox.Button>
                                 <Listbox.Options
                                   style={{
                                     boxShadow:
                                       "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
                                   }}
                                   className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-black/10 text-white shadow-lg backdrop-blur-sm border border-white/30"
                                 >
                                   {positions.map((pos, idx) => (
                                     <Listbox.Option
                                       key={idx}
                                       value={pos}
                                       className={({ active }) =>
                                         `cursor-pointer px-4 py-2 ${
                                           active ? "bg-white/20" : "bg-transparent"
                                         }`
                                       }
                                     >
                                       {pos}
                                     </Listbox.Option>
                                   ))}
                                 </Listbox.Options>
                               </div>
                             </Listbox>
                           </div>
                         </div>
                       </div>
         
                       <div>
                         <label
                           className=" text-white uppercase ml-[0.5rem] flex"
                           style={{
                             fontFamily: "Inter",
                             fontWeight: 600,
                             fontSize: 14,
                           }}
                         >
                           Past Experiences (Optional)
                         </label>
                         <textarea
                           name="experience"
                           value={formData.experience}
                           onChange={handleChange}
                           style={{
                             boxShadow:
                               "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
                             fontFamily: "IBM Plex Mono",
                             fontWeight: 400,
                             wordWrap: "break-word",
                           }}
                           rows={3}
                           className="w-full pl-[1rem] border border-white/30 rounded-xl px-3 py-2 text-white "
                           placeholder="Mention past experiences if any"
                         />
                       </div>
         
                       <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
                         <label className="flex items-center gap-2 cursor-pointer">
                           <input
                             type="file"
                             onChange={handleFileChange}
                             className="hidden"
                           />
                           <div className="flex items-center bg-[#2B88A8] text-white text-sm px-4 py-2 rounded-md font-semibold text-[14px] cursor-pointer hover:opacity-90 w-fit">
                             <img
                               src={attachicon}
                               alt="PlusButton"
                               className="w-3 h-3 mr-2"
                             />
                             ATTACH RESUME
                           </div>
         
                           {resumeFile && (
                             <span className="text-white text-xs">
                               {resumeFile.name}
                             </span>
                           )}
                         </label>
                         <button
                           type="button"
                           onClick={handleApply}
                           className="bg-[#2B88A8] text-white font-semibold px-6 py-2 rounded-md mt-4 sm:mt-0"
                         >
                           APPLY
                         </button>
                       </div>
                     </form>
                   </div>
                 </div>
               )}
        </div>
      </div>
    </div>
  );
};

export default Career;
