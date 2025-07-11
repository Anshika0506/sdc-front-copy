import React, { useState } from "react";
import hide from "../../assets/hide.png";
import save from "../../assets/save.png";
import add from "../../assets/add.png";
import edit from "../../assets/edit.png";
import deletei from "../../assets/delete.png";
import cross from "../../assets/Group.svg";
import pencil from "../../assets/pencil.png";
import frame1 from "../../assets/profile1.jpg";
import frame2 from "../../assets/profile1.jpg";
import frame3 from "../../assets/profile1.jpg";
import frame4 from "../../assets/profile1.jpg";
import frame7 from "../../assets/profile1.jpg";
import frame8 from "../../assets/profile1.jpg";
import frame9 from "../../assets/profile1.jpg";

const Main = () => {

  const [newGalleryImage, setNewGalleryImage] = useState(null);
  const [newGalleryName, setNewGalleryName] = useState("");

  const [currentEdit, setCurrentEdit] = useState({
    index: null,
    name: "",
    message: "",
    image: null,
  });
  const [frame1Img, setFrame1Img] = useState(frame1);
  const [frame2Img, setFrame2Img] = useState(frame2);
  const [frame3Img, setFrame3Img] = useState(frame3);
  const [frame4Img, setFrame4Img] = useState(frame4);
  const [frame7Img, setFrame7Img] = useState(frame7);
  const [frame8Img, setFrame8Img] = useState(frame8);
  const [frame9Img, setFrame9Img] = useState(frame9);
  const [galleryImages, setGalleryImages] = useState([
    { src: frame7, name: "Event Name" },
    { src: frame8, name: "Event Name" },
    { src: frame9, name: "Event Name" },
    { src: frame7, name: "Event Name" },
    { src: frame8, name: "Event Name" },
    { src: frame9, name: "Event Name" },
    { src: frame7, name: "Event Name" },
    { src: frame8, name: "Event Name" },
    { src: frame9, name: "Event Name" },
    { src: frame7, name: "Event Name" },
    { src: frame8, name: "Event Name" },
    { src: frame9, name: "Event Name" },
    { src: frame7, name: "Event Name" },
    { src: frame8, name: "Event Name" },
    { src: frame9, name: "Event Name" },
  ]);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingGallery, setIsEditingGallery] = useState(false);

  const handleDelete = (index) => {
    const updated = testimonials.filter((_, i) => i !== index);
    setTestimonials(updated);
  };

  return (
    <div className="w-[1136px] h-[856px] pb-[159px] pt-10 pl-7">
      <div className="w-[1136px] h-[60px] flex justify-between px-7 py-2 bg-[#8E8E8E] rounded-t-xl">
        <h1
          className="font-semibold text-[#333] py-1.5"
          style={{ fontFamily: "Inter", fontSize: 22, fontWeight: 600 }}
        >
          SDC Overview
        </h1>
        <div className="flex gap-4">
          <p
            className="py-2.5 font-mono text-[#333]"
            style={{ fontWeight: 400, fontSize: 16 }}
          >
            Page
          </p>
          <button
            style={{ fontWeight: 400, fontSize: 16 }}
            className="w-[59px] mt-1.5 h-[32px] mr-5 rounded-sm bg-[#D2D2D2] text-[#333] px-2 py-1 font-mono hover:bg-gray-300"
          >
            About
          </button>
        </div>
      </div>

      <div
        className="bg-[#1a1a1a] w-[1136px]  text-white font-sans rounded-b"
        style={{
          boxShadow: "4px 4px 8px rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="flex gap-4 ml-10 pt-4">
          <img src={frame1Img} alt="" className="w-[252px] h-[124px] " />
          <img src={frame2Img} alt="" className="w-[252px] h-[124px] " />
          <img src={frame3Img} alt="" className="w-[252px] h-[124px] " />

          <img src={frame4Img} alt="" className="w-[252px] h-[124px] " />
        </div>
        <div
          className="w-[1136px] h-[73px] mt-4 flex justify-between px-7 bg-[#30303099]/60"
          style={{ fontSize: 16, fontWeight: 600 }}
        >
          <div>
            {/* <button className='font-mono my-3 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[105px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2 gap-2 px-4'>
              <img src={hide} alt="" className='h-[25px] w-[25px]' />
              <p>HIDE</p>
            </button> */}
          </div>
          <div className="flex justify-end gap-5 mt-3">
            <button
              className="font-mono w-[105px] h-[45px] [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2 gap-2 px-4"
              onClick={() => setIsEditingAbout(true)}
            >
              <img src={edit} alt="edit" className="h-[25px] w-[25px]" />
              <p>EDIT </p>
            </button>
            <button
              onClick={() => setAboutImages([])}
              className="font-mono w-[125px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2 gap-2 px-3"
            >
              <img src={deletei} alt="delete" className="h-[25px] w-[25px]" />
              <p>DELETE</p>
            </button>
          </div>
        </div>
      </div>
      {/* Modal for editing all testimonials */}
      {isEditingAbout && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div
            className="bg-[#1a1a1a] w-[900px] max-h-[70vh] rounded-xl shadow-lg border border-[#5a5a5a] flex flex-col"
            style={{ boxShadow: "4px 4px 8px rgba(255, 255, 255, 0.2)" }}
          >
            {/* Fixed Header */}
            <div className="h-[60px] w-full flex justify-between items-center px-7 bg-[#8E8E8E] rounded-t-xl shrink-0">
              <h2
                className="text-[#333333]"
                style={{ fontFamily: "Inter", fontSize: 22, fontWeight: 600 }}
              >
                Edit SDC Overview
              </h2>
              <div className="h-[32px] w-[32px] rounded-sm p-1.5 bg-[#333333] cursor-pointer">
                <img
                  src={cross}
                  alt="close"
                  className="h-[20px] w-[20px]"
                  onClick={() => setIsEditingAbout(false)}
                />
              </div>
            </div>

            <div className="flex gap-4 ml-7 pt-4">
              <label className="relative w-[200px] h-[124px] flex items-center justify-center cursor-pointer">
                <img
                  src={frame1Img}
                  alt=""
                  className="w-[200px] h-[124px] rounded opacity-20"
                />
                <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-100">
                  <img src={pencil} alt="edit" className="w-[40px] h-[40px]" />
                </span>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFrame1Img(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              <label className="relative w-[200px] h-[124px] flex items-center justify-center cursor-pointer">
                <img
                  src={frame2Img}
                  alt=""
                  className="w-[200px] h-[124px] rounded opacity-20"
                />
                <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-100">
                  <img src={pencil} alt="edit" className="w-[40px] h-[40px]" />
                </span>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFrame2Img(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              <label className="relative w-[200px] h-[124px] flex items-center justify-center cursor-pointer">
                <img
                  src={frame3Img}
                  alt=""
                  className="w-[200px] h-[124px] rounded opacity-20"
                />
                <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-100">
                  <img src={pencil} alt="edit" className="w-[40px] h-[40px]" />
                </span>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFrame3Img(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              <label className="relative w-[200px] h-[124px] flex items-center justify-center cursor-pointer">
                <img
                  src={frame4Img}
                  alt=""
                  className="w-[200px] h-[124px] rounded opacity-20"
                />
                <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-100">
                  <img src={pencil} alt="edit" className="w-[40px] h-[40px]" />
                </span>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFrame4Img(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            {/* Sticky Footer */}
            <div className="h-[73px] mt-[4rem] flex justify-end gap-3 px-6 py-1 bg-[#30303099]/30 rounded-b-xl border-t border-[#5a5a5a] shrink-0 ">
              <button
                onClick={() => setIsEditingAbout(false)}
                className="font-mono my-3 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[105px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2.5 gap-2 px-4"
              >
                <img src={save} alt="" className="h-[25px] w-[25px]" />
                <p>SAVE</p>
              </button>
              {/* <button
                className="font-mono my-3 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[135px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2.5 gap-2 px-4"
                onClick={() => {
                  // Check if any testimonial is blank
                  const hasBlank = testimonials.some(
                    (t) => !t.name.trim() || !t.message.trim()
                  );
                  if (hasBlank) {
                    alert(
                      "Please fill all fields (name, image, content) before adding a new testimonial."
                    );
                    return;
                  }
                  setTestimonials([
                    {
                      image: "",
                    },
                    ...testimonials,
                  ]);
                }}
              >
                <img src={add} alt="" />
                <p> ADD NEW</p>
              </button> */}
            </div>
          </div>
        </div>
      )}

      <div className="w-[1136px] h-[60px] flex justify-between px-7 py-2 bg-[#8E8E8E] rounded-t-xl mt-14">
        <h1
          className="font-semibold text-[#333] py-1.5"
          style={{ fontFamily: "Inter", fontSize: 22, fontWeight: 600 }}
        >
          Gallery
        </h1>
        <div className="flex gap-4">
          <p
            className="py-2.5 font-mono text-[#333]"
            style={{ fontWeight: 400, fontSize: 16 }}
          >
            Page
          </p>
          <button
            style={{ fontWeight: 400, fontSize: 16 }}
            className="w-[75px] mt-1.5 h-[32px] mr-5 rounded-sm bg-[#D2D2D2] text-[#333] px-2 py-1 font-mono hover:bg-gray-300"
          >
            Gallery
          </button>
        </div>
      </div>

      <div
        className="bg-[#1a1a1a] w-[1136px]  text-white font-sans rounded-b"
        style={{
          boxShadow: "4px 4px 8px rgba(255, 255, 255, 0.2)",
        }}
      >
        <div
          className="bg-[#1a1a1a] w-[1136px] h-[310px] text-white font-sans rounded-b flex flex-col"
          style={{
            boxShadow: "4px 4px 8px rgba(255, 255, 255, 0.2)",
          }}
        >
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-3 gap-4 p-4 ml-4 mr-4">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={img.src}
                    alt=""
                    className="w-[250px] h-[180px] rounded"
                  />
                  <p className="font-mono mt-2 text-center">{img.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="w-full h-[73px] flex-shrink-0 flex justify-between px-7 bg-[#30303099]/60 items-center"
            style={{ fontSize: 16, fontWeight: 600 }}
          >
            <div>{/* ...footer left... */}</div>
            <div className="flex justify-end gap-5">
              <button
                className="font-mono w-[105px] h-[45px] [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2 gap-2 px-4"
                onClick={() => setIsEditingGallery(true)}
              >
                <img src={edit} alt="edit" className="h-[25px] w-[25px]" />
                <p>EDIT </p>
              </button>
              <button
                onClick={() => setGalleryImages([])}
                className="font-mono w-[125px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2 gap-2 px-3"
              >
                <img src={deletei} alt="delete" className="h-[25px] w-[25px]" />
                <p>DELETE</p>
              </button>
            </div>
          </div>
        </div>
        {/* Modal for editing all testimonials */}

        {isEditingGallery && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div
              className="bg-[#1a1a1a] w-[900px] max-h-[60vh] rounded-xl shadow-lg border border-[#5a5a5a] flex flex-col"
              style={{ boxShadow: "4px 4px 8px rgba(255, 255, 255, 0.2)" }}
            >
              {/* Fixed Header */}
              <div className="h-[60px] w-full flex justify-between items-center px-7 bg-[#8E8E8E] rounded-t-xl shrink-0">
                <h2
                  className="text-[#333333]"
                  style={{ fontFamily: "Inter", fontSize: 22, fontWeight: 600 }}
                >
                  Edit Testimonials
                </h2>
                <div className="h-[32px] w-[32px] rounded-sm p-1.5 bg-[#333333] cursor-pointer">
                  <img
                    src={cross}
                    alt="close"
                    className="h-[20px] w-[20px]"
                   onClick={() => {
  const hasBlank = galleryImages.some(
    (img) => !img.name.trim() || !img.src?.trim()
  );
  if (hasBlank) {
    alert("Please fill all fields (image and title) before saving.");
    return;
  }
  setIsEditingGallery(false); // Only close if valid
}}
                  />
                </div>
              </div>

              {/* Gallery content editing fields go here */}
              
              <div className="grid grid-cols-2 gap-8 px-6 pb-4 overflow-y-auto max-h-[300px]">
  {galleryImages.map((img, idx) => (
    <div key={idx} className="flex flex-col items-center gap-3  rounded-md">
      {/* Image Upload + Preview */}
      <label className="relative w-[250px] h-[230px] rounded-md cursor-pointer ">
        <img
          src={img.src}
          alt=""
          className="w-[250px] h-[230px] object-cover rounded-md opacity-20 border-2 border-white"
        />
        <span className="pointer-events-none absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-100">
                  <img src={pencil} alt="edit" className="w-[40px] h-[40px]" />
                </span>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                const updatedImages = [...galleryImages];
                updatedImages[idx].src = reader.result;
                setGalleryImages(updatedImages);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        
      </label>

      {/* Editable Title + Delete Button */}
     {/* <div className="flex"> */}
      <label htmlFor="" className="font-mono mr-68 ">TITLE</label>
       <div className="flex gap-3 items-center ml-5">
        <input
          type="text"
          className="bg-[#ACACAC40]/25 text-white font-mono backdrop-blur-[4px] shadow-[2px_4px_4px_rgba(0,0,0,0.25),inset_2px_2px_8px_rgba(255,255,255,0.25)] px-4 py-3 w-[300px] h-[44px] rounded-md hover:border hover:border-[#FFFFFF]"
          value={img.name}
          onChange={(e) => {
            const updatedImages = [...galleryImages];
            updatedImages[idx].name = e.target.value;
            setGalleryImages(updatedImages);
          }}
        /> 
        <button
          onClick={() => {
            const updated = galleryImages.filter((_, i) => i !== idx);
            setGalleryImages(updated);
          }}
          className="w-[40px] h-[40px] rounded-xl bg-[#ACACAC40]/60 text-white flex items-center justify-center"
        >
          <img src={deletei} alt="delete" className="h-[20px] w-[20px]" />
        </button>
      </div>
    </div>
  ))}
</div>


              {/* Sticky Footer */}
              <div className="h-[73px] flex justify-end gap-3 px-6 py-1 bg-[#30303099]/30 rounded-b-xl border-t border-[#5a5a5a] shrink-0 ">
                <button
                onClick={() => {
  const hasBlank = galleryImages.some(
    (img) => !img.name.trim() || !img.src?.trim()
  );
  if (hasBlank) {
    alert("Please fill all fields (image and title) before saving.");
    return;
  }
  setIsEditingGallery(false); // Only close if valid
}}

                  className="font-mono my-3 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[105px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2.5 gap-2 px-4"
                >
                  <img src={save} alt="" className="h-[25px] w-[25px]"
                 
 />
                  <p>SAVE</p>
                </button>
                <button
                  className="font-mono my-3 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[135px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2.5 gap-2 px-4"
                    onClick={() => {
  const hasBlank = galleryImages.some(
    (t) => !t.name.trim() || !t.src?.trim()
  );
  if (hasBlank) {
    alert("Please fill all fields (image and title) before adding a new gallery image.");
    return;
  }

  setGalleryImages([
    {
      src: '',
      name: '',
    },
    ...galleryImages,
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
    </div>
  );
};

export default Main;