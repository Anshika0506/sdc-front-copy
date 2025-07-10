import React, { useState, useEffect } from "react";
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

const SlidingCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  
  // Sample event data - replace with your actual data
  const events = [
    {
      id: 1,
      name: "Tech Workshop 2024",
      image: img1,
      date: "Jan 15, 2024",
      description: "An intensive workshop on modern web development technologies"
    },
    {
      id: 2,
      name: "Hackathon Championship",
      image: img2,
      date: "Feb 20, 2024",
      description: "48-hour coding marathon with exciting prizes"
    },
    {
      id: 3,
      name: "AI & Machine Learning Summit",
      image: img3,
      date: "Mar 10, 2024",
      description: "Exploring the future of artificial intelligence"
    },
    {
      id: 4,
      name: "Developer Conference",
      image: img4,
      date: "Apr 5, 2024",
      description: "Annual gathering of developers and tech enthusiasts"
    },
    {
      id: 5,
      name: "Innovation Showcase",
      image: alumni1,
      date: "May 12, 2024",
      description: "Presenting groundbreaking student projects"
    },
    {
      id: 6,
      name: "Coding Bootcamp",
      image: alumni2,
      date: "Jun 8, 2024",
      description: "Intensive programming training for beginners"
    }
  ];

  const cardsToShow = 3;
  const totalCards = events.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (direction === 'right') {
          if (prev >= totalCards - cardsToShow) {
            setDirection('left');
            return prev - 1;
          }
          return prev + 1;
        } else {
          if (prev <= 0) {
            setDirection('right');
            return prev + 1;
          }
          return prev - 1;
        }
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [direction, totalCards, cardsToShow]);

  const handleViewAll = () => {
    // Redirect to gallery page
    window.location.href = '/gallery'; // Replace with your actual gallery route
  };

  return (
    <section className="text-white py-16 px-4 max-w-6xl mx-auto">
      <h2
        className="text-4xl font-bold text-center mb-12"
        style={{
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 48,
        }}
      >
        Glimpses of SDC
      </h2>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`
          }}
        >
          {events.map((event, index) => (
            <div
              key={event.id}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / cardsToShow}%` }}
            >
              <div
                className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                style={{
                  boxShadow: "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
                }}
              >
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3
                      className="text-xl font-semibold mb-1"
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 600,
                        fontSize: 20,
                      }}
                    >
                      {event.name}
                    </h3>
                    <p
                      className="text-sm text-gray-300 mb-2"
                      style={{
                        fontWeight: 400,
                        fontSize: 12,
                      }}
                    >
                      {event.date}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p
                    className="text-sm font-mono text-gray-300"
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                    }}
                  >
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center space-x-2 mt-8">
        {Array.from({ length: totalCards - cardsToShow + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleViewAll}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          VIEW ALL
        </button>
      </div>
    </section>
  );
};

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
            Potter ipsum wand elf parchment wingardium. Hats slytherin's
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
            slytherin's. Hexed mrs memory of peg-leg great dress catherine floo.
            Downfall easy is sticking this hair 10 azkaban.
          </p>
        </div>
        <div
          style={{
            boxShadow: "",
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
            boxShadow: "",
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
                Potter ipsum wand elf parchment wingardium. Ludo glory house
                peruvian-night-powder crush dobby last wand. Order azkaban
                umbrella elder hunt knight-bus lion.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sliding Cards Section - Added above Our Partners */}
      <SlidingCards />

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