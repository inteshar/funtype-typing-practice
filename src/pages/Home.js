import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useState } from "react";

const Home = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center gap-8 px-4">
        {/* Logo Section */}
        <div
          className={`relative -mt-20 w-40 h-40 md:w-56 md:h-56 cursor-pointer rounded-full overflow-hidden transition-transform duration-500
                      ${isLogoHovered ? "scale-110" : "scale-100"}`}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <img
            src={Logo}
            className={`w-full h-full object-cover transition-transform duration-500
                        ${isLogoHovered ? "scale-110 rotate-12" : "scale-100"}`}
            alt="FunType"
          />
        </div>
        <h1
          className="p-2 text-4xl sm:text-6xl md:text-8xl font-bold font-mono tracking-wider 
                        bg-clip-text text-transparent bg-gradient-to-r 
                        from-blue-400 to-purple-400 animate-pulse whitespace-nowrap"
        >
          Typing Practice
        </h1>

        {/* Game Mode Buttons */}
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <Link
            to="/word-typing"
            className="text-center group relative px-8 py-4 text-2xl rounded-xl
                     bg-white/10 border-2 border-white/20
                     hover:bg-white/20 hover:border-purple-400
                     transition-all duration-300 backdrop-blur-sm
                     hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <span
              className="text-[8px] font-bold md:text-sm opacity-80 
                          absolute -top-3 left-1/2 -translate-x-1/2 
                          bg-purple-900 px-2 rounded-full"
            >
              MODE
            </span>
            Word
          </Link>

          <Link
            to="/number-typing"
            className="text-center group relative px-8 py-4 text-2xl rounded-xl
                     bg-white/10 border-2 border-white/20
                     hover:bg-white/20 hover:border-blue-400
                     transition-all duration-300 backdrop-blur-sm
                     hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <span
              className="text-[8px] font-bold md:text-sm opacity-80 
                          absolute -top-3 left-1/2 -translate-x-1/2 
                          bg-purple-900 px-2 rounded-full"
            >
              MODE
            </span>
            Number
          </Link>
        </div>
      </div>

      {/* Bottom Instructions */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 text-center
                    bg-black/30 backdrop-blur-sm text-white/70 md:text-base"
      >
        <p className="border p-2 rounded-lg border-white/10 bg-white/5 text-sm font-bold">
          Choose a typing mode to begin practicing
        </p>
        <p className="text-xs p-2">
          Developed and Designed by Mohammad Inteshar Alam with ❤️ © 2024
        </p>
      </div>
    </div>
  );
};

export default Home;
