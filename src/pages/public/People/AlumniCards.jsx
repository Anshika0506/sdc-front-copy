import { useState, useEffect } from "react";
import leftArrow from "../../../assets/leftArrow.svg";
import rightArrow from "../../../assets/rightArrow.svg";
import { getAlumini } from '../../../api/Public/getAlumini';
import alumni3 from "../../../assets/alumni3.svg";

export default function AlumniCarousel() {
  const [alumni, setAlumni] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1); // center card initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getAlumini();
        // Map backend fields to frontend expected fields
        const mapped = Array.isArray(data)
          ? data.map(a => ({
              name: a.aluminiName,
              lpa: a.lpa,
              companyName: a.companyName,
              image: a.image || alumni3,
              content: a.content,
            }))
          : [];
        setAlumni(mapped);
      } catch (err) {
        setError("Failed to load alumni.");
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  const total = alumni.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  if (loading) {
    return <div className="w-full text-center py-20 text-white">Loading alumni...</div>;
  }
  if (error) {
    return <div className="w-full text-center py-20 text-red-400">{error}</div>;
  }
  if (alumni.length === 0) {
    return <div className="w-full text-center py-20 text-white">No alumni found.</div>;
  }

  return (
    <section className="relative py-16 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">Alumni</h2>

      <div className="relative w-full px-6">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          className="absolute left-72 top-1/2 -translate-y-1/2 z-10 shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] backdrop-blur p-3 rounded-xl transition hover:bg-white/20"
        >
          <img src={leftArrow} alt="Left" className="w-10 h-10" />
        </button>

        {/* Carousel */}
        <div className="relative h-[500px] overflow-hidden">
          <div className="relative w-full h-full">
            {alumni.map((alum, idx) => {
              let offset = idx - currentIndex;
              if (offset < -Math.floor(total / 2)) offset += total;
              if (offset > Math.floor(total / 2)) offset -= total;

              const baseTranslate = 500;
              let transform = "";
              let zIndex = 0;
              let opacity = 0;

              // Only show visible cards (offset -3 to 3 for 7 cards)
              if (offset < -3 || offset > 3) return null;

              let cardWidth = "w-85";
              if (Math.abs(offset) === 3) cardWidth = "w-85"; // smallest for far left/right
              if (Math.abs(offset) === 2) cardWidth = "w-85"; // smaller for next
              if (Math.abs(offset) === 1) cardWidth = "w-85"; // slightly smaller for near

              if (offset === -3) {
                transform = `translateX(-${baseTranslate * 1.58}px) scale(0.7) rotateY(65deg)`;
                zIndex = 0;
                opacity = 0.5;
              } else if (offset === -2) {
                transform = `translateX(-${baseTranslate * 1.22}px) scale(0.8) rotateY(50deg)`;
                zIndex = 1;
                opacity = 0.7;
              } else if (offset === -1) {
                transform = `translateX(-${baseTranslate * 0.744}px) scale(0.9) rotateY(40deg)`;
                zIndex = 5;
                opacity = 0.9;
              } else if (offset === 0) {
                transform = `translateX(0px) scale(1.08) rotateY(0deg)`;
                zIndex = 10;
                opacity = 1;
              } else if (offset === 1) {
                transform = `translateX(${baseTranslate * 0.48}px) scale(0.9) rotateY(-40deg)`;
                zIndex = 5;
                opacity = 0.9;
              } else if (offset === 2) {
                transform = `translateX(${baseTranslate * 0.838}px) scale(0.8) rotateY(-50deg)`;
                zIndex = 1;
                opacity = 0.7;
              } else if (offset === 3) {
                transform = `translateX(${baseTranslate * 1.083}px) scale(0.7) rotateY(-60deg)`;
                zIndex = 0;
                opacity = 0.5;
              }

              return (
                <div
                  key={idx}
                  className={`absolute top-0 left-1/2 ${cardWidth} py-4 h-full`}
                  style={{
                    transform: `${transform} translate(-50%, 0%)`,
                    opacity,
                    zIndex,
                    transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
                    transformOrigin: "center",
                  }}
                >
                  <div className="shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] bg-white/8 p-2 rounded-2xl overflow-hidden h-full border border-gray-700">
                    <img
                      src={alum.image}
                      alt={alum.name}
                      className="w-full h-80 p-3 object-cover rounded-3xl"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-white text-center">
                        {alum.name}
                      </h3>
                      <p className="text-sm text-gray-200 text-center">
                        {alum.companyName}
                      </p>
                      <p className="text-sm text-yellow-300 text-center">
                        {alum.lpa ? alum.lpa + ' LPA' : ''}
                      </p>
                      <p className="text-sm mt-2 text-gray-300 font-mono text-center">
                        {alum.content}
                      </p>
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
          className="absolute right-80 top-1/2 -translate-y-1/2 z-10 shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] backdrop-blur p-3 rounded-xl transition hover:bg-white/20"
        >
          <img src={rightArrow} alt="Right" className="w-10 h-10" />
        </button>
      </div>
    </section>
  );
}