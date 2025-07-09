import React, { useEffect, useState } from 'react';
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

import { getTestimonials } from '../../api/Admin/Testimonial/getTestimonials';
import { addTestimonial } from '../../api/Admin/Testimonial/addTestimonial';
import { updateTestimonial } from '../../api/Admin/Testimonial/updateTestimonial';
import { deleteTestimonial } from '../../api/Admin/Testimonial/deleteTestimonial';

const HomePage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [imageFiles, setImageFiles] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch testimonials on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getTestimonials();
        console.log('Fetched testimonials:', response.data);
        const data = response.data;
        // Ensure data is an array
        if (Array.isArray(data)) {
          
          // Directly set testimonials if data is an array
          setTestimonials(data);
        } else if (data && Array.isArray(data.data)) {
          // Handle case where API returns { data: [...] }
          setTestimonials(data.data);
        } else if (data && Array.isArray(data.testimonials)) {
          // Handle case where API returns { testimonials: [...] }
          setTestimonials(data.testimonials);
        } else {
          console.warn('Unexpected data structure:', data);
          setTestimonials([]);
        }
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
        setTestimonials([]);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle file upload
  const handleFileChange = (idx, file) => {
    if (file) {
      // Store the file for upload
      setImageFiles(prev => ({
        ...prev,
        [idx]: file
      }));
      
      // Create preview for display
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = testimonials.map((t, i) => 
          i === idx ? { ...t, imageBase64: reader.result } : t
        );
        setTestimonials(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save with proper error handling
  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      
      for (const [ t] of testimonials.entries()) {
        const testimonialData = {
          clientName: t.clientName,
          des: t.des,
          imageBase64: imageBase64 || null
        };
        
        if (t.id) {
          await updateTestimonial(t.id, testimonialData);
        } else {
          await addTestimonial(testimonialData);
        }
      }
      
      const updated = await getTestimonials();
      const updatedData = Array.isArray(updated) ? updated : 
                         Array.isArray(updated?.data) ? updated.data : 
                         Array.isArray(updated?.testimonials) ? updated.testimonials : [];
      setTestimonials(updatedData);
      setImageFiles({});
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to save testimonials:', err);
      setError('Failed to save testimonials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-[1136px] min-h-screen pt-6 pl-7 bg-transparent'>
      {/* Show error message if any */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Show loading state */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <p>Loading...</p>
          </div>
        </div>
      )}

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

      {/* Testimonial Section */}
      <div className="bg-[#1a1a1a] w-[1136px] h-[637px] text-white font-sans rounded-b flex flex-col justify-between mt-0"
        style={{
          boxShadow: '4px 4px 8px rgba(255, 255, 255, 0.2)',
        }}>
        {/* Testimonial Cards */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: 500, minHeight: 500 }}>
          {Array.isArray(testimonials) && testimonials.length > 0 ? (
            testimonials.map((item, index) => (
              <div key={item.id || index} className="flex items-start gap-4">
                <div className='h-[188px] rounded-[4.4068px] w-[186px]'>
                  <img
                    src={item.imageBase64 || '/placeholder-image.png'}
                    alt={item.clientName || 'Testimonial'}
                    className="w-[130px] h-[130px] px-1 py-1 mt-6 ml-12 object-cover bg-[#FFFFFF] rounded-[4.4068px]"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.png';
                    }}
                  />
                </div>

                <div className="flex-1 py-3 px-7 w-[892px] h-[120px] text-justify">
                  <p className="text-white font-semibold mb-1 font-mono" style={{ fontWeight: 600, fontSize: 16 }}>{item.clientName || 'Anonymous'}</p>
                  <p className="text-gray-300 font-mono" style={{ fontWeight: 400, fontSize: 16 }}>{item.des || 'No message'}</p>
                </div>
                
                <button
                  onClick={async () => {
                    try {
                      await deleteTestimonial(item.id);
                      setTestimonials(prev => prev.filter(t => t.id !== item.id));
                    } catch (err) {
                      setError('Failed to delete testimonial');
                    }
                  }}
                  className='ml-2 mt-8 h-[40px] w-[40px] flex items-center justify-center rounded bg-[#ACACAC40]/60'>
                  <img src={deletei} alt="delete" className='h-[20px] w-[20px]' />
                </button>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-lg">No testimonials available</p>
            </div>
          )}
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
              <p>EDIT</p>
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

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-[#1a1a1a] w-[900px] max-h-[70vh] rounded-xl shadow-lg border border-[#5a5a5a] flex flex-col">
            {/* Modal Header */}
            <div className="h-[60px] w-full flex justify-between items-center px-7 bg-[#8E8E8E] rounded-t-xl shrink-0">
              <h2 className="text-[#333333]" style={{ fontFamily: 'Inter', fontSize: 22, fontWeight: 600 }}>
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

            {/* Modal Content */}
            <div className="overflow-y-auto px-6 py-4 flex-1">
              {Array.isArray(testimonials) && testimonials.length > 0 ? (
                testimonials.map((item, idx) => (
                  <div key={idx} className="flex mb-5">
                    <div className='w-[186px] h-[130px] gap-[10px] py-4 px-3 flex flex-col items-center'>
                      <label htmlFor={`file-upload-${idx}`} className="cursor-pointer relative">
                        <img
                          src={item.imageBase64 || '/placeholder-image.png'}
                          alt=""
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
                        onChange={e => handleFileChange(idx, e.target.files[0])}
                      />
                    </div>
                    
                    <div className='flex-1 py-3 px-7 gap-1'>
                      <label className="block text-sm text-gray-300 mb-1">TITLE</label>
                      <input
                        type="text"
                        value={item.clientName || ''}
                        placeholder='Client Name'
                        onChange={e => {
                          const updated = testimonials.map((t, i) => i === idx ? { ...t, clientName: e.target.value } : t);
                          setTestimonials(updated);
                        }}
                        className="w-[549px] font-mono px-3 py-2 rounded-md text-white bg-gray-800 border border-gray-600"
                      />
                      
                      <label className="block text-sm text-gray-300 mt-2">CONTENT</label>
                      <textarea
                        value={item.des || ''}
                        onChange={e => {
                          const updated = testimonials.map((t, i) => i === idx ? { ...t, des: e.target.value } : t);
                          setTestimonials(updated);
                        }}
                        placeholder="Enter testimonial content..."
                        className="w-[559px] mt-1 h-[150px] px-3 py-2 rounded-md font-mono text-white bg-gray-800 border border-gray-600"
                      />
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <button
                        onClick={async () => {
                          try {
                            await deleteTestimonial(item.id);
                            setTestimonials(prev => prev.filter(t => t.id !== item.id));
                          } catch (err) {
                            setError('Failed to delete testimonial');
                          }
                        }}
                        className='font-mono w-[40px] h-[40px] rounded-xl bg-[#ACACAC40]/60 text-white flex items-center justify-center mb-40'
                      >
                        <img src={deletei} alt="delete" className='h-[20px] w-[20px]' />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-gray-400">No testimonials to edit</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="h-[73px] flex justify-end gap-3 px-6 py-1 bg-[#30303099]/30 rounded-b-xl border-t border-[#5a5a5a] shrink-0">
              <button
                onClick={handleSave}
                disabled={loading}
                className='font-mono my-3 w-[105px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2.5 gap-2 px-4 disabled:opacity-50'
              >
                <img src={save} alt="" className='h-[25px] w-[25px]' />
                <p>{loading ? 'SAVING...' : 'SAVE'}</p>
              </button>
              
              <button
                onClick={() => {
                  setTestimonials([
                    ...testimonials,
                    {
                      clientName: '',
                      imageBase64: '',
                      des: '',
                    },
                  ]);
                }}
                className='font-mono my-3 w-[135px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2.5 gap-2 px-4'
              >
                <img src={add} alt="" />
                <p>ADD NEW</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;