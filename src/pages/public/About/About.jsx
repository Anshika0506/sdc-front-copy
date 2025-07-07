import React from "react";
import img2 from "../../../assets/img2.svg";
import img1 from "../../../assets/img1.svg";
import img3 from "../../../assets/img3.svg";
import img4 from "../../../assets/img4.svg";
import medi from "../../../assets/center.svg";
import center from "../../../assets/medi1.svg";
import alumni1 from "../../../assets/alumni1.svg";
import alumni2 from "../../../assets/alumni2.svg";
import alumni3 from "../../../assets/alumni3.svg";
import partner1 from "../../../assets/partner1.svg";
import partner2 from "../../../assets/partner2.svg";

const about = () => {
  const alumni = [
    {
      name: "Mohit Sharma",
      company: "Google",
      lpa: "12 L",
      image: alumni1,
    },
    {
      name: "Daksh Dubey",
      company: "Microsoft",
      lpa: "10 L",
      image: alumni2,
    },
    {
      name: "Rahul Patidar",
      company: "Apple",
      lpa: "8 L",
      image: alumni3,
    },
  ];
  const images = [img1, img2, img3, img4];
  return (
    <div>
      <section
        className="max-w-5xl mx-auto rounded-xl mt-10 p-6 text-center shadow-md"
        style={{
          boxShadow:
            "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
        }}
      >
        <h2
          className=" text-white font-semibold mb-4"
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: 48,
            // lineHeight:,
          }}
        >
          Overview
        </h2>
        <p
          className="text-gray-200  font-mono text-justify"
          style={{
            fontWeight: 400,
            fontSize: 16,
          }}
        >
          The Developers Community is a dynamic community where coding
          enthusiasts at all levels come together to exchange knowledge,
          collaborate on projects, and drive innovation. United by a shared
          passion for programming, our members participate in a variety of
          activities, such as workshops, hackathons, and networking events, all
          aimed at deepening their skills in programming languages, software
          development practices, and the latest technologies.
        </p>
      </section>

      {/* Gallery */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 max-w-5xl mx-auto px-4">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Gallery ${idx + 1}`}
            className="rounded-lg object-cover w-full h-40 shadow-md"
          />
        ))}
      </section>

      {/* How We Work */}
      <section className="max-w-5xl mx-auto mt-16 px-4">
        <div className="flex flex-wrap items-start gap-x-2">
          <h2
            className="text-white font-bold "
            style={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: 48,
            }}
          >
            How We Work?
          </h2>
          <p
            className="text-sm font-mono text-gray-300 md:pt-[2.5rem]"
            style={{
              fontWeight: 400,
              fontSize: 16,
            }}
          >
            Potter ipsum wand elf parchment wingardium. Hats slytherin’s
          </p>
        </div>
        <p
          className="text-sm font-mono text-gray-300"
          style={{
            fontWeight: 400,
            fontSize: 16,
          }}
        >
          hippogriffs. Whomping dittany keeper hand wand where where. Lady
          eeylops leprechaun turban cup diadem professor gillywater bathrooms
          rock-cake. Detention feather gillyweed robes boggarts. Unwilling
          thestral hungarian witch ravenclaw's do bred potter feast.
        </p>
      </section>

      {/* Root + Center + Medi Cards */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 max-w-6xl mx-auto mt-20 px-4">
        <div
          style={{
            boxShadow:
              "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
          }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white shadow-md w-full max-w-sm"
        >
          <h3
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: 48,
            }}
          >
            Root
          </h3>
          <p
            className="text-sm font-mono text-gray-200 text-justify py-[8px] pr-[11px] pl-[8px]"
            style={{
              fontWeight: 400,
              fontSize: 16,
            }}
          >
            Potter ipsum wand elf parchment wingardium. Ludo glory house
            peruvian-night-powder crush dobby last wand. Order azkaban umbrella
            elder hunt knight-bus lion. Floor head map carriages giant out
            slytherin’s. Hexed mrs memory of peg-leg great dress catherine floo.
            Downfall easy is sticking this hair 10 azkaban.
          </p>
        </div>
        <div
          style={{
            boxShadow: "", // LEFT shadow only
          }}
          className=" -ml-10 mt-[1rem] z-0 rounded-xl w-[300px] h-[300px] flex items-center justify-center"
        >
          <img
            src={center}
            alt="Centre for Innovation"
            className="object-contain"
          />
        </div>
        <div
          style={{
            boxShadow: "", // LEFT shadow only
          }}
          className="-ml-15 mt-[1rem] z-0 rounded-2xl w-[300px] h-[300px] flex items-center justify-center"
        >
          <img
            src={medi}
            alt="Medicaps University"
            className="object-contain"
          />
        </div>
      </div>

      {/* Golden Alumni */}
      <section className="py-16 px-4 text-white max-w-6xl mx-auto mt-28">
        <h2
          className="text-4xl font-bold text-center mb-12"
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: 48,
          }}
        >
          Golden Alumni
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {alumni.map((person, idx) => (
            <div
              key={idx}
              style={{
                boxShadow:
                  "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
              }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg text-white"
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-[273px] object-cover rounded-[10px] mb-4"
              />
              <h3
                className="text-xl font-semibold text-center"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: 24,
                }}
              >
                {person.name}
              </h3>
              <p
                className="text-sm font-mono text-gray-200 text-center"
                style={{
                  fontWeight: 400,
                  fontSize: 16,
                }}
              >
                Company Name - {person.company}
              </p>
              <p
                className="text-sm font-mono text-gray-200 text-center mb-3"
                style={{
                  fontWeight: 400,
                  fontSize: 16,
                }}
              >
                LPA - {person.lpa}
              </p>
              <p
                className="text-gray-300 text-sm font-mono text-justify mt-2"
                style={{
                  fontWeight: 400,
                  fontSize: 16,
                }}
              >
                {" "}
                Potter ipsum wand elf parchment wingardium. Ludo glory house
                peruvian-night-powder crush dobby last wand. Order azkaban
                umbrella elder hunt knight-bus lion.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Partners */}
      <section className="text-white py-16 px-4 max-w-6xl mx-auto">
        <h2
          className="text-4xl font-bold text-center mb-12"
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: 48,
          }}
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
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 24,
              }}
            >
              Partner name
            </h3>
            <p
              className="text-sm font-mono text-gray-300"
              style={{
                fontWeight: 400,
                fontSize: 16,
              }}
            >
              Potter ipsum wand elf parchment wingardium. Hats slytherin’s
              blubber leviosa half-giant match jinxes holyhead knight-bus
              hippogriffs. Whomping dittany keeper hand wand where where. Lady
              eeylops leprechaun turban cup diadem professor gillywater
              bathrooms rock-cake. Detention feather gillyweed robes boggarts.
              Unwilling thestral hungarian witch ravenclaw’s do bred potter
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
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 24,
              }}
            >
              Partner name
            </h3>
            <p
              className=" font-mono text-gray-300 mr-[1rem]"
              style={{
                fontWeight: 400,
                fontSize: 16,
              }}
            >
              Potter ipsum wand elf parchment wingardium. Hats slytherin’s
              blubber leviosa half-giant match jinxes holyhead knight-bus
              hippogriffs. Whomping dittany keeper hand wand where where. Lady
              eeylops leprechaun turban cup diadem professor gillywater
              bathrooms rock-cake. Detention feather gillyweed robes boggarts.
              Unwilling thestral hungarian witch ravenclaw’s do bred potter
              feast.
            </p>
          </div>
        </div>
      </section>

      {/* Minds Behind The Website */}
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
    </div>
  );
};

export default about;
