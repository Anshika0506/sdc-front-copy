import React from "react";
import backgroundImage from '../../../assets/mesh-gradient.webp';
import projectImage from '../../../assets/project.png';
import externalLinkIcon from '../../../assets/breakpoint=Tablet, icon=external-link.png';
import { useNavigate } from 'react-router-dom'; 

const projects = [
  { title: "Note Sheet Website", status: "In Progress", color: "green", image: projectImage },
  { title: "Greviance Website", status: "In Progress", color: "green", image: projectImage },
  { title: "MII ERP Portal", status: "In Development", color: "yellow", image: projectImage },
  { title: "Mentor Mentee Portal", status: "In Development", color: "yellow", image: projectImage },
  { title: "Resume Shortlist Module", status: "In Development", color: "yellow", image: projectImage },
  { title: "Employee Recruitment Module", status: "In Progress", color: "green", image: projectImage },
  { title: "Tech Enabling Courses", status: "In Development", color: "yellow", image: projectImage },
  { title: "LLM Module", status: "In Development", color: "yellow", image: projectImage },
  { title: "Medgel Website", status: "In Progress", color: "green", image: projectImage },
  { title: "SDC Website", status: "In Development", color: "yellow", image: projectImage },
];

export default function WorkPage() {
  const navigate = useNavigate(); 

  return (
    <div
      className="w-full min-h-screen pt-0 pr-2 pb-4 pl-2 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-[1420px] mx-auto px-3">
        <div className="min-h-screen text-white">
          <h2 className="font-sans font-semibold text-3xl leading-tight tracking-normal text-center mb-8">
            Our Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-0 gap-y-14">
            {projects.map((project, index) => (
              <div
                key={index}
                // onClick={() => navigate(`/project/${encodeURIComponent(project.title)}`)} 
                                onClick={() => navigate(`/work/projectdetails`)} 

                className="hover-animated-card relative w-full max-w-[600px] mx-auto rounded-[2rem] p-6 md:p-8 text-left cursor-pointer group transition-all duration-[800ms]"
              >
                <img
                  src={project.image}
                  alt="project screenshot"
                  className="w-full h-auto max-h-[443px] rounded-xl mb-4 object-cover"
                />
                <div className="flex flex-wrap justify-between items-center w-full mb-2 gap-[10px] p-[10px]">
                  <h2 className="flex-1 min-w-[200px] text-left text-white font-sans font-semibold text-[20px] leading-[28px] break-words">
                    {project.title}
                  </h2>
                  <span
                    className="min-w-[180px] h-[52px] rounded-[2.5rem] px-[20px] py-[12px] text-[16px] leading-[24px] font-normal font-sans text-center shadow-[2px_2px_4px_0px_#00000040,_inset_2px_2px_6px_0px_#FFFFFF80]"
                    style={{
                      backgroundColor: 'transparent',
                      color: project.status === 'In Progress' ? '#00FF26' : '#FFF600'
                    }}
                  >
                    {project.status === 'In Progress' ? 'Deployed' : 'In Development'}
                  </span>
                </div>
                <p className="p-[10px] text-left text-white font-sans font-normal text-[16px] leading-[24px] tracking-[0.20rem] break-words">
                  It is a web based application developed for Medicaps University.
                </p>

                {/* Hover icon */}
                <img
                  src={externalLinkIcon}
                  alt="External link"
                  className="absolute bottom-6 right-6 w-15 h-15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 filter contrast-150"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hover background + glow effect styles */}
      <style>{`
        @keyframes fadeBackground {
          0% { background-color: rgba(255, 255, 255, 0.05); }
          40% { background-color: rgba(30, 30, 30, 0.75); }
          100% { background-color: rgba(255, 255, 255, 0.1); }
        }

        .hover-animated-card {
          background-color: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: none;
          transition: background-color 0.8s ease-in-out, box-shadow 0.8s ease-in-out;
        }

        .hover-animated-card:hover {
          animation: fadeBackground 0.8s ease-in-out forwards;
          box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.6), 0 0 18px 3px rgba(0, 191, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
