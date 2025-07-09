import React from 'react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { label: 'HOME PAGE', path: '/admin/manage-home' },
  { label: 'ABOUT PAGE', path: '/admin/manage-about' },
  { label: 'WORK PAGE', path: '/admin/manage-work' },
  { label: 'PEOPLE PAGE', path: '/admin/manage-people' },
  { label: 'QUERY ENTRIES', path: '/admin/manage-services' },
  { label: 'APPLY ENTRIES', path: '/admin/manage-career' },
];

const Sidebar = () => {
  return (
    <aside className="ml-[0.05rem] w-[240px] h-[924px] py-4 px-3 border border-[#FFFFFF80]/50 border-b-[1px] border-l-[1px] bg-[#EFEFEF26]/50 shadow-[2px_2px_4px_rgba(0,0,0,0.25),inset_2px_2px_8px_rgba(255,255,255,0.25)] backdrop-blur-[6px]">
      <nav className="flex flex-col space-y-3">
        {menuItems.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `px-4 py-3 w-[212px] h-[44px] rounded-md font-mono text-white text-[16px] font-semibold
              ${isActive
                ? 'border border-white bg-[#ACACAC40]/40'
                : 'bg-[#ACACAC40]/25 hover:border hover:border-white'}
              shadow-[2px_4px_4px_rgba(0,0,0,0.25),inset_2px_2px_8px_rgba(255,255,255,0.25)] backdrop-blur-[4px]`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
