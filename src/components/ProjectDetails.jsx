import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backgroundImage from '../components/img.png';
import projectImage from '../components/project.png';
import icon from '../components/Icons.png';

export default function ProjectDetails() {
  const { title } = useParams();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen p-2"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Main Content Wrapper - Ensures all content aligns centrally */}
      <div className="max-w-[1420px] mx-auto py-6 pr-8 md:px-20 lg:px-24"> 

        {/* Title Section with Back Icon */}
        <div className="flex items-center text-white py-6 mb-8 ml-[-12]">
          {/* Back Icon */}
          <img
            src={icon}
            alt="Back"
            onClick={() => navigate(-1)}
            className="md:w-[50px] md:h-[50px] cursor-pointer mr-10"
          />
          <h2 className="font-sans font-semibold text-2xl md:text-3xl lg:text-4xl leading-tight tracking-normal opacity-100 flex-grow">
            {decodeURIComponent(title)}
          </h2>
        </div>

        
        <div className="mb-16 ml-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[589px_1fr] gap-x-12 items-start">
            <div className="relative w-full h-auto">
                <img
                    src={projectImage}
                    alt="Project Preview"
                    className="w-full h-auto opacity-100 rounded-xl"
                />

                {/* Mobile View Live Button*/}
                <button className="absolute bottom-4 right-4
                                   w-fit px-8 py-3 opacity-100 rounded-full shadow-[2px_2px_4px_0px_#00000040,_inset_2px_2px_6px_0px_#FFFFFF80] text-center
                                   md:hidden cursor-pointer"> 
                    <span className="text-base leading-6 font-normal text-[#00FF26]">
                        View Live
                    </span>
                </button>
            </div>

            {/* Desktop/Tablet View Live Button Container */}
            <div className="hidden md:flex justify-left items-end h-full"> 
                 <button className="w-full md:w-fit px-8 py-3 opacity-100 rounded-full shadow-[2px_2px_4px_0px_#00000040,_inset_2px_2px_6px_0px_#FFFFFF80] text-center 
                                    lg:w-[167px] lg:h-[52px] cursor-pointer">
                    <span className="text-base leading-6 font-normal text-[#00FF26]">
                        View Live
                    </span>
                 </button>
            </div>
        </div>

        {/* Project Description */}
        <div className="pt-3 pb-16 ml-14 justify-center">
          <p className="font-sans text-base leading-relaxed text-justify text-[#D2D2D2]">
            Potter ipsum wand elf parchment wingardium. Hats slytherin’s blubber leviosa half-giant match jinxes holyhead knight-bus hippogriffs. Whomping dittany keeper hand wand where where. Lady eeylops leprechaun turban cup diadem professor gillywater bathrooms rock-cake. Detention feather gillyweed robes boggarts. Unwilling thestral hungarian witch ravenclaw’s do bred potter feast. Potter ipsum wand elf parchment wingardium. Hats slytherin’s blubber leviosa half-giant match jinxes holyhead knight-bus hippogriffs. Whomping dittany keeper hand wand where where. Lady eeylops leprechaun turban cup diadem professor gillywater bathrooms rock-cake. Detention feather gillyweed robes boggarts. Unwilling thestral hungarian witch ravenclaw’s do bred potter feast. Potter ipsum wand elf parchment wingardium. Hats slytherin’s blubber leviosa half-giant match jinxes holyhead knight-bus hippogriffs. Whomping dittany keeper hand wand where where. Lady eeylops leprechaun turban cup diadem professor gillywater bathrooms rock-cake. Detention feather gillyweed robes boggarts. Unwilling thestral hungarian witch ravenclaw’s do bred potter feast. Potter ipsum wand elf parchment wingardium. Hats slytherin’s blubber leviosa half-giant match jinxes holyhead knight-bus hippogriffs. Whomping dittany keeper hand wand where where. Lady eeylops leprechaun turban cup diadem professor gillywater bathrooms rock-cake. Detention feather gillyweed robes boggarts. Unwilling thestral hungarian witch ravenclaw’s do bred potter feast.
          </p>
        </div>

        {/* Team Section */}
        <div className="text-white flex flex-col gap-7 mt-4 pb-20 ml-14">
          <h2 className="font-sans font-semibold text-xl md:text-2xl leading-tight text-white mb-4">
            Team Members
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Student Name – Project Manager</li>
            <li>Student Name – UI/UX Designer</li>
            <li>Student Name – UI Designer</li>
            <li>Student Name – Frontend Developer</li>
            <li>Student Name – Backend Developer</li>
          </ul>
        </div>
      </div>
    </div>
  );
}