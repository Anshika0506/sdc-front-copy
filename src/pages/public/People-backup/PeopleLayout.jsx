// // src/routes/AppRoutes.jsx

import { Routes, Route } from "react-router-dom";

import FacultyCards from "../People/FacultyCards.jsx";
import AlumniCardsCards from "../People/AlumniCards.jsx";

const HomeLayout = () => {
  return (
    <>
      <FacultyCards />
      
      <AlumniCardsCards />
    </>
  );
};
export default HomeLayout;
