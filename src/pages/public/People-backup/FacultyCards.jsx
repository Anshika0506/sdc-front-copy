import React, { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import backgroundImage from "../../../assets/mesh-gradient.webp";
import alumni3 from "../../../assets/alumni3.svg";
import MentorCard from "../../../components/MentorCard";
import JoinCard from "../../../components/JoinCard";
import ApplicationModal from "../../../components/ApplicationFormNew";
import { getPeople } from "../../../api/Public/getPeople";

const mentors = [
  {
    name: "Dr. Kalish Chandra Bandhu",
    title: "Chair, Developers Community,\nMedi-Caps University",
    img: alumni3,
  },
  {
    name: "Dr. Kalish Chandra Bandhu",
    title: "Chair, Developers Community,\nMedi-Caps University",
    img: alumni3,
  },
  {
    name: "Dr. Kalish Chandra Bandhu",
    title: "Chair, Developers Community,\nMedi-Caps University",
    img: alumni3,
  },
];

const People = () => {
  const [showModal, setShowModal] = useState(false);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPeople();
        setTeam(Array.isArray(data) ? data : data?.data || []);
      } catch (err) {
        setError("Failed to load team members.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div
      className="w-full min-h-screen pt-0 pr-2 pb-4 pl-2 bg-cover bg-center bg-no-repeat bg-fixed mt-20"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Mentors */}
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-12 text-center">
          Faculty Mentors
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full">
          {mentors.map((mentor, idx) => (
            <MentorCard
              key={idx}
              name={mentor.name}
              title={mentor.title}
              image={mentor.img}
            />
          ))}
        </div>

        {/* Team Section */}
        <div className="w-full opacity-100 relative top-[40px] pt-16 pb-40 pr-4 pl-4">
          <div className="max-w-[1420px] mx-auto flex flex-col gap-12">
            <h2 className="text-center text-white font-semibold text-4xl leading-[2rem] tracking-normal">
              Team That Make It Happen
            </h2>

            {/* Grid of Cards */}
            {loading ? (
              <div className="flex flex-col items-center justify-center text-white text-center">
                <svg
                  className="animate-spin h-8 w-8 text-white mx-auto mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Loading team members...
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">
                {error}
                <button
                  className="ml-4 px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30 transition"
                  onClick={() => {
                    setLoading(true);
                    setError(null);
                    (async () => {
                      try {
                        const data = await getPeople();
                        setTeam(Array.isArray(data) ? data : data?.data || []);
                      } catch (err) {
                        setError("Failed to load team members.");
                      } finally {
                        setLoading(false);
                      }
                    })();
                  }}
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 align-center w-full h-[1740px] pl-20 pr-20 ">
                {team.map((member, idx) => (
                  <MentorCard
                    key={idx}
                    name={member.name}
                   
                    position={member.position || ""}
                    image={member.image || alumni3}
                  />
                ))}
                <JoinCard setShowModal={setShowModal} />
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && <ApplicationModal setShowModal={setShowModal} />}
    </div>
  );
};

export default People;
