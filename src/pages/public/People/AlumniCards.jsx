import { useState } from "react";
import alumni3 from "../../../assets/alumni3.svg";
import leftArrow from "../../../assets/leftArrow.svg";
import rightArrow from "../../../assets/rightArrow.svg";

const alumni = [
  {
    name: "Alex Johnson",
    title: "Product Designer @ Figma",
    image: alumni3,
    desc: "Design systems expert with 7 years experience...",
  },
  {
    name: "Elena Garcia",
    title: "AI Engineer @ OpenAI",
    image: alumni3,
    desc: "Building neural interfaces for next-gen AI...",
  },
  {
    name: "Arpit Mehta",
    title: "Corporate Strategist @ BCG",
    image: alumni3,
    desc: "Strategy consultant with focus on M&A...",
  },
  {
    name: "Juliana Smith",
    title: "Backend Developer @ Netflix",
    image: alumni3,
    desc: "Go enthusiast scaling microservices for media...",
  },
  {
    name: "William Stark",
    title: "DevOps @ GitHub",
    image: alumni3,
    desc: "CI/CD pipelines, Docker, K8s wizardry...",
  },
  {
    name: "Sophie Turner",
    title: "UX Researcher @ Google",
    image: alumni3,
    desc: "Human-centered design and product research...",
  },
  {
    name: "Sophie Turner",
    title: "UX Researcher @ Google",
    image: alumni3,
    desc: "Human-centered design and product research...",
  },
  {
    name: "Sophie Turner",
    title: "UX Researcher @ Google",
    image: alumni3,
    desc: "Human-centered design and product research...",
  },
  {
    name: "Sophie Turner",
    title: "UX Researcher @ Google",
    image: alumni3,
    desc: "Human-centered design and product research...",
  },
];

export default function AlumniCarousel() {
  const [currentIndex, setCurrentIndex] = useState(2); // center card initially
  const total = alumni.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total); // 👈 loop to start
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total); // 👈 loop to end
  };

  return (
    <section className="relative py-16 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">Alumni</h2>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur p-3 rounded-xl transition hover:bg-white/20"
        >
          <img src={leftArrow} alt="Left" className="w-6 h-6" />
        </button>

        {/* Carousel */}
        <div className="relative h-[420px] overflow-hidden">
          <div className="relative w-full h-full">
            {alumni.map((alum, idx) => {
              // calculate position relative to center
              let offset = idx - currentIndex;
              if (offset < -Math.floor(total / 2)) offset += total;
              if (offset > Math.floor(total / 2)) offset -= total;

              const baseTranslate = 220;
              let transform = "";
              let zIndex = 0;
              let opacity = 0;
              let scaleY = 1;

              if (offset === 0) {
                transform = `translateX(0px) scale(1) rotateY(0deg)`;
                zIndex = 10;
                opacity = 1;
              } else if (offset === -1) {
                transform = `translateX(-${baseTranslate * 1.3}px) scale(0.9) scaleY(0.85) rotateY(35deg)`;
                zIndex = 5;
                opacity = 1;
              } else if (offset === 1) {
                transform = `translateX(${baseTranslate}px) scale(0.9) scaleY(0.85) rotateY(-35deg)`;
                zIndex = 5;
                opacity = 1;
              } else if (offset === -2) {
                transform = `translateX(-${baseTranslate * 1.5}px) scale(0.7) scaleY(0.75) rotateY(60deg)`;
                zIndex = 1;
                opacity = 0.6;
              } else if (offset === 2) {
                transform = `translateX(${baseTranslate * 1.5}px) scale(0.7) scaleY(0.75) rotateY(-60deg)`;
                zIndex = 1;
                opacity = 0.6;
              } else {
                opacity = 0;
              }

              return (
                <div
                  key={idx}
                  className="absolute top-12 left-1/2 w-72 py-4 h-full"
                  style={{
                    transform: `${transform} translate(-50%, -10%)`,
                    opacity,
                    zIndex,
                    transition: "all 0.5s ease",
                    transformOrigin: "center",
                  }}
                >
                  <div className="shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] p-2 rounded-xl overflow-hidden h-full">
                    <img
                      src={alum.image}
                      alt={alum.name}
                      className="w-full h-60 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{alum.name}</h3>
                      <p className="text-sm text-gray-600">{alum.title}</p>
                      <p className="text-sm mt-2">{alum.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur p-3 rounded-xl transition hover:bg-white/20"
        >
          <img src={rightArrow} alt="Right" className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
