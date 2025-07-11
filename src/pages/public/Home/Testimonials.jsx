
import { useState, useEffect } from 'react';
import { getTestimonials } from '../../../api/Public/getTestimonials';
import upButton from "../../../assets/upbutton.svg";
import downButton from "../../../assets/downbutton.svg";

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getTestimonials();
        // Map backend fields to frontend expected fields
        const mapped = Array.isArray(data)
          ? data.map(t => ({
              name: t.clientName,
              text: t.des,
              image: t.image, // If image is a URL or needs prefix, adjust here
            }))
          : [];
        setTestimonials(mapped);
      } catch (err) {
        setError("Failed to load testimonials.");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % testimonials.length), 4000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (loading) {
    return <div className="w-full text-center py-20 text-white">Loading testimonials...</div>;
  }
  if (error) {
    return <div className="w-full text-center py-20 text-red-400">{error}</div>;
  }
  if (testimonials.length === 0) {
    return <div className="w-full text-center py-20 text-white">No testimonials found.</div>;
  }

  const visible = [
    testimonials[(index - 1 + testimonials.length) % testimonials.length],
    testimonials[index],
    testimonials[(index + 1) % testimonials.length],
  ];

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);


  return (
    <div className="w-full max-w-5xl mx-auto py-20 px-4 flex flex-col items-center text-white">
      <h2 className="text-4xl font-semibold mb-12 text-center">Testimonials</h2>

      <div className="relative w-full flex flex-col gap-8 bg-white/5  backdrop-blur-2xl shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] rounded-2xl overflow-hidden">
        <button
          onClick={prev}
          className="absolute top-30 right-6 z-10 bg-white/1 p-4 rounded-2xl shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] cursor-pointer"
        >
          <img src={upButton} alt="Up" className="w-6 h-6" />
        </button>

        <div className="flex flex-col transition-all duration-700 ease-in-out">
          {visible.map((t, i) => {
            // Responsive truncation logic
            let maxLength;
            if (i === 1) {
              // Center card: show up to 4 lines (approx 200 chars)
              maxLength = 200;
            } else {
              // Side cards: show up to 1.5 lines (approx 70 chars)
              maxLength = 70;
            }
            const showReadMore = t.text && t.text.length > maxLength;
            const displayText = showReadMore ? t.text.slice(0, maxLength) + "..." : t.text;
            const [showFull, setShowFull] = useState(false);

            // Use image if present, else fallback to a default avatar
            let imageSrc = t.image;
            if (!imageSrc) {
              imageSrc = "https://ui-avatars.com/api/?name=" + encodeURIComponent(t.name || "User");
            }

            return (
              <div
                key={i}
                className={`flex items-start gap-4 py-4 md:px-4 md:py-2 sm:px-8 sm:py-6 rounded-3xl w-full max-w-3xl transition-all duration-500 ease-in-out ${
                  i === 1 ? "scale-100 opacity-100" : "scale-90 opacity-40"
                }`}
              >
                <img
                  src={imageSrc}
                  alt={t.name}
                  className={`object-cover transition-all duration-500 ease-in-out ${
                    i === 1
                      ? "w-30 h-30 md:w-38 md:h-40 sm:w-28 sm:h-28 rounded-2xl"
                      : "w-20 h-20 md:w-30 md:h-30 sm:w-24 sm:h-24 rounded-full"
                  }`}
                />
                <div>
                  <h4 className="text-lg md:text-lg sm:text-xl font-semibold mb-1">
                    {t.name}
                  </h4>
                  <p className="text-sm md:text-base sm:text-base text-white/80 max-w-xl text-justify">
                    {showFull ? t.text : displayText}
                    {showReadMore && !showFull && (
                      <button
                        className="ml-2 underline cursor-pointer text-xs text-white/80"
                        onClick={() => setShowFull(true)}
                      >
                        Read More
                      </button>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={next}
          className="absolute bottom-30 right-6 z-10 bg-white/1 p-4 rounded-2xl shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] cursor-pointer"
        >
          <img src={downButton} alt="Down" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}