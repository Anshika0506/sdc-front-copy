import React, { useState } from 'react';
import profile1 from "../../assets/alumni1.svg";
import profile2 from "../../assets/alumni1.svg";
import profile3 from "../../assets/alumni1.svg";
import hide from "../../assets/hide.png";
import save from "../../assets/save.png";
import add from "../../assets/add.png";
import edit from "../../assets/edit.png";
import deletei from "../../assets/delete.png";
import cross from "../../assets/group.svg";
import pencil from "../../assets/pencil.png";

const HomePage = () => {
  const initialData = [
    {
      name: "Client Name 1",
      image: profile1,
      message:
        "Creature die potter knickerbocker elf treats ravenclaw witch splinched. Weasley lily crossbow tell grayback bagman seek betrayal. Wronski betrayal floor seven keeper petrificus again.",
    },
    {
      name: "Client Name 2",
      image: profile2,
      message:
        "Captivity splinched law juice from a lemon knew. Creature die potter knickerbocker elf treats ravenclaw witch splinched. Weasley lily crossbow tell grayback bagman seek betrayal. Wronski betrayal floor seven keeper petrificus again.",
    },
    {
      name: "Client Name 3",
      image: profile3,
      message:
        "Captivity splinched law juice from a lemon knew. Creature die potter knickerbocker elf treats ravenclaw witch splinched. Weasley lily crossbow tell grayback bagman seek betrayal. Wronski betrayal floor seven keeper petrificus again.",
    },
    {
      name: "Client Name 4",
      image: profile1,
      message:
        "Another testimonial for scroll testing. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.",
    },
    {
      name: "Client Name 5",
      image: profile2,
      message:
        "Fifth testimonial for scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.",
    },
    {
      name: "Client Name 6",
      image: profile3,
      message:
        "Sixth testimonial for scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.",
    },
  ];

  const [testimonials, setTestimonials] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({ index: null, name: '', message: '', image: null });

  const handleDelete = (index) => {
    const updated = testimonials.filter((_, i) => i !== index);
    setTestimonials(updated);
  };

  return (
    <div className='w-[1136px] min-h-screen pt-6 pl-7 bg-transparent'>
      {/* Header */}
      <div className='w-[1136px] h-[60px] flex justify-between px-7 py-2 bg-[#8E8E8E] rounded-t-xl mb-0'>
        <h1 className="font-semibold text-[#333333] py-1" style={{ fontFamily: "Inter", fontSize: 24, fontWeight: 600 }}>Testimonials</h1>
        <div className='flex gap-4'>
          <p className='py-2.5 font-mono' style={{ fontWeight: 400, fontSize: 16 }}>Page</p>
          <button
            style={{ fontWeight: 400, fontSize: 16 }}
            className="w-[59px] mt-1.5 h-[32px] mr-5 rounded-sm bg-[#D2D2D2] text-black px-3 py-1 font-mono hover:bg-gray-300">
            Home
          </button>
        </div>
      </div>

      {/* Testimonial Section - shifted up, no outside scroll, only inside scroll */}
      <div className="bg-[#1a1a1a] w-[1136px] h-[637px] text-white font-sans rounded-b flex flex-col justify-between mt-0"
        style={{
          boxShadow: '4px 4px 8px rgba(255, 255, 255, 0.2)',
        }}>
        {/* Testimonial Cards Slide */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: 500, minHeight: 500 }}>
          {testimonials.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className='h-[188px] rounded-[4.4068px] w-[186px]'>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[130px] h-[130px] px-1 py-1 mt-6 ml-12 object-cover bg-[#FFFFFF] rounded-[4.4068px]"
                />
              </div>

              <div className="flex-1 py-3 px-7 w-[892px] h-[120px] text-justify">
                <p className="text-white font-semibold mb-1 font-mono" style={{ fontWeight: 600, fontSize: 16 }}>{item.name}</p>
                <p className="text-gray-300 font-mono" style={{ fontWeight: 400, fontSize: 16 }}>{item.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Controls */}
        <div className='w-[1136px] h-[73px] flex justify-between px-7 bg-[#30303099]/60' style={{ fontSize: 16, fontWeight: 600 }}>
          <div>
            <button className='font-mono my-3 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[105px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2 gap-2 px-4'>
              <img src={hide} alt="" className='h-[25px] w-[25px]' />
              <p>HIDE</p>
            </button>
          </div>
          <div className="flex justify-end gap-5 mt-3">
            <button
              className='font-mono w-[105px] h-[45px] [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2 gap-2 px-4'
              onClick={() => setIsEditing(true)}
            >
              <img src={edit} alt="edit" className='h-[25px] w-[25px]' />
              <p>EDIT </p>
            </button>
            <button
              onClick={() => setTestimonials([])}
              className='font-mono w-[125px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2 gap-2 px-3'
            >
              <img src={deletei} alt="delete" className='h-[25px] w-[25px]' />
              <p>DELETE</p>
            </button>
          </div>
        </div>
      </div>


      {/* Modal for editing all testimonials */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div
            className="bg-[#1a1a1a] w-[900px] max-h-[70vh] rounded-xl shadow-lg border border-[#5a5a5a] flex flex-col"
            style={{ boxShadow: '4px 4px 8px rgba(255, 255, 255, 0.2)' }}
          >
            {/* Fixed Header */}
            <div className="h-[60px] w-full flex justify-between items-center px-7 bg-[#8E8E8E] rounded-t-xl shrink-0">
              <h2
                className="text-[#333333]"
                style={{ fontFamily: 'Inter', fontSize: 22, fontWeight: 600 }}
              >
                Edit Testimonials
              </h2>
              <div className="h-[32px] w-[32px] rounded-sm p-1.5 bg-[#333333] cursor-pointer">
                <img
                  src={cross}
                  alt="close"
                  className="h-[20px] w-[20px]"
                  onClick={() => setIsEditing(false)}
                />
              </div>
            </div>

            {/* Scrollable Content for all testimonials */}
            <div className="overflow-y-auto px-6 py-4 flex-1" style={{ maxHeight: '70vh' }}>
              {testimonials.map((item, idx) => (
                <div key={idx} className="flex mb-5">
                  <div className='w-[186px] h-[130px] gap-[10px] py-4 px-3 flex flex-col items-center'>
                    <label htmlFor={`file-upload-${idx}`} className="cursor-pointer relative">
                      <img
                        src={item.image}
                        alt=""
                        // Remove group-hover, keep opacity and overlay always ON
                        className="h-[100px] w-[100px] rounded mb-2 opacity-20 transition-opacity duration-200"
                      />
                      <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 flex items-center justify-center">
                        <img src={pencil} alt="" className='w-[30px] h-[30px]'/>
                      </span>
                    </label>
                    <input
                      id={`file-upload-${idx}`}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={e => {
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const updated = testimonials.map((t, i) => i === idx ? { ...t, image: reader.result } : t);
                            setTestimonials(updated);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <label
                      htmlFor={`file-upload-${idx}`}
                      className="cursor-pointer  px-3 py-1 rounded text-sm mt-1"
                    >
                      
                    </label>
                  </div>
                  <div className='flex-1 py-3 px-7 gap-1'>
                    <label className="block text-sm text-gray-300 mb-1" style={{fontFamily:"Inter",fontWeight:600,fontSize:14}}>TITLE</label>
                    <input
                      type="text"
                      value={item.name}
                      placeholder='Client Name'
                      onChange={e => {
                        const updated = testimonials.map((t, i) => i === idx ? { ...t, name: e.target.value } : t);
                        setTestimonials(updated);
                      }}
                      className="w-[549px] font-mono px-3 py-2 rounded-md text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)]"
                    />
                    <label className=" block text-sm text-gray-300 mt-2" style={{fontFamily:"Inter",fontWeight:600,fontSize:14}}>CONTENT</label>
                    <textarea
                      value={item.message}
                      onChange={e => {
                        const updated = testimonials.map((t, i) => i === idx ? { ...t, message: e.target.value } : t);
                        setTestimonials(updated);
                      }}
                      placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsum maiores vitae totam cupiditate quidem nostrum dolorum est dolor rerum."
                      className="w-[559px] mt-1 h-[150px] px-3 py-2 rounded-md font-mono text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)]"
                    ></textarea>
                  </div>
                  <div className="flex flex-col justify-center ">
                    <button
                      onClick={() => {
                        const updated = testimonials.filter((_, i) => i !== idx);
                        setTestimonials(updated);
                      }}
                      className='font-mono w-[40px] h-[40px] rounded-xl bg-[#ACACAC40]/60  text-white flex items-center justify-center mb-40 '
                    >
                      <img src={deletei} alt="delete" className='h-[20px] w-[20px]' />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Footer */}
            <div className="h-[73px] flex justify-end gap-3 px-6 py-1 bg-[#30303099]/30 rounded-b-xl border-t border-[#5a5a5a] shrink-0">
              <button
                onClick={() => setIsEditing(false)}
                className='font-mono my-3 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[105px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2.5 gap-2 px-4'
              >
                <img src={save} alt="" className='h-[25px] w-[25px]' />
                <p>SAVE</p>
              </button>
              <button
                className='font-mono my-3 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[135px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2.5 gap-2 px-4'
                onClick={() => {
                  setTestimonials([
                    ...testimonials,
                    {
                      name: '',
                      image: '',
                      message: '',
                    },
                  ]);
                }}
              >
                <img src={add} alt="" />
                <p> ADD NEW</p>
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default HomePage;