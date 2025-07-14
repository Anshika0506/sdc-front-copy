import React from 'react';
import gif404 from '../../assets/404PageGIF/404.mp4';

const Error404Page = () => {

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Glass Effect Container */}
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Oh Noo!!
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
                The Lamb destroyed our server!!
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                The Page You Are Looking For Is Missing!
              </p>
              
              {/* Return Button */}
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center gap-2">
                <span>🏠</span>
                RETURN TO HOME
              </button>
            </div>

            {/* Animated GIF */}
            <div className="flex-1 flex items-center justify-center">
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
                <div className="w-80 h-80 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  {/* Replace this src with your actual GIF path */}
             <video src={gif404} autoPlay loop muted className="w-full h-full object-contain rounded-xl" />
                 
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
        
       
      </div>
    </div>
  );
};

export default Error404Page;