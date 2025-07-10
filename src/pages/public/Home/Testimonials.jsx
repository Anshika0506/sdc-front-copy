import { useState, useEffect } from "react";
import alumni from "../../../assets/alumni3.svg";
import alumni2 from "../../../assets/alumni2.svg";
import profile1 from "../../../assets/profile1.jpg";
import Testimonial1 from "../../../assets/Testimonial1.svg";
import Testimonial2 from "../../../assets/Testimonial2.svg";
import upButton from "../../../assets/upbutton.svg";
import downButton from "../../../assets/downbutton.svg";

const testimonials = [
  {
    name: "Client One",
    image: alumni,
    text: "Potter ipsum wandmus hungarian spider slytherin’s. 10 doe lady revision banges. Captivity splinched law juice from a lemon knew. Creature die potter knickerbocker elf treats ravenclaw witch splinched. Weasley lily crossbow tell grayback bagman seek betrayal. Wronski betrayal floor seven keeper petrificus again.",
  },
  {
    name: "Client Two",
    image: alumni2,
    text: "Their s. 10 doe lady revision banges. Captivity splinched law juice from a lemon knew. Creature die potter knickerbocker elf treats ravenclaw witch splinched. Weasley lily crossbow tell grayback bagman seek betrayal. Wronski betrayal floor seven keeper petrificus again.",
  },
  {
    name: "Client Three",
    image: profile1,
    text: "Really lady revision banges. Captivity splinched law juice from a lemon knew. Creature die potter knickerbocker elf treats ravenclaw witch splinched. Weasley lily crossbow tell grayback bagman seek betrayal. Wronski betrayal floor seven keeper petrificus again.!",
  },
  {
    name: "Client Four",
    image: Testimonial1,
    text: "They helped bring our idea to life bring ;lvlkz  ds bjsbo  dsgjjodsshg9uuugoua  jodj djvods vdsv dsjjdvjo vj our idea to life with precision and creativity with precision and creativity.",
  },
  {
    name: "Client Five",
    image: Testimonial2,
    text: "Delivered on time and exceeded bring our idea to jvs vo vjvjsnvjnvnjvnjdfsgiuhgu-uogfj g gujsov jfdsjovja o jdsofjsojo  life with precision and creativitybring our idea to life with precision and creativity  expectations!",
  },
];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  const visible = [
    testimonials[(index - 1 + testimonials.length) % testimonials.length],
    testimonials[index],
    testimonials[(index + 1) % testimonials.length],
  ];

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto py-20 px-4 flex flex-col items-center text-white">
      <h2 className="text-4xl font-semibold mb-12 text-center">Testimonials</h2>

      <div className="relative w-full flex flex-col gap-8 bg-white/5  backdrop-blur-2xl shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] rounded-2xl overflow-hidden">
        <button
          onClick={prev}
          className="absolute top-30 right-6 z-10 bg-white/10 p-4 rounded-2xl backdrop-blur-md shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)]"
        >
          <img src={upButton} alt="Up" className="w-6 h-6" />
        </button>

        <div className="flex flex-col transition-all duration-700 ease-in-out">
          {visible.map((t, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 px-6 py-4 md:px-4 md:py-2 sm:px-8 sm:py-6   rounded-3xl w-full max-w-3xl transition-all duration-500 ease-in-out ${
                i === 1 ? "scale-100 opacity-100" : "scale-90 opacity-40"
              }`}
            >
              <img
                src={t.image}
                alt={t.name}
                className={`rounded-2xl object-cover transition-all duration-500 ease-in-out ${
                  i === 1
                    ? "w-24 h-24 md:w-38 md:h-40 sm:w-28 sm:h-28" // bigger image for center
                    : "w-20 h-20 md:w-30 md:h-30 sm:w-24 sm:h-24" // smaller image for sides
                }`}
              />
              <div>
                <h4 className="text-lg sm:text-xl font-semibold mb-1">
                  {t.name}
                </h4>
                <p className="text-sm sm:text-base text-white/80 max-w-xl text-justify">
                  {t.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={next}
          className="absolute bottom-30 right-6 z-10 bg-white/10 p-4 rounded-2xl backdrop-blur-md shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)]"
        >
          <img src={downButton} alt="Down" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
