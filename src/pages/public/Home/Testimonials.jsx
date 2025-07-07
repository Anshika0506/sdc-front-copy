import { useRef, useEffect } from "react";
import upButton from "../../../assets/upbutton.svg";
import downButton from "../../../assets/downbutton.svg";
import sunny from "../../../assets/sunny.webp";

const testimonials = [
  {
    name: "Client Name",
    image: sunny,
    text: "Potter ipsum wand elf parchment wingardium. Orbs easy magic asbhjg adgshfg  asgfhgdbds s chasjb cdschb cjhb start-of-te avihn vdvnikdfgn kjfdkj h hfgiuhdfnvjfv f jfvijfnv if fjdfnvjn  ifi dfnvn i invifvnvjnvj nvjnvfkjvn i jvivn jf vnfjnvkjfnvsij sij uer elf treats ravenclaw witch sprm through...",
  },
  {
    name: "Client Name",
    image: sunny,
    text: "Creature die potter knickerbvnikdfgn kjfdkj h hfgiuhdfnvjfv f jfvijfnv if fjdfnvjn  ifi dfnvn i invifvnvjnvj nvjnvfkjvn i jvivn jf vnfjnvkjfnvsij sij uer elf treats ravenclaw witch sp sij uer elf treats ravenclaw witch splinched...",
  },
  {
    name: "Client Name",
    image: sunny,
    text: "Wronski betrayal knjvn vkjnjkv n fn vjfnv kjfv  fdfvkdfvkdfv  ffloor seven keeper petrificus avihn vdvnikdfgn kjfdkj h hfgiuhdfnvjfv f jfvijfnv if fjdfnvjn  ifi dfnvn i invifvnvjnvj nvjnvfkjvn i jvivn jf vnfjnvkjfnvsij sij uer elf treats ravenclaw witch sp again...",
  },
];

export default function Testimonials() {
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop += offset;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          scroll(250);
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
  <div className="w-full px-4 py-16 flex flex-col justify-center items-center rounded-3xl max-w-7xl mx-auto relative">
    <h2 className="text-white text-4xl font-semibold font-['Inter'] mb-12">
      Testimonials
    </h2>

    <div className="w-full flex justify-center gap-6 relative">
      <div
        ref={scrollRef}
        className="h-full md-h-full sm:h-full p-6 sm:p-10 px-4 sm:px-6 pr-10 sm:pr-20 flex flex-col gap-8 relative rounded-3xl backdrop-blur-sm bg-white/5 shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)]"
      >
        {/* Buttons inside scrollable container */}
        <div className="absolute right-2 sm:right-4 top-24 md:top-34 sm:top-32 flex flex-col gap-50 z-10">
          <button
            onClick={() => scroll(-250)}
            className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)]"
          >
            <img src={upButton} alt="Scroll Up" className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => scroll(250)}
            className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)]"
          >
            <img src={downButton} alt="Scroll Down" className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {testimonials.map((t, index) => (
          <div key={index} className="flex items-start gap-4 max-w-4xl">
            <img
              src={t.image}
              className={`${
                index === 1 ? "w-44 h-44 sm:w-52 sm:h-52" : "w-20 h-20 sm:w-28 sm:h-28"
              } rounded-3xl object-cover shrink-0`}
              alt={t.name}
            />
            <div className="flex flex-col gap-2 text-white font-['IBM_Plex_Mono']">
              <h4
                className={`text-sm md:text-lg sm:text-xl font-semibold ${
                  index === 1 ? "text-white" : "text-white/80"
                }`}
              >
                {t.name}
              </h4>
              <p
                className={`${
                  index === 1 ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                } leading-tight text-white/60 text-justify`}
              >
                {t.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}
