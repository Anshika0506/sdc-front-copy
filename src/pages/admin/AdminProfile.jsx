import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import trash from "../../assets/delete.png";
import save from "../../assets/save.png";
import cross from "../../assets/cross.svg";
import edit from "../../assets/edit.png";
import icons from "../../assets/icons.png";

const initialQueries = [
  {
    AdminId: "01",
    name: "Kailash Chandra Bandhu",
    email: "kailashchandrabandhu@mail.com",
    contact: "1234567890",
    Password: "sdcchairman",
  },
  {
    AdminId: "02",
    name: "President SDC",
    email: "president@sdc.com",
    contact: "0987654321",
    Password: "sdcpresident",
  },
  {
    AdminId: "03",
    name: "Vice President SDC",
    email: "vicepresident@sdc.com",
    contact: "1122334455",
    Password: "sdcvicepresident",
  },
  {
    AdminId: "2024-07-01",
    name: "John Doe",
    email: "john@example.com",
    contact: "123-456-7890",
    Password: "General inquiry about services.",
  },
  {
    AdminId: "2024-07-02",
    name: "Jane Smith",
    email: "jane@example.com",
    contact: "098-765-4321",
    Password: "Service outage report.",
  },
  {
    AdminId: "2024-07-03",
    name: "Peter Jones",
    email: "peter@example.com",
    contact: "111-222-3333",
    Password: "Account creation assistance.",
  },
];

const AdminProfile = () => {
  const [page, setPage] = useState(1);
  const [queries, setQueries] = useState(initialQueries);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
  const contentRef = useRef(null);

  const itemsPerPage = 3;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedQueries = queries.slice(startIndex, startIndex + itemsPerPage);

  const openChangePasswordModal = () => setShowChangePasswordModal(true);
  const closeChangePasswordModal = () => setShowChangePasswordModal(false);
  // const openEditDetailsModal = () => setShowEditDetailsModal(true);
  const closeEditDetailsModal = () => setShowEditDetailsModal(false);
const [editDetails, setEditDetails] = useState({
  name: initialQueries[0].name,
  contact: initialQueries[0].contact,
  email: initialQueries[0].email,
});
const openEditDetailsModal = () => {
  setEditDetails({
    name: queries[0].name,
    contact: queries[0].contact,
    email: queries[0].email,
  });
  setShowEditDetailsModal(true);
};

  // ✅ Hide header/sidebar when modals are open
  useEffect(() => {
    const header = document.querySelector(".header");
    const sidebar = document.querySelector(".sidebar");

    const shouldHide = showChangePasswordModal || showEditDetailsModal;

    if (header) header.style.display = shouldHide ? "none" : "block";
    if (sidebar) sidebar.style.display = shouldHide ? "none" : "block";

    // Optional cleanup if component unmounts
    return () => {
      if (header) header.style.display = "block";
      if (sidebar) sidebar.style.display = "block";
    };
  }, [showChangePasswordModal, showEditDetailsModal]);

  return (
    <div className="w-[1136px] h-[855px] absolute top-[132px] left-[272px]">
      <div className="w-[1136px] h-[60px] flex justify-between items-center px-[28px] py-[8px] bg-[#8E8E8E] rounded-t-2xl">
        <h2 className="text-[#333333] font-semibold text-2xl">Admin Details</h2>
      </div>

      <div className="w-full h-[722px] bg-[#141414] rounded-b-xl shadow-[2px_2px_6px_0px_#FFFFFF26] flex flex-col">
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto scroll-container relative"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#4a4a4a #1a1a1a",
            msOverflowStyle: "auto",
          }}
        >
          <style>{`
            .scroll-container::-webkit-scrollbar {
              width: 6px;
            }
            .scroll-container::-webkit-scrollbar-track {
              background: #1a1a1a;
              border-radius: 3px;
            }
            .scroll-container::-webkit-scrollbar-thumb {
              background: #4a4a4a;
              border-radius: 3px;
            }
            .scroll-container::-webkit-scrollbar-thumb:hover {
              background: #5a5a5a;
            }
          `}</style>

          {paginatedQueries.length > 0 ? (
            paginatedQueries.map((query, index) => (
              <div
                key={index}
                className={`w-full text-white flex justify-between items-start pt-4 pb-8 ${
                  index !== paginatedQueries.length - 1 || queries.length > itemsPerPage * page
                    ? "border-b border-white border-opacity-20"
                    : ""
                }`}
              >
                <div className="flex-1 pl-10 pr-4">
                  <p className="text-base p-1">
                    <strong className="text-[#8E8E8E]">Admin ID:</strong> {query.AdminId}
                  </p>
                  <p className="text-base p-1">
                    <strong className="text-[#8E8E8E]">Name:</strong> {query.name}
                  </p>
                  <p className="text-base p-1">
                    <strong className="text-[#8E8E8E]">Contact Number:</strong> {query.contact}
                  </p>
                  <p className="text-base p-1">
                    <strong className="text-[#8E8E8E]">Email:</strong> {query.email}
                  </p>
                  <p className="text-base p-1">
                    <strong className="text-[#8E8E8E]">Password:</strong> {query.Password}
                  </p>
                </div>

                {index === 0 && (
                  <div className="p-4 flex flex-col justify-start items-center gap-4 mt-10 mr-10">
                    <button
                      onClick={openChangePasswordModal}
                      className="w-[260px] h-[45px] flex items-center justify-center gap-[8px] rounded-md px-4 py-2 bg-[#ACACAC0D] border border-white backdrop-blur-[4px] shadow-custom cursor-pointer"
                    >
                      <img src={icons} alt="change password" className="w-5 h-5" />
                      <span className="text-white font-semibold text-base uppercase">
                        CHANGE PASSWORD
                      </span>
                    </button>
                    <button
                      onClick={openEditDetailsModal}
                      className="w-[260px] h-[45px] flex items-center justify-center gap-[8px] rounded-md px-4 py-2 bg-[#ACACAC40] border border-white backdrop-blur-[4px] shadow-custom cursor-pointer"
                    >
                      <img src={edit} alt="edit" className="w-6 h-6" />
                      <span className="text-white font-semibold text-base uppercase">
                        EDIT DETAILS
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-white text-center text-base py-10">No admin details to display.</p>
          )}
        </div>
      </div>

      {/* Modals are already defined below, no change needed there */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-[#000000CC] flex items-center justify-center z-[9999]">
          {/* Modal content... */}
            
          <div className="w-[1094px] h-[411px] bg-[#1a1a1a] opacity-100 rotate-0 rounded-2xl shadow-[0px_4px_10px_0px_#00000040] relative">
            <div className="w-full h-[60px] flex justify-between items-center px-6 py-4 bg-[#8E8E8E] opacity-100 rotate-0 rounded-t-2xl">
                <h3 style={{fontWeight:"600" ,fontSize:24}}className="text-[#333333] p-1 font-inter font-semibold leading-[24px] tracking-[0.02em] h-[32px] w-[270px]">
                    Change Your Password
                </h3>
                <button
                    onClick={closeChangePasswordModal}
                    // className="w-[25px] h-[25px]"
                    // className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#0303030d] border border-white backdrop-blur-[4px] shadow-[2px_4px_4px_0px_#00000040,inset_2px_2px_8px_0px_#FFFFFF40] cursor-pointer"
                >
                    <img src={cross} alt="close" className="w-[25px] h-[25px]" />
                </button>
            </div>

            <form className="flex flex-col gap-1 ">
              <div className="p-8 ">
              <label className="text-white font-mono text-base font-bold leading-[24px] tracking-[0.02em] uppercase">
                OLD PASSWORD
              </label>
              <input
                type="password"
                placeholder="sdcchairman"
               className="w-[1018px] font-mono mb-2 px-3 py-2 rounded-md text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)]"
                // className="w-full h-[45px] p-3 rounded-md bg-[#ACACAC0D] border border-white backdrop-blur-[4px] shadow-[2px_4px_4px_0px_#00000040,inset_2px_2px_8px_0px_#FFFFFF40] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#8E8E8E]"
                // defaultValue="sdcchairman"
              />

              <label className="text-white font-mono text-base font-bold leading-[24px] tracking-[0.02em] uppercase">
                NEW PASSWORD
              </label>
              <input
                type="password"
                placeholder="sdcchairperson"
                 className="w-[1018px] font-mono mb-2 px-3 py-2 rounded-md text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)]"
                // className="w-full h-[45px] p-3 rounded-md bg-[#ACACAC0D] border border-white backdrop-blur-[4px] shadow-[2px_4px_4px_0px_#00000040,inset_2px_2px_8px_0px_#FFFFFF40] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#8E8E8E]"
                // defaultValue="sdcchairperson"
              />

                 <label className="text-white font-mono text-base font-bold leading-[24px] tracking-[0.02em] uppercase">
                RE-ENTER NEW PASSWORD
              </label>
              <input
                type="password"
                placeholder="sdcchairperson"
                 className="w-[1018px] font-mono px-3 py-2 rounded-md text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)]"
                // className="w-full h-[45px] p-3 rounded-md bg-[#ACACAC0D] border border-white backdrop-blur-[4px] shadow-[2px_4px_4px_0px_#00000040,inset_2px_2px_8px_0px_#FFFFFF40] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#8E8E8E]"
                // defaultValue="sdcchairperson"
              /></div>
<div className="h-[73px] w-[1094px] flex justify-end  bg-[#303030]/60 rounded-b-xl border-t border-[#5a5a5a] shrink-0">
              <button
                type="submit"
               className='font-mono my-3 mx-7 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[254px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-3 px-4 gap-3 '
                // className="w-[280px] h-[45px] flex items-center justify-center gap-[8px] rounded-md px-4 py-2 bg-[#ACACAC0D] border border-white backdrop-blur-[4px] shadow-[2px_4px_4px_0px_#00000040,inset_2px_2px_8px_0px_#FFFFFF40] cursor-pointer mx-auto mt-6"
                onClick={(e) => { e.preventDefault(); alert("Password Updated!"); closeChangePasswordModal(); }}
              ><img src={save} alt="" className='h-[25px] w-[25px]' />
                <span className="text-white font-semibold text-base leading-[24px] uppercase">
                  UPDATE NEW PASSWORD
                </span>
              </button></div>
            </form>
          </div>
        </div>
        
      )}

      {showEditDetailsModal && (
        <div className="fixed inset-0 bg-[#000000CC] flex items-center justify-center z-[9999]">
          {/* Modal content... */}
          
           <div className="w-[1094px] h-[411px] bg-[#1a1a1a]  opacity-100 rotate-0 rounded-2xl shadow-[0px_4px_10px_0px_#00000040] relative">
             <div className="w-full h-[60px] flex justify-between items-center px-6 py-4 bg-[#8E8E8E] opacity-100 rotate-0 rounded-t-2xl">
                 <h3 className="text-[#333333] font-inter text-xl font-semibold leading-[24px] tracking-[0.02em] w-full">
                    Edit Admin Details
                </h3>
                <button
                    onClick={closeEditDetailsModal}
                    // className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#ACACAC0D] border border-white backdrop-blur-[4px] shadow-[2px_4px_4px_0px_#00000040,inset_2px_2px_8px_0px_#FFFFFF40] cursor-pointer"
                >
               <img src={cross} alt="close" className="w-[25px] h-[25px]" />
               </button>
             </div>

             <form className="flex flex-col  ">
              <div className="p-8">
              <label className="text-white  not-odd:font-mono text-base font-bold leading-[24px] tracking-[0.02em] uppercase">
                NAME
              </label>
              <input
                type="text"
                value={editDetails.name}
                placeholder="Kailash Chandra Bandhu"
                onChange={(e) => setEditDetails({ ...editDetails, name: e.target.value })}
                // defaultValue={initialQueries[0].name}
              className="w-[1018px] font-mono mb-2 px-3 py-2 rounded-md text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)]"
                // className="w-full h-[45px] p-3 mb-2 rounded-md bg-[#ACACAC0D] border border-white backdrop-blur-[4px] shadow-[2px_4px_4px_0px_#00000040,inset_2px_2px_8px_0px_#FFFFFF40] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#8E8E8E]"
              />

             <label className="text-white font-mono text-base font-bold leading-[24px] tracking-[0.02em] uppercase mt-2">
                CONTACT NUMBER
              </label>
              <input
               type="text"
                placeholder="1234567890"
                 value={editDetails.contact}
  onChange={(e) => setEditDetails({ ...editDetails, contact: e.target.value })}
                // defaultValue={initialQueries[0].contact}
               className="w-[1018px] font-mono px-3 py-2 mb-2 rounded-md text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)]"
                // className="w-full h-[45px] p-3 mb-2 rounded-md bg-[#ACACAC0D] border border-white backdrop-blur-[4px] shadow-[2px_4px_4px_0px_#00000040,inset_2px_2px_8px_0px_#FFFFFF40] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#8E8E8E]"
              />

             <label className="text-white font-mono text-base font-bold leading-[24px] tracking-[0.02em] uppercase mt-2">
                EMAIL
              </label>
              <input
                type="email"
                placeholder="kailashchandrabandhu@mail.com"
                 value={editDetails.email}
  onChange={(e) => setEditDetails({ ...editDetails, email: e.target.value })}
                // defaultValue={initialQueries[0].email}
                className="w-[1018px] font-mono px-3 py-2 rounded-md text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)]"
                // className="w-full h-[45px] p-3 rounded-md bg-[#ACACAC0D] border border-white backdrop-blur-[4px] shadow-[2px_4px_4px_0px_#00000040,inset_2px_2px_8px_0px_#FFFFFF40] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#8E8E8E]"
              />
</div>
<div className="h-[75px] w-[1094px] flex justify-end  bg-[#303030]/60 rounded-b-xl  shrink-0">
              <button
                type="submit"
                 className='font-mono my-4 mx-7 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[105px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2.5 px-4 gap-3 '
                // className="w-[280px] h-[45px] flex items-center justify-center gap-[8px] rounded-md px-4 py-2 bg-[#ACACAC0D] border border-white backdrop-blur-[4px] shadow-[2px_4px_4px_0px_#00000040,inset_2px_2px_8px_0px_#FFFFFF40] cursor-pointer mx-auto mt-6"
                // onClick={(e) => { e.preventDefault(); alert("Details Updated!"); closeEditDetailsModal(); }}
                onClick={(e) => {
  e.preventDefault();

  // Update the first admin detail
  const updatedQueries = [...queries];
  updatedQueries[0] = {
    ...updatedQueries[0],
    ...editDetails,
  };
  setQueries(updatedQueries);

  alert("Details Updated!");
  closeEditDetailsModal();
}}

              >  <img src={save} alt="" className='h-[22px] w-[22px]' />
              <span className="text-white font-semibold font-mono text-base leading-[24px] uppercase">
                    SAVE
                  </span>
                </button></div>
              </form>
            </div>
</div>
      
      )}
    </div>
  );
};

export default AdminProfile;