import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="ml-[0.05rem] w-[240px] shadow-[2px_2px_4px_rgba(0,0,0,0.25),inset_2px_2px_8px_rgba(255,255,255,0.25)] backdrop-blur-[6px] py-4 px-3 bg-[#EFEFEF26]/50 border-r-[1px] gap-[10px] border-b-[1px] border-[#FFFFFF80]/50 border-l-[1px] h-[924px]">
      <nav className="flex flex-col space-y-3 text-sm font-medium">
        <Link 
          to="/admin/manage-testimonials" 
          style={{fontSize:16, fontWeight:600}} 
          className="bg-[#ACACAC40]/25 text-white font-mono backdrop-blur-[4px] shadow-[2px_4px_4px_rgba(0,0,0,0.25),inset_2px_2px_8px_rgba(255,255,255,0.25)] px-4 py-3 w-[212px] h-[44.1303px] rounded-md hover:border-[1px] hover:border-[#FFFFFF]"
        >
          TESTIMONIALS PAGE
        </Link>

       
        <Link 
          to="/admin/manage-about" 
          style={{fontSize:16, fontWeight:600}} 
          className="bg-[#ACACAC40]/25 text-white font-mono backdrop-blur-[4px] shadow-[2px_4px_4px_rgba(0,0,0,0.25),inset_2px_2px_8px_rgba(255,255,255,0.25)] px-4 py-3 w-[212px] h-[44.1303px] rounded-md hover:border-[1px] hover:border-[#FFFFFF]"
        >
          ABOUT DETAILS
        </Link>
        
        <Link 
          to="/admin/manage-work" 
          style={{fontSize:16, fontWeight:600}} 
          className="bg-[#ACACAC40]/25 text-white font-mono backdrop-blur-[4px] shadow-[2px_4px_4px_rgba(0,0,0,0.25),inset_2px_2px_8px_rgba(255,255,255,0.25)] px-4 py-3 w-[212px] h-[44.1303px] rounded-md hover:border-[1px] hover:border-[#FFFFFF]"
        >
          PROJECT PAGE
        </Link>
        
        <Link 
          to="/admin/manage-people" 
          style={{fontSize:16, fontWeight:600}} 
          className="bg-[#ACACAC40]/25 text-white font-mono backdrop-blur-[4px] shadow-[2px_4px_4px_rgba(0,0,0,0.25),inset_2px_2px_8px_rgba(255,255,255,0.25)] px-4 py-3 w-[212px] h-[44.1303px] rounded-md hover:border-[1px] hover:border-[#FFFFFF]"
        >
          PEOPLE PAGE
        </Link>

        <Link 
          to="/admin/manage-faqs" 
          style={{fontSize:16, fontWeight:600}} 
          className="bg-[#ACACAC40]/25 text-white font-mono backdrop-blur-[4px] shadow-[2px_4px_4px_rgba(0,0,0,0.25),inset_2px_2px_8px_rgba(255,255,255,0.25)] px-4 py-3 w-[212px] h-[44.1303px] rounded-md hover:border-[1px] hover:border-[#FFFFFF]"
        >
          FAQ'S PAGE
        </Link>
        
        <Link 
          to="/admin/manage-services" 
          style={{fontSize:16, fontWeight:600}} 
          className="bg-[#ACACAC40]/25 text-white font-mono backdrop-blur-[4px] shadow-[2px_4px_4px_rgba(0,0,0,0.25),inset_2px_2px_8px_rgba(255,255,255,0.25)] px-4 py-3 w-[212px] h-[44.1303px] rounded-md hover:border-[1px] hover:border-[#FFFFFF]"
        >
          QUERY ENTRIES
        </Link>
        
        <Link 
          to="/admin/manage-career" 
          style={{fontSize:16, fontWeight:600}} 
          className="bg-[#ACACAC40]/25 text-white font-mono backdrop-blur-[4px] shadow-[2px_4px_4px_rgba(0,0,0,0.25),inset_2px_2px_8px_rgba(255,255,255,0.25)] px-4 py-3 w-[212px] h-[44.1303px] rounded-md hover:border-[1px] hover:border-[#FFFFFF]"
        >
          APPLY ENTRIES
        </Link>
      </nav>
    </aside> 
  );
};

export default Sidebar;