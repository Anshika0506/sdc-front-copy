// File: components/PartnersAndTeam.jsx
import React from "react";
import partner1 from "../../../assets/partner1.svg";
import partner2 from "../../../assets/partner2.svg";

const PartnersAndTeam = () => {
  return (
    <>
      {/* Our Partners Section */}
      <section className="text-white py-16 px-4 max-w-6xl mx-auto">
        <h2
          className="text-4xl font-bold text-center mb-12"
          style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 48 }}
        >
          Our Partners
        </h2>

        {/* Partner 1 */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-10">
          <img
            src={partner1}
            alt="Partner 1"
            className="w-full md:w-[267px] h-[200px] object-cover rounded-xl shadow-lg"
          />
          <div>
            <h3
              className="text-2xl font-semibold mb-2"
              style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 24 }}
            >
              Partner name
            </h3>
            <p
              className="text-sm font-mono text-gray-300"
              style={{ fontWeight: 400, fontSize: 16 }}
            >
              Potter ipsum wand elf parchment wingardium. Hats slytherin's
              blubber leviosa half-giant match jinxes holyhead knight-bus
              hippogriffs. Whomping dittany keeper hand wand where where. Lady
              eeylops leprechaun turban cup diadem professor gillywater
              bathrooms rock-cake. Detention feather gillyweed robes boggarts.
              Unwilling thestral hungarian witch ravenclaw's do bred potter
              feast.
            </p>
          </div>
        </div>

        {/* Partner 2 */}
        <div className="md:flex flex-col md:flex-row-reverse md:items-start gap-6">
          <img
            src={partner2}
            alt="Partner 2"
            className="w-full md:w-[267px] h-[200px] object-cover rounded-xl shadow-lg"
          />
          <div>
            <h3
              className="text-2xl font-semibold mb-2"
              style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 24 }}
            >
              Partner name
            </h3>
            <p
              className="font-mono text-gray-300 mr-[1rem]"
              style={{ fontWeight: 400, fontSize: 16 }}
            >
              Potter ipsum wand elf parchment wingardium. Hats slytherin's
              blubber leviosa half-giant match jinxes holyhead knight-bus
              hippogriffs. Whomping dittany keeper hand wand where where. Lady
              eeylops leprechaun turban cup diadem professor gillywater
              bathrooms rock-cake. Detention feather gillyweed robes boggarts.
              Unwilling thestral hungarian witch ravenclaw's do bred potter
              feast.
            </p>
          </div>
        </div>
      </section>

      {/* Minds Behind The Website Section */}
      <section className="text-white py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Minds Behind The Website
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
          <div>
            <h3 className="text-2xl font-semibold mb-3">UI Designers</h3>
            <p className="text-sm font-mono text-gray-300">Eshaan Sharma</p>
            <p className="text-sm font-mono text-gray-300">Ketan Jain</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3">Frontend Developers</h3>
            <p className="text-sm font-mono text-gray-300">Vidhi Prajapati</p>
            <p className="text-sm font-mono text-gray-300">Vedanshi Saini</p>
            <p className="text-sm font-mono text-gray-300">Nikhil Sharma</p>
            <p className="text-sm font-mono text-gray-300">Avdhesh Badhoriya</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3">Backend Developers</h3>
            <p className="text-sm font-mono text-gray-300">Devansh Solanki</p>
            <p className="text-sm font-mono text-gray-300">Parth</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnersAndTeam;
