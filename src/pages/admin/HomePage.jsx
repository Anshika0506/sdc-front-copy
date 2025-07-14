import React, { useState, useEffect } from 'react';
import { getTestimonials } from '../../api/Admin/Testimonial/getTestimonials';
import { addTestimonial } from '../../api/Admin/Testimonial/addTestimonial';
import { updateTestimonial } from '../../api/Admin/Testimonial/updateTestimonial';
import { deleteTestimonial } from '../../api/Admin/Testimonial/deleteTestimonial';
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

const Main = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Helper function to convert base64 to File object
  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // Fetch testimonials from API on mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 Fetching testimonials from API...');
      const res = await getTestimonials();
      // Support both array and object with data property
      let data = Array.isArray(res) ? res : (Array.isArray(res.data) ? res.data : (Array.isArray(res.testimonials) ? res.testimonials : []));
      // Map backend fields to frontend fields (des, clientName, imageBase64, testId)
      setTestimonials(data.map(t => ({
        id: t.testId,
        name: t.clientName || '',
        image: t.imageBase64 || profile1,
        message: t.des || '',
        isNew: false // Track if this is a new testimonial
      })));
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  // Add new testimonial to database
  const handleAddTestimonial = async (testimonialData) => {
    try {
      console.log('🔄 Adding new testimonial to database...', testimonialData);
      
      // Prepare the data for API call
      let imageData = null;
      if (testimonialData.image && testimonialData.image !== profile1) {
        // If it's a base64 string, convert to File object
        if (testimonialData.image.startsWith('data:')) {
          imageData = base64ToFile(testimonialData.image, 'testimonial-image.jpg');
        } else {
          imageData = testimonialData.image;
        }
      }
      
      const payload = {
        clientName: testimonialData.name,
        des: testimonialData.message,
        imageBase64: imageData
      };
      
      const response = await addTestimonial(payload);
      
      // Get the new testimonial ID from response
      const newId = response.data?.testId || response.testId || response.id;
      
      return {
        ...testimonialData,
        id: newId,
        isNew: false
      };
    } catch (err) {
      console.error('Error adding testimonial:', err);
      console.error('Error details:', err.response?.data || err.message);
      console.error('Status code:', err.response?.status);
      
      // More specific error messages
      if (err.response?.status === 403) {
        throw new Error('Access denied. Please check your authentication or permissions.');
      } else if (err.response?.status === 401) {
        throw new Error('Authentication required. Please log in again.');
      } else {
        throw new Error('Failed to add testimonial to database: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  // Update existing testimonial in database
  const handleUpdateTestimonial = async (testimonialData) => {
    try {
      console.log('🔄 Updating testimonial in database...', testimonialData);
      
      // Prepare the image data for API call
      let imageData = null;
      if (testimonialData.image && testimonialData.image !== profile1) {
        // If it's a base64 string, convert to File object
        if (testimonialData.image.startsWith('data:')) {
          imageData = base64ToFile(testimonialData.image, 'testimonial-image.jpg');
        } else {
          imageData = testimonialData.image;
        }
      }
      
      // Call update API with correct parameters: testId and data object
      const response = await updateTestimonial(testimonialData.id, {
        clientName: testimonialData.name,
        des: testimonialData.message,
        imageBase64: imageData
      });
      
      return testimonialData;
    } catch (err) {
      console.error('Error updating testimonial:', err);
      console.error('Testimonial data:', testimonialData);
      throw new Error('Failed to update testimonial in database: ' + err.message);
    }
  };

  // Delete testimonial from database
  const handleDeleteTestimonial = async (testimonialId) => {
    try {
      console.log('🔄 Deleting testimonial from database...', testimonialId);
      await deleteTestimonial(testimonialId);
    } catch (err) {
      console.error('Error deleting testimonial:', err);
      throw new Error('Failed to delete testimonial from database');
    }
  };

  // Check authentication before making requests
  const checkAuth = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required. Please log in again.');
    }
    return token;
  };

  // Save all changes to database
  const handleSaveAll = async () => {
    // Check if any testimonial is blank
    const hasBlank = testimonials.some(
      t => !t.name.trim() || !t.message.trim() 
    );
    if (hasBlank) {
      alert("Please fill all fields (name, content) before saving.");
      return;
    }

    setSaveLoading(true);
    try {
      // Check authentication first
      checkAuth();
      
      const updatedTestimonials = [];
      
      for (const testimonial of testimonials) {
        if (testimonial.isNew) {
          // Add new testimonial
          console.log('Adding new testimonial:', testimonial);
          const newTestimonial = await handleAddTestimonial(testimonial);
          updatedTestimonials.push(newTestimonial);
        } else {
          // Update existing testimonial
          console.log('Updating existing testimonial:', testimonial);
          const updatedTestimonial = await handleUpdateTestimonial(testimonial);
          updatedTestimonials.push(updatedTestimonial);
        }
      }
      
      setTestimonials(updatedTestimonials);
      setIsEditing(false);
      
      // Optionally refresh from database to ensure consistency
      await fetchTestimonials();
      
      alert('All testimonials saved successfully!');
      console.log('✅ All testimonials saved successfully!');
    } catch (err) {
      console.error('Error saving testimonials:', err);
      
      // More specific error messages based on error type
      let errorMessage = 'Failed to save testimonials: ';
      if (err.message.includes('Access denied') || err.message.includes('Authentication required')) {
        errorMessage += 'Your session has expired or you do not have permission. Please log in again.';
        // Optionally redirect to login
        // window.location.href = '/login';
      } else {
        errorMessage += err.message;
      }
      
      alert(errorMessage);
    } finally {
      setSaveLoading(false);
    }
  };

  // Delete all testimonials from database
  const handleDeleteAll = async () => {
    if (!window.confirm('Are you sure you want to delete all testimonials? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(true);
    try {
      // Check authentication first
      checkAuth();
      
      // Delete all testimonials from database
      for (const testimonial of testimonials) {
        if (!testimonial.isNew) {
          await handleDeleteTestimonial(testimonial.id);
        }
      }
      
      setTestimonials([]);
      console.log('✅ All testimonials deleted successfully!');
    } catch (err) {
      console.error('Error deleting all testimonials:', err);
      let errorMessage = 'Failed to delete testimonials: ';
      if (err.message.includes('Authentication required')) {
        errorMessage += 'Your session has expired. Please log in again.';
        // Optionally redirect to login
        // window.location.href = '/login';
      } else {
        errorMessage += err.message;
      }
      alert(errorMessage);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Delete single testimonial from database
  const handleDeleteSingle = async (index) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    const testimonial = testimonials[index];
    
    try {
      if (!testimonial.isNew) {
        // Check authentication first
        checkAuth();
        await handleDeleteTestimonial(testimonial.id);
      }
      
      const updated = testimonials.filter((_, i) => i !== index);
      setTestimonials(updated);
      
      console.log('✅ Testimonial deleted successfully!');
    } catch (err) {
      console.error('Error deleting testimonial:', err);
      let errorMessage = 'Failed to delete testimonial: ';
      if (err.message.includes('Authentication required')) {
        errorMessage += 'Your session has expired. Please log in again.';
      } else {
        errorMessage += err.message;
      }
      alert(errorMessage);
    }
  };

  // Add new testimonial (local state only, saved when user clicks save)
  const handleAddNew = () => {
    // Check if any testimonial is blank
    const hasBlank = testimonials.some(
      t => !t.name.trim() || !t.message.trim() 
    );
    if (hasBlank) {
      alert("Please fill all fields (name, content) before adding a new testimonial.");
      return;
    }

    setTestimonials([
      {
        id: Date.now(), // Temporary ID for new testimonials
        name: '',
        image: profile1,
        message: '',
        isNew: true
      },
      ...testimonials,
    ]);
  };

  return (
    <div className='w-[1136px] h-[856px] pb-[159px] pt-10 pl-7'>
      <div className='w-[1136px] h-[60px] flex justify-between px-7 py-2 bg-[#8E8E8E] rounded-t-xl'>
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

      <div
        className="bg-[#1a1a1a] w-[1136px] text-white font-sans rounded-b"
        style={{
          boxShadow: '4px 4px 8px rgba(255, 255, 255, 0.2)',
          maxheight: 470,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {/* Testimonial Cards */}
          {loading ? (
            <p className="text-white text-center text-base py-10">Loading...</p>
          ) : error ? (
            <p className="text-red-400 text-center text-base py-10">{error}</p>
          ) : testimonials.length > 0 ? (
            testimonials.map((item, index) => (
              <div key={item.id || index} className="flex items-start gap-4">
                <div className='h-[188px] rounded-[4.4068px] w-[186px]'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[130px] h-[130px] px-1 py-1 mt-6 ml-12 object-cover bg-[#FFFFFF] rounded-[4.4068px]"
                  />
                </div>
                <div className="flex-1 py-3 px-7 w-[892px] text-justify">
                  <p className="text-white font-semibold mb-1 font-mono" style={{ fontWeight: 600, fontSize: 16 }}>
                    {item.name} {item.isNew && <span className="text-yellow-400 text-sm">(New)</span>}
                  </p>
                  <p className="text-gray-300 font-mono" style={{ fontWeight: 400, fontSize: 16, maxHeight: 150, overflowY: 'auto', whiteSpace: 'pre-line' }}>{item.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center text-base py-10">No testimonials available.</p>
          )}
        </div>

        {/* Footer buttons */}
        <div className='w-[1136px] h-[73px] flex justify-between px-7 bg-[#30303099]/60' style={{ fontSize: 16, fontWeight: 600 }}>
          <div></div>
          <div className="flex justify-end gap-5 mt-3">
            <button
              className='font-mono w-[105px] h-[45px] [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2 gap-2 px-4'
              onClick={() => setIsEditing(true)}
            >
              <img src={edit} alt="edit" className='h-[25px] w-[25px]' />
              <p>EDIT</p>
            </button>
            <button
              onClick={handleDeleteAll}
              disabled={deleteLoading}
              className='font-mono w-[125px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2 gap-2 px-3 disabled:opacity-50'
            >
              <img src={deletei} alt="delete" className='h-[25px] w-[25px]' />
              <p>{deleteLoading ? 'DELETING...' : 'DELETE'}</p>
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
                <div key={item.id || idx} className="flex mb-5">
                  <div className='w-[186px] h-[130px] gap-[10px] py-4 px-3 flex flex-col items-center'>
                    <label htmlFor={`file-upload-${idx}`} className="cursor-pointer relative">
                      <img
                        src={item.image}
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
                  </div>
                  <div className='flex-1 py-3 px-7 gap-1'>
                    <label className="block text-sm text-gray-300 mb-1" style={{fontFamily:"Inter",fontWeight:600,fontSize:14}}>
                      TITLE {item.isNew && <span className="text-yellow-400">(New)</span>}
                    </label>
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
                    <label className="block text-sm text-gray-300 mt-2" style={{fontFamily:"Inter",fontWeight:600,fontSize:14}}>CONTENT</label>
                    <textarea
                      value={item.message}
                      onChange={e => {
                        const updated = testimonials.map((t, i) => i === idx ? { ...t, message: e.target.value } : t);
                        setTestimonials(updated);
                      }}
                      placeholder="Enter testimonial here..."
                      className="w-[559px] mt-1 h-[150px] px-3 py-2 rounded-md font-mono text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)]"
                    ></textarea>
                  </div>
                  <div className="flex flex-col justify-center">
                    <button
                      onClick={() => handleDeleteSingle(idx)}
                      className='font-mono w-[40px] h-[40px] rounded-xl bg-[#ACACAC40]/60 text-white flex items-center justify-center mb-40'
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
                onClick={handleSaveAll}
                disabled={saveLoading}
                className='font-mono my-3 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[105px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2.5 gap-2 px-4 disabled:opacity-50'
              >
                <img src={save} alt="" className='h-[25px] w-[25px]' />
                <p>{saveLoading ? 'SAVING...' : 'SAVE'}</p>
              </button>
              <button
                className='font-mono my-3 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[135px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2.5 gap-2 px-4'
                onClick={handleAddNew}
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

export default Main;