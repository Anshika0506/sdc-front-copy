import React, { useState, useEffect } from "react";
import project from "../../assets/project.png";
import edit from "../../assets/edit.png";
import trash from "../../assets/delete.png";
import cross from "../../assets/cross.svg";
import save from "../../assets/save.png";
import plus from "../../assets/add.png";
import { addProject } from '../../api/Admin/Project/addProject';
import { getProject } from '../../api/Admin/Project/getProject';
import { updateProject } from '../../api/Admin/Project/updateProject';
import { deleteProject } from '../../api/Admin/Project/deleteProject';

const WorkPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  // Fetch projects from backend on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await getProject();
      // Map backend fields to frontend state
      const data = Array.isArray(res) ? res : (Array.isArray(res.data) ? res.data : []);
      setProjects(data.map(p => ({
        id: p.projectID,
        isVisible: true,
        projectName: p.title,
        projectLink: p.link,
        projectImage: p.imageBase64 ? `data:image/jpeg;base64,${p.imageBase64}` : project,
        projectDescription: p.description,
        teamMembers: p.teamMembers ? p.teamMembers.map(m => m.name + (m.position ? ' - ' + m.position : '')).join('\n') : '',
      })));
    } catch (err) {
      alert('Failed to fetch projects: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter(proj => proj.id !== id));
    } catch (err) {
      alert('Failed to delete project: ' + (err.message || 'Unknown error'));
    }
  };

  const handleEdit = (projectToEdit) => {
    setCurrentProject({ ...projectToEdit }); // Create a copy to edit
    setIsEditing(true);
  };

  const handleSave = async () => {
    // Prepare data for API
    const payload = {
      title: currentProject.projectName,
      description: currentProject.projectDescription,
      link: currentProject.projectLink,
      imageBase64: currentProject.projectImage,
      teamMembers: currentProject.teamMembers
        .split('\n')
        .map(m => m.replace(/^•\s?/, '').trim())
        .filter(Boolean)
        .join(','),
    };
    try {
      if (currentProject.id && projects.some(p => p.id === currentProject.id)) {
        await updateProject(currentProject.id, payload);
      } else {
        await addProject(payload);
      }
      await fetchProjects();
      setIsEditing(false);
      setCurrentProject(null);
    } catch (err) {
      alert('Failed to save project: ' + (err.message || 'Unknown error'));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProject({ ...currentProject, projectImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("project-image-upload").click();
  };

  const handleCreateNewProject = () => {
    const newProject = {
      id: null,
      isVisible: true,
      projectName: "New Project Title",
      projectLink: "www.newprojectlink.com",
      projectImage: project, // Default image
      projectDescription:
        "This is a description for your new project. It can be as long or short as you need it to be, and the box will adjust.",
      teamMembers: "New Member - Role\nAnother Member - Another Role",
    };
    setCurrentProject(newProject);
    setIsEditing(true);
  };

  return (
    <div className="w-full h-[100vh]">
      {/* Main scrollable content area - Removed pt-10 here as sticky element will handle spacing */}
      <div
        className="w-full h-[80vh] overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#4a4a4a #1a1a1a",
          msOverflowStyle: "auto",
        }}
      >
        <style jsx>{`
          /* Custom scrollbar for webkit browsers */
          .w-full::-webkit-scrollbar {
            width: 6px;
          }

          .w-full::-webkit-scrollbar-track {
            background: #1a1a1a;
            border-radius: 3px;
          }

          .w-full::-webkit-scrollbar-thumb {
            background: #4a4a4a;
            border-radius: 3px;
          }

          .w-full::-webkit-scrollbar-thumb:hover {
            background: #5a5a5a;
          }
        `}</style>

        <div className="flex justify-center">
          <div className="w-full max-w-[1136px] space-y-[20px] px-[30px] pt-[5px] pb-[10px] mr-[50px]">
            <div className="sticky top-0 z-10 w-full flex justify-end items-center px-[30px] py-[10px] bg-[#1E1E1E]">
              <button
                onClick={handleCreateNewProject}
                className="w-[170px] h-[45px] flex items-center gap-[8px] rounded-md pt-[8px] pr-[16px] pb-[8px] pl-[16px] border border-white backdrop-blur-[4px] shadow-[2px_4px_4px_0px_#00000040,inset_2px_2px_8px_0px_#FFFFFF40] cursor-pointer"
              >
                <img src={plus} alt="plus" className="w-6 h-6" />
                <span className="text-white font-semibold text-[16px] leading-[24px] tracking-[0.02em] uppercase">
                  CREATE NEW
                </span>
              </button>
            </div>
    {/* Project boxes will now scroll below the sticky bar */}
            {loading ? (
              <div className="text-white text-center py-10">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="text-white text-center py-10">No projects found.</div>
            ) : projects.map(
              (proj) =>
                proj.isVisible !== false && (
                  <div
                    key={proj.id}
                    className="w-full min-h-[460px] bg-[#141414] rounded-xl shadow-[2px_2px_6px_0px_#FFFFFF26] flex flex-col"
                  >
                    <div className="w-full h-[60px] bg-[#8E8E8E] flex items-center px-[28px] rounded-t-xl flex-shrink-0">
                      <h2 className="text-[#333333] font-semibold text-[18px] font-sans">
                        Project {proj.id}
                      </h2>
                      <div className="flex ml-auto space-x-4">
                        <input
                          placeholder="Page"
                          className="w-[48px] h-[32px] text-center rounded-sm px-1 py-1 text-lg"
                        />
                        <input
                          placeholder="Work"
                          className="w-[59px] h-[32px] bg-[#D2D2D2] placeholder-black text-center rounded-sm px-2 py-1 text-md"
                        />
                      </div>
                    </div>

                    <div className="flex justify-start items-start px-[48px] pt-[32px] flex-grow">
                      <img
                        src={proj.projectImage}
                        alt="Project Preview"
                        className="w-[220px] h-[160px] bg-white border border-white rounded-sm flex-shrink-0"
                      />
                      <div className="w-[828px] pr-[28px] pb-[24px] pl-[20px] -mt-3">
                        <div className="w-[772px] h-auto pr-[8px] pb-[4px] pl-[8px]">
                          <h4 className="text-white text-[18px] font-semibold leading-[24px] font-sans break-words whitespace-normal">
                            {proj.projectName}
                          </h4>
                          <div className="w-[772px] h-auto gap-[10px] pt-[4px] pr-[8px] pb-[4px] pl-[8px]">
                            <h5 className="w-[752px] h-auto text-[16px] font-semibold leading-[24px] text-[#D2D2D2] -ml-2 break-all whitespace-normal">
                              {proj.projectLink}
                            </h5>
                          </div>
                        </div>

                        <div className="w-[772px] h-auto pt-[20px] pr-[8px] pl-[8px]">
                          <p className="w-[752px] h-auto text-[14px] leading-[20px] text-[#D2D2D2] text-justify break-words whitespace-normal">
                            {proj.projectDescription}
                          </p>
                        </div>

                        <div className="w-[772px] h-[32px] gap-[10px] pr-[8px] pb-[4px] pl-[8px]">
                          <h3 className="text-[16px] font-semibold leading-[24px] text-white">
                            Team Members
                          </h3>
                        </div>

                        <div className="w-[772px] h-auto gap-[10px] pt-[4px] pr-[8px] pb-[4px] pl-[8px]">
                          <ul className="w-[752px] h-auto text-[14px] text-[#D2D2D2] list-disc pl-5 text-justify break-words whitespace-normal">
                            {proj.teamMembers.split("\n").map((member, index) => (
                              <li key={index}>{member}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-[60px] bg-[#30303099] flex justify-between items-center px-[28px] py-[12px] rounded-b-xl flex-shrink-0 mt-auto">
                      <div className="flex items-center gap-[28px] ml-190">
                        <button
                          onClick={() => handleEdit(proj)}
                          className="w-[105px] h-[45px] flex items-center gap-[8px] rounded-md pt-[8px] pr-[16px] pb-[8px] pl-[16px] bg-[#ACACAC40] border border-white backdrop-blur-[4px] shadow-[2px_4px_4px_0px_#00000040,inset_2px_2px_8px_0px_#FFFFFF40] cursor-pointer"
                        >
                          <img src={edit} alt="edit" className="w-6 h-6" />
                          <span className="text-white font-semibold text-[16px] leading-[24px] tracking-[0.02em] uppercase">
                            EDIT
                          </span>
                        </button>
                        <button
                          onClick={() => handleDelete(proj.id)}
                          className="w-[120px] h-[45px] flex items-center gap-[8px] rounded-md pt-[8px] pr-[16px] pb-[8px] pl-[16px] bg-[#ACACAC40] border border-white backdrop-blur-[4px] shadow-[2px_4px_4px_0px_#00000040,inset_2px_2px_8px_0px_#FFFFFF40] cursor-pointer"
                        >
                          <img src={trash} alt="trash" className="w-5 h-5" />
                          <span className="text-white font-semibold text-[16px] leading-[24px] tracking-[0.02em] uppercase">
                            DELETE
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
            )}

            {isEditing && currentProject && (
              <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20 bg-opacity-80 flex justify-center items-center">
                <div className="w-[894px] h-auto max-h-[70vh] bg-[#1e1e1e] rounded-lg p-0 shadow-lg text-white relative flex flex-col">
                  <div className="w-full h-[60px] flex justify-between items-center bg-[#8E8E8E] px-[28px] rounded-t-lg flex-shrink-0">
                    <h2 className="text-[#333333] font-sans font-semibold text-[16px] leading-[24px]">
                      Edit Project Details
                    </h2>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-[#333333] text-2xl font-bold"
                    >
                      <img src={cross} alt="cross" className="w-8 h-8" />
                    </button>
                  </div>

                  <div
                    className="p-6 space-y-4 overflow-y-auto max-h-[50vh]"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#4a4a4a #1a1a1a",
                    }}
                  >
                    <div className="relative w-[252px] h-[190px] mb-4 group cursor-pointer rounded-sm overflow-hidden">
                      <div
                        className="absolute inset-0 z-0"
                        style={{
                          backgroundImage: `url(${currentProject.projectImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          filter: "blur(10px)",
                        }}
                      ></div>

                      <div
                        className="relative w-[252px] h-[190px] mb-4 cursor-pointer rounded-sm overflow-hidden group"
                        onClick={triggerFileInput}
                      >
                        <img
                          src={currentProject.projectImage}
                          alt="Project Preview"
                          className="w-full h-full object-cover rounded-sm"
                        />

                        <div className="absolute inset-0 bg-black/30 backdrop-blur z-10 flex justify-center items-center rounded-sm transition-opacity duration-300 group-hover:opacity-100">
                          <img
                            src={edit}
                            alt="Edit Icon"
                            className="w-12 h-12 opacity-80 hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        <input
                          id="project-image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>

                      <input
                        id="project"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>

                    <div className="w-full font-semibold text-sm leading-[100%] tracking-[0.08em] uppercase">
                      PROJECT NAME
                      <input
                        type="text"
                        value={currentProject.projectName}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            projectName: e.target.value,
                          })
                        }
                        className="w-full mt-1 h-auto min-h-[48px] rounded-md pt-[12px] pr-[16px] pb-[12px] pl-[16px] shadow-[2px_2px_4px_0px_#00000040,inset_2px_2px_6px_0px_#FFFFFF80] bg-[#303030] text-[#D2D2D2] box-border break-words whitespace-normal"
                        placeholder="Project Name"
                      />
                    </div>

                    <div className="w-full font-semibold text-sm leading-[100%] tracking-[0.08em] uppercase">
                      PROJECT DEPLOYED LINK
                      <input
                        type="text"
                        value={currentProject.projectLink}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            projectLink: e.target.value,
                          })
                        }
                        className="w-full mt-1 h-auto min-h-[48px] rounded-md pt-[12px] pr-[16px] pb-[12px] pl-[16px] shadow-[2px_2px_4px_0px_#00000040,inset_2px_2px_6px_0px_#FFFFFF80] bg-[#303030] text-[#D2D2D2] box-border break-all whitespace-normal"
                        placeholder="Project Deployed Link"
                      />
                    </div>

                    <div className="w-full font-semibold text-sm leading-[100%] tracking-[0.08em] uppercase">
                      DESCRIPTION
                      <textarea
                        rows="5"
                        value={currentProject.projectDescription}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            projectDescription: e.target.value,
                          })
                        }
                        className="w-full mt-1 min-h-[48px] max-h-[250px] rounded-md pt-[12px] pr-[16px] pb-[12px] pl-[16px] resize-none shadow-[2px_2px_4px_0px_#00000040,inset_2px_2px_6px_0px_#FFFFFF80] bg-[#303030] text-[#D2D2D2] box-border overflow-y-auto break-words whitespace-normal"
                        placeholder="Project Description"
                      ></textarea>
                    </div>

                    <div className="w-full font-semibold text-sm leading-[100%] tracking-[0.08em] uppercase">
                      TEAM MEMBERS
                      <textarea
                        rows="5"
                        value={currentProject.teamMembers
                          .split("\n")
                          .map((member) => `• ${member}`)
                          .join("\n")}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            teamMembers: e.target.value.replace(/•\s?/g, ""),
                          })
                        }
                        className="w-full mt-1 min-h-[48px] max-h-[250px] rounded-md pt-[12px] pr-[16px] pb-[12px] pl-[16px] resize-none shadow-[2px_2px_4px_0px_#00000040,inset_2px_2px_6px_0px_#FFFFFF80] bg-[#303030] text-[#D2D2D2] box-border overflow-y-auto break-words whitespace-normal"
                        placeholder="List team members with roles (e.g., John Doe - Lead Developer)"
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full h-[73px] bg-[#30303099] flex items-center justify-end px-[28px] py-[12px] gap-[40px] rounded-b-lg flex-shrink-0">
                    <button
                      onClick={handleSave}
                      className="w-[105px] h-[45px] flex items-center gap-[8px] rounded-md pt-[8px] pr-[16px] pb-[8px] pl-[16px]
                      bg-[#ACACAC40] border border-white backdrop-blur-[4px]
                      shadow-[2px_4px_4px_0px_#00000040,inset_2px_2px_8px_0px_#FFFFFF40] cursor-pointer uppercase"
                    >
                      <img src={save} alt="save" className="w-6 h-6" />
                      <span className="w-[40px] h-[24px] text-white opacity-100 text-[16px] font-semibold leading-[24px] tracking-[0.02em] uppercase font-sans">
                        SAVE
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkPage;