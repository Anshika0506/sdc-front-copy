import { useState, useEffect } from "react";
import alumni3 from "../../../assets/alumni3.svg";
import leftArrow from "../../../assets/leftArrow.svg";
import rightArrow from "../../../assets/rightArrow.svg";
import { getAlumini } from "../../../api/Public/getAlumini";

export default function AlumniCarousel() {
  const [alumni, setAlumni] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAlumini();
        setAlumni(data);
      } catch (err) {
        setError("Failed to load alumni.");
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, []);
  // Set currentIndex to center after alumni load
  useEffect(() => {
    if (alumni.length > 0) {
      setCurrentIndex(Math.floor(alumni.length / 2));
    }
  }, [alumni]);
  const total = alumni.length;

  const handleNext = () => {
    if (total > 0) {
      setCurrentIndex((prev) => (prev + 1) % total); // 👈 loop to start
    }
  };

  const handlePrev = () => {
    if (total > 0) {
      setCurrentIndex((prev) => (prev - 1 + total) % total); // 👈 loop to end
    }
  };

  return (
    <section className="relative py-16 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">Alumni</h2>
      {loading ? (
        <div className="text-white text-center">Loading alumni...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
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
                        src={alum.image || alumni3}
                        alt={alum.name}
                        className="w-full h-60 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg">{alum.name}</h3>
                        <p className="text-sm text-gray-600">{alum.title || "Alumnus"}</p>
                        <p className="text-sm mt-2">{alum.desc || "No description available."}</p>
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
      )}
    </section>
  );
}