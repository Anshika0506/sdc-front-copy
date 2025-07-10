
import React, { useState } from "react";
import meshGradient from "../../../assets/mesh-gradient.webp";
import { X, Calendar } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample gallery data - replace with your actual images
  const galleryData = [
    {
      id: 1,
      title: "Tech Workshop 2024",
      category: "workshop",
      date: "January 15, 2024",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&h=400&fit=crop",
      description: "An intensive workshop on modern web development technologies"
    },
    {
      id: 2,
      title: "Hackathon Championship",
      category: "hackathon",
      date: "February 20, 2024",
      image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=500&h=400&fit=crop",
      description: "48-hour coding marathon with exciting prizes"
    },
    {
      id: 3,
      title: "AI Summit Opening",
      category: "conference",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=400&fit=crop",
      description: "Opening ceremony of AI & Machine Learning Summit"
    },
    {
      id: 4,
      title: "Team Building Activity",
      category: "event",
      date: "April 5, 2024",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop",
      description: "Fun team building exercises and networking"
    },
    {
      id: 5,
      title: "Innovation Showcase",
      category: "showcase",
      date: "May 12, 2024",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=400&fit=crop",
      description: "Presenting groundbreaking student projects"
    },
    {
      id: 6,
      title: "Coding Competition",
      category: "competition",
      date: "June 8, 2024",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=400&fit=crop",
      description: "Annual coding competition with live judging"
    },
    {
      id: 7,
      title: "Developer Meetup",
      category: "meetup",
      date: "July 15, 2024",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=400&fit=crop",
      description: "Monthly developer community meetup"
    },
    {
      id: 8,
      title: "Workshop Session",
      category: "workshop",
      date: "August 20, 2024",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=400&fit=crop",
      description: "Hands-on workshop on React and Node.js"
    },
    {
      id: 9,
      title: "Gaming Tournament",
      category: "competition",
      date: "September 10, 2024",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=400&fit=crop",
      description: "Esports tournament with multiple game categories"
    },
    {
      id: 10,
      title: "Tech Conference",
      category: "conference",
      date: "October 5, 2024",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=400&fit=crop",
      description: "Annual tech conference with industry leaders"
    },
    {
      id: 11,
      title: "Project Demo Day",
      category: "showcase",
      date: "November 12, 2024",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop",
      description: "Student project presentations and demos"
    },
    {
      id: 12,
      title: "Networking Event",
      category: "event",
      date: "December 8, 2024",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=400&fit=crop",
      description: "Professional networking and career guidance"
    }
  ];



  // Modal open/close handlers
  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="min-h-screen relative">
      {/* Mesh Gradient Background */}
      <img src={meshGradient} alt="background" className="fixed inset-0 w-full h-full object-cover -z-10" style={{ pointerEvents: 'none' }} />

     {/* Header */}
<div className="bg-black/20 backdrop-blur-sm border-b border-white/10 mt-20">
  <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-center flex-col text-center">
    <h1
      className="text-4xl font-bold text-white mb-2"
      style={{
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: 48,
      }}
    >
      Gallery
    </h1>
    <p className="text-gray-300 font-mono">
      Explore our collection of memorable moments and achievements
    </p>
  </div>
</div>


      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryData.map((item) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="group cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: "2px 2px 4px 0px #00000040, inset 2px 2px 6px 0px #FFFFFF80",
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 left-3 right-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-mono">{item.date}</p>
                </div>
              </div>
              <div className="p-4">
                <h3
                  className="text-lg font-semibold text-white mb-2 line-clamp-2"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm font-mono line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/60 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-64 md:h-96 object-cover rounded-t-2xl"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="text-2xl font-bold text-white"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                    }}
                  >
                    {selectedImage.title}
                  </h2>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span className="font-mono text-sm">{selectedImage.date}</span>
                  </div>
                </div>
                <p className="text-gray-300 font-mono leading-relaxed">
                  {selectedImage.description}
                </p>
                <div className="flex items-center justify-end mt-6">
                  <button
                    onClick={closeModal}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;