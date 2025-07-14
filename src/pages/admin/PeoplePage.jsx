import React, { useState } from 'react';
import hide from "../../assets/hide.png";
import save from "../../assets/save.png";
import attachicon from "../../assets/attachicon.png";
import edit from "../../assets/edit.png";
import deletei from "../../assets/delete.png";
import cross from "../../assets/Group.svg";
import frame1 from "../../assets/profile1.jpg";
import frame2 from "../../assets/profile1.jpg";
import frame3 from "../../assets/profile1.jpg";
import frame4 from "../../assets/profile1.jpg";

const PeoplePage = () => {
  // State for the first team section (Team Members)
  const [teamData1, setTeamData1] = useState([
    {
      name: "Eshaan Sharma (Team 1)",
      branch: "CSE-CORE",
      role: "DESIGN HEAD",
      linkedin: "www.linkedin.com/eshaan1",
      github: "www.github.com/eshaan1",
      instagram: "www.instagram.com/eshaan1",
      projects: ["Project Alpha", "Project Gamma"] // Keeping projects in state for pop-up
    },
    {
      name: "Alice Smith (Team 1)",
      branch: "ECE",
      role: "SOFTWARE DEV",
      linkedin: "www.linkedin.com/alice1",
      github: "www.github.com/alice1",
      instagram: "www.instagram.com/alice1",
      projects: ["Project Beta"]
    },
    {
      name: "Alice Smith (Team 1)",
      branch: "ECE",
      role: "SOFTWARE DEV",
      linkedin: "www.linkedin.com/alice1",
      github: "www.github.com/alice1",
      instagram: "www.instagram.com/alice1",
      projects: ["Project Beta"]
    },
    {
      name: "Alice Smith (Team 1)",
      branch: "ECE",
      role: "SOFTWARE DEV",
      linkedin: "www.linkedin.com/alice1",
      github: "www.github.com/alice1",
      instagram: "www.instagram.com/alice1",
      projects: ["Project Beta"]
    },
  ]);

  // State for the second team section (Alumni)
  const [teamData2, setTeamData2] = useState([
    {
      alumniName: "Bob Johnson (Alumni)",
      companyName: "Tech Corp",
      package: "15 LPA",
      testimonial: "Great experience at college!",
    },
    {
      alumniName: "Charlie Brown (Alumni)",
      companyName: "Design Studio",
      package: "12 LPA",
      testimonial: "Learned so much here.",
    },
    {
      alumniName: "Charlie Brown (Alumni)",
      companyName: "Design Studio",
      package: "12 LPA",
      testimonial: "Learned so much here.",
    },
    {
      alumniName: "Charlie Brown (Alumni)",
      companyName: "Design Studio",
      package: "12 LPA",
      testimonial: "Learned so much here.",
    },
  ]);

  const [isTeamEditing, setIsTeamEditing] = useState(false); // For Team Members modal
  const [isAlumniEditing, setIsAlumniEditing] = useState(false); // For Alumni modal

  const [currentEditingTeamId, setCurrentEditingTeamId] = useState(null); // 'team1' or 'team2'

  const [frame1Img, setFrame1Img] = useState(frame1);
  const [frame2Img, setFrame2Img] = useState(frame2);
  const [frame3Img, setFrame3Img] = useState(frame3);
  const frame4Img = frame4;

  const availableProjects = [
    "Project Alpha",
    "Project Beta",
    "Project Gamma",
    "Project Delta"
  ];

  // Helper function to get the correct team data and setter based on currentEditingTeamId
  const getActiveTeamData = () => {
    if (currentEditingTeamId === 'team1') {
      return [teamData1, setTeamData1];
    } else if (currentEditingTeamId === 'team2') {
      return [teamData2, setTeamData2];
    }
    return [[], () => {}]; // Return empty array and no-op setter if no team is being edited
  };

  const handleChange = (index, field, value) => {
    const [activeTeamData, setActiveTeamData] = getActiveTeamData();
    const updated = [...activeTeamData];
    updated[index][field] = value;
    setActiveTeamData(updated);
  };

  const handleProjectSelection = (memberIndex, projectName) => {
    const [activeTeamData, setActiveTeamData] = getActiveTeamData();
    const updatedTeamData = [...activeTeamData];
    // Ensure projects array exists before trying to access it, and create if it doesn't
    updatedTeamData[memberIndex].projects = updatedTeamData[memberIndex].projects || [];

    const memberProjects = updatedTeamData[memberIndex].projects;

    if (memberProjects.includes(projectName)) {
      updatedTeamData[memberIndex].projects = memberProjects.filter(
        (proj) => proj !== projectName
      );
    } else {
      updatedTeamData[memberIndex].projects = [...memberProjects, projectName];
    }
    setActiveTeamData(updatedTeamData);
  };

  const handleImageChange = (e, setter) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddNew = () => {
    const [activeTeamData, setActiveTeamData] = getActiveTeamData();

    let newMember = {};
    if (currentEditingTeamId === 'team1') {
      newMember = {
        name: '', branch: '', role: '',
        linkedin: '', github: '', instagram: '',
        projects: []
      };
    } else if (currentEditingTeamId === 'team2') {
      newMember = {
        alumniName: '', companyName: '', package: '', testimonial: ''
      };
    }
    // Directly add the new blank member without any prompt or condition
    setActiveTeamData([newMember, ...activeTeamData]);
  };


  const handleDeleteMember = (index) => {
    const [activeTeamData, setActiveTeamData] = getActiveTeamData();
    const updated = [...activeTeamData];
    updated.splice(index, 1);
    setActiveTeamData(updated);
  };

  const handleDeleteAllMembers = () => {
    const [, setActiveTeamData] = getActiveTeamData();
    setActiveTeamData([]);
  };

  const handleEditClick = (teamId) => {
    setCurrentEditingTeamId(teamId);
    if (teamId === 'team1') {
      setIsTeamEditing(true);
      setIsAlumniEditing(false); // Ensure other modal is closed
    } else if (teamId === 'team2') {
      setIsAlumniEditing(true);
      setIsTeamEditing(false); // Ensure other modal is closed
    }
  };

  // Function to handle saving/closing the modal with validation
  const handleSaveAndClose = () => {
    const [activeTeamData] = getActiveTeamData();

    // Check if any card is completely empty
    const isEmptyCardPresent = activeTeamData.some(member => {
      if (currentEditingTeamId === 'team1') {
        // For team members, check if name, branch, role, and all social links are empty
        return !member.name.trim() && !member.branch.trim() && !member.role.trim() &&
               !member.linkedin.trim() && !member.github.trim() && !member.instagram.trim();
      } else if (currentEditingTeamId === 'team2') {
        // For alumni, check if alumniName, companyName, package, and testimonial are empty
        return !member.alumniName.trim() && !member.companyName.trim() &&
               !member.package.trim() && !member.testimonial.trim();
      }
      return false; // Should not happen
    });

    if (isEmptyCardPresent) {
      alert("Please add details to any empty cards before saving.");
    } else {
      // If all cards have some details, close the modal
      if (currentEditingTeamId === 'team1') {
        setIsTeamEditing(false);
      } else if (currentEditingTeamId === 'team2') {
        setIsAlumniEditing(false);
      }
    }
  };


  const labelStyle = "text-white text-[14px] font-[600] font-inter uppercase tracking-[1.12px]";
  const inputStyle = "h-[48px] px-4 py-3 rounded-md opacity-100 shadow-[2px_2px_4px_0px_#00000040,inset_2px_2px_6px_0px_#FFFFFF80] bg-[#121212] text-white text-sm font-inter";

  const renderTeamBox = (title, teamData, teamId) => (
    <div className="mb-10 ">
      <div className='w-full h-[60px] flex justify-between items-center px-7 py-2 bg-[#8E8E8E] rounded-t-xl'>
        <h1 className="font-semibold text-[#333] text-[22px] font-inter">{title}</h1>
        <div className='flex items-center gap-4'>
          <p className='font-mono text-[#333] text-[16px]'>Page</p>
          <button className="w-[80px] h-[32px] rounded-sm bg-[#D2D2D2] text-[#333] px-2 font-mono hover:bg-gray-300 text-[16px]">People</button>
        </div>
      </div>

      <div className={`relative bg-[#1a1a1a] w-full text-white font-sans rounded-b px-6 ${teamData.length > 0 ? 'pt-4 min-h-[280px]' : 'min-h-[73px]'} pb-[90px] overflow-hidden`} style={{ boxShadow: '4px 4px 8px rgba(255, 255, 255, 0.2)' }}>
        <div className="scroll-container grid grid-cols-2 gap-6 overflow-y-auto max-h-[245px] pr-2">
          {teamData.map((member, idx) => (
            <div key={idx} className="flex p-3 rounded-lg items-center gap-4">
              <img src={[frame1Img, frame2Img, frame3Img, frame4Img][idx % 4]} alt="profile" className="w-[130px] h-[130px] rounded-lg object-cover" />
              <div className="text-white text-sm leading-relaxed font-mono">
                {/* Conditionally render fields based on teamId */}
                {teamId === 'team1' ? (
                  <>
                    <p className="font-semibold text-lg">{member.name}</p>
                    <p>{member.branch}</p>
                    <p>{member.role}</p>
                    <p className="text-blue-400 underline cursor-pointer break-all">{member.linkedin}</p>
                    <p className="text-blue-400 underline cursor-pointer break-all">{member.github}</p>
                    <p className="text-blue-400 underline cursor-pointer break-all">{member.instagram}</p>
                    {/* Projects array display is REMOVED from the main screen here. */}
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-lg">{member.alumniName}</p>
                    <p>Company: {member.companyName}</p>
                    <p>Package: {member.package}</p>
                    <p>Testimonial: {member.testimonial}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className='absolute bottom-0 left-0 w-full h-[63px] flex justify-end gap-5 px-7 py-3 bg-[#30303099]/60 text-[16px] font-semibold'>
          <button className='font-mono w-[105px] h-[40px] shadow-inner rounded-xl border-2 bg-[#ACACAC40]/60 border-white text-white flex py-2 gap-2 px-4' onClick={() => handleEditClick(teamId)}>
            <img src={edit} alt="edit" className='h-[25px] w-[25px]' />
            <p>{teamData.length > 0 ? "EDIT" : "ADD"}</p>
          </button>
          <button
            className='font-mono w-[125px] h-[40px] rounded-xl border-2 bg-[#ACACAC40]/60 border-white text-white flex py-2 gap-2 px-3'
            onClick={() => {
              setCurrentEditingTeamId(teamId); // Ensure correct team is selected for deletion
              handleDeleteAllMembers();
            }}
          >
            <img src={deletei} alt="delete" className='h-[25px] w-[25px]' />
            <p>DELETE</p>
          </button>
        </div>
      </div>
    </div>
  );

  // Get active team data for rendering the modal content
  const [activeTeamData] = getActiveTeamData();

  return (
    <div className='w-full min-h-screen flex justify-center items-start pt-10 px-4'>
      <div className='w-full max-w-[1136px] h-auto pb-[80px]'>
        {renderTeamBox("Team Members", teamData1, 'team1')}
        {renderTeamBox("Alumni", teamData2, 'team2')}

        {isTeamEditing && (
          <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
            <div className="bg-[#1a1a1a] w-[920px] max-h-[90vh] overflow-hidden rounded-xl shadow-lg border border-[#5a5a5a] flex flex-col">
              <div className="h-[65px] w-full flex justify-between items-center px-7 bg-[#8E8E8E] rounded-t-xl">
                <h2 className="text-[#333] font-semibold text-[22px] font-inter">Edit Team Members</h2>
                <img src={cross} alt="close" className="h-[20px] w-[20px] cursor-pointer" onClick={() => handleSaveAndClose()} /> {/* Use common handler */}
              </div>

              <div className="flex flex-col max-h-[80vh]">
                <div className="scroll-container overflow-y-auto px-6 pt-6 pb-2 flex flex-col gap-6" style={{ maxHeight: "calc(80vh - 130px)" }}>
                  {activeTeamData.map((member, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 rounded-lg">
                      <label className="relative min-w-[131px] w-[131px] h-[168px] shrink-0 cursor-pointer border-white border-2 rounded-xl">
                        <img src={[frame1Img, frame2Img, frame3Img, frame4Img][idx % 4]} alt="" className='w-full h-full rounded-lg object-cover opacity-20' />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <img src={edit} alt="edit" className='w-[30px] h-[30px]' />
                        </span>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, [setFrame1Img, setFrame2Img, setFrame3Img, setFrame4Img][idx % 4])} />
                      </label>

                      <div className="flex flex-col grow gap-[6px] px-[10px] py-[12px]">
                        <label className={labelStyle}>Student Name</label>
                        <input className={`${inputStyle} w-[620px]`} value={member.name} onChange={e => handleChange(idx, 'name', e.target.value)} placeholder="Student Name" />

                        <label className={labelStyle}>Branch</label>
                        <input className={`${inputStyle} w-[620px]`} value={member.branch} onChange={e => handleChange(idx, 'branch', e.target.value)} placeholder="Branch" />

                        <label className={labelStyle}>Position</label>
                        <input className={`${inputStyle} w-[620px]`} value={member.role} onChange={e => handleChange(idx, 'role', e.target.value)} placeholder="Position" />

                        <label className={labelStyle}>LinkedIn ID</label>
                        <input className={`${inputStyle} w-[620px]`} value={member.linkedin} onChange={e => handleChange(idx, 'linkedin', e.target.value)} placeholder="LinkedIn" />

                        <label className={labelStyle}>GitHub ID</label>
                        <input className={`${inputStyle} w-[620px]`} value={member.github} onChange={e => handleChange(idx, 'github', e.target.value)} placeholder="GitHub" />

                        <label className={labelStyle}>Instagram ID</label>
                        <input className={`${inputStyle} w-[620px]`} value={member.instagram} onChange={e => handleChange(idx, 'instagram', e.target.value)} placeholder="Instagram" />

                        <label className={labelStyle}>Projects</label>
                        <div className="flex flex-col gap-2 p-4 rounded-md opacity-100 shadow-[2px_2px_4px_0px_#00000040,inset_2px_2px_6px_0px_#FFFFFF80] bg-[#121212]">
                          {availableProjects.map((projectName, projectIdx) => (
                            <div key={projectIdx} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`project-${idx}-${currentEditingTeamId}-${projectIdx}`} // Unique ID for checkbox
                                className="h-5 w-5 border-2 relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                checked={(member.projects || []).includes(projectName)}
                                onChange={() => handleProjectSelection(idx, projectName)}
                              />
                              <label htmlFor={`project-${idx}-${currentEditingTeamId}-${projectIdx}`} className="text-white text-sm font-inter">
                                {projectName}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <img
                        src={deletei}
                        alt="delete"
                        className="h-[33px] w-[33px] cursor-pointer mt-12 mr-24 bg-[#333333] shrink-0"
                        onClick={() => handleDeleteMember(idx)}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end items-center gap-2 px-6 py-4 bg-[#2a2a2a] rounded-b-xl border-t border-[#444]">
                  <button onClick={handleSaveAndClose} className='font-mono w-[115px] h-[45px] rounded-md border bg-[#4a4a4a] border-white text-white flex items-center justify-center gap-2'>
                    <img src={save} alt="save" className='h-[20px] w-[20px]' />
                    <span>SAVE</span>
                  </button>
                  <button onClick={handleAddNew} className='font-mono w-[140px] h-[45px] rounded-md border bg-[#4a4a4a] border-white text-white flex items-center justify-center gap-2'>
                    <img src={attachicon} alt="add new" className='h-[20px] w-[20px]' />
                    <span>ADD NEW</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isAlumniEditing && (
          <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
            <div className="bg-[#1a1a1a] w-[920px] max-h-[90vh] overflow-hidden rounded-xl shadow-lg border border-[#5a5a5a] flex flex-col">
              <div className="h-[65px] w-full flex justify-between items-center px-7 bg-[#8E8E8E] rounded-t-xl">
                <h2 className="text-[#333] font-semibold text-[22px] font-inter">Edit Alumni</h2>
                <img src={cross} alt="close" className="h-[20px] w-[20px] cursor-pointer" onClick={() => handleSaveAndClose()} /> {/* Use common handler */}
              </div>

              <div className="flex flex-col max-h-[80vh]">
                <div className="scroll-container overflow-y-auto px-6 pt-6 pb-2 flex flex-col gap-6" style={{ maxHeight: "calc(80vh - 130px)" }}>
                  {activeTeamData.map((member, idx) => ( // Use activeTeamData (which will be teamData2 here)
                    <div key={idx} className="flex gap-4 items-start p-4 rounded-lg">
                      <label className="relative min-w-[131px] w-[131px] h-[168px] shrink-0 cursor-pointer border-white border-2 rounded-xl">
                        <img src={[frame1Img, frame2Img, frame3Img, frame4Img][idx % 4]} alt="" className='w-full h-full rounded-lg object-cover opacity-20' />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <img src={edit} alt="edit" className='w-[30px] h-[30px]' />
                        </span>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, [setFrame1Img, setFrame2Img, setFrame3Img, setFrame4Img][idx % 4])} />
                      </label>

                      <div className="flex flex-col grow gap-[6px] px-[10px] py-[12px]">
                        <label className={labelStyle}>Alumni Name</label>
                        <input className={`${inputStyle} w-[620px]`} value={member.alumniName} onChange={e => handleChange(idx, 'alumniName', e.target.value)} placeholder="Alumni Name" />

                        <label className={labelStyle}>Company Name</label>
                        <input className={`${inputStyle} w-[620px]`} value={member.companyName} onChange={e => handleChange(idx, 'companyName', e.target.value)} placeholder="Company Name" />

                        <label className={labelStyle}>Package</label>
                        <input className={`${inputStyle} w-[620px]`} value={member.package} onChange={e => handleChange(idx, 'package', e.target.value)} placeholder="Package" />

                        <label className={labelStyle}>Testimonial</label>
                        <input className={`${inputStyle} w-[620px]`} value={member.testimonial} onChange={e => handleChange(idx, 'testimonial', e.target.value)} placeholder="Testimonial" />
                        
                        {/* Removed Projects section from Alumni modal */}
                      </div>

                      <img
                        src={deletei}
                        alt="delete"
                        className="h-[33px] w-[33px] cursor-pointer mt-12 mr-24 bg-[#333333] shrink-0"
                        onClick={() => handleDeleteMember(idx)}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end items-center gap-2 px-6 py-4 bg-[#2a2a2a] rounded-b-xl border-t border-[#444]">
                  <button onClick={handleSaveAndClose} className='font-mono w-[115px] h-[45px] rounded-md border bg-[#4a4a4a] border-white text-white flex items-center justify-center gap-2'>
                    <img src={save} alt="save" className='h-[20px] w-[20px]' />
                    <span>SAVE</span>
                  </button>
                  <button onClick={handleAddNew} className='font-mono w-[140px] h-[45px] rounded-md border bg-[#4a4a4a] border-white text-white flex items-center justify-center gap-2'>
                    <img src={attachicon} alt="add new" className='h-[20px] w-[20px]' />
                    <span>ADD NEW</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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

          /* Custom square checkbox styling */
          input[type="checkbox"] {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border: 2px solid #8E8E8E;
            border-radius: 4px;
            cursor: pointer;
            outline: none;
            transition: none;
            position: relative;
            background-color: #8E8E8E;
            
          }

          input[type="checkbox"]:checked {
            background-color: #8E8E8E;
            border-color: #8E8E8E;
          }

          /* Custom tick mark using pseudo-element */
          input[type="checkbox"]:checked::before {
            content: '✓';
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: lightgray;
            font-size: 14px;
            font-weight: bold;
          }

          input[type="checkbox"]:focus {
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
          }
        `}</style>
      </div>
    </div>
  );
};

export default PeoplePage;