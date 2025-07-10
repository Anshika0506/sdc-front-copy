import React, { useEffect, useState } from "react";
import img from "../../../assets/laptopimg.svg";
import arrowleft from "../../../assets/leftarrow.svg";
import arrowRight from "../../../assets/rightarrow.svg";

const projects = [
  {
    title: "Medgel Website",
    description: "It is a website developed for Medgel Pharmaceuticals.",
    status: "Deployed",
    imageUrl: img,
  },
  {
    title: "Mentor Mentee Portal",
    description:
      "It is a web based application developed for Medicaps University.",
    status: "In Development",
    imageUrl: img,
  },
  {
    title: "Alumni Portal",
    description: "A platform to connect alumni with current students.",
    status: "Development",
    imageUrl: img,
  },
];

const FeaturedProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCardAt = (offset) => {
    return projects[
      (currentIndex + offset + projects.length) % projects.length
    ];
  };

  return (
    <section className="py-12 text-white">
      <h2 className="text-4xl font-semibold text-center mb-12">
        Featured Projects
      </h2>

      <div className="relative flex items-center justify-center max-w-7xl mx-auto px-4">
        {/* Left Button */}
        <button
          onClick={goToPrev}
          className="absolute w-15 h-15 left-4 md:left-34 z-20 shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] p-2 rounded-xl"
        >
          <img src={arrowleft} alt="left" className="w-full h-full" />
        </button>

        {/* Cards */}
        <div className="flex -space-x-16 md:-space-x-20 items-center overflow-x-visible">
          {[getCardAt(-1), getCardAt(0), getCardAt(1)].map((project, index) => {
            const scale =
              index === 1
                ? "scale-100 z-20"
                : "scale-80 md:scale-80 z-10 opacity-30 md:opacity-40";

            return (
              <div
                key={project.title}
                className={`w-[85%] sm:w-[70%] md:w-full h-[365px] md:h-full rounded-2xl transition-all duration-500 shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] ${scale}`}
              >
                <div className="p-4 flex flex-col gap-4 h-full">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="rounded-xl object-cover w-full"
                  />

                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm md:text-xl font-semibold">
                      {project.title}
                    </h3>
                    <span className="cursor-pointer inline-block shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] text-yellow-300 text-[13px] md:text-[15px] px-3 py-1 rounded-full font-mono whitespace-nowrap">
                      {project.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300">{project.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Button */}
        <button
          onClick={goToNext}
          className="absolute w-15 h-15 right-4 md:right-34 z-20 shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] p-2 rounded-xl"
        >
          <img src={arrowRight} alt="right" className="w-full h-full" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedProjects;
