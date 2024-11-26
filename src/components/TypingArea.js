import { useState, useEffect, useRef } from "react";

const NumberTypingMode = () => {
  const [displayNumber, setDisplayNumber] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [lastResult, setLastResult] = useState("");
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(() => {
    // Load highest streak from localStorage, default to 0 if not set
    const savedStreak = localStorage.getItem("highestStreak");
    return savedStreak ? parseInt(savedStreak) : 0;
  });
  const [timeLimit, setTimeLimit] = useState(1000);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");
  const inputRef = useRef(null);
  const intervalRef = useRef(null);

  const generateRandomNumbers = () => {
    return Math.random().toString().slice(2, 6);
  };

  const checkInput = (input) => {
    if (input === currentNumber) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      setLastResult("CORRECT!");
      setStreak((prev) => {
        const newStreak = prev + 1;
        // Update the highest streak if the current streak is greater
        if (newStreak > highestStreak) {
          setHighestStreak(newStreak);
          localStorage.setItem("highestStreak", newStreak); // Persist highest streak in localStorage
        }
        return newStreak;
      });
      return true;
    } else {
      setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
      setLastResult("WRONG!");
      setStreak(0);
      return false;
    }
  };

  const startGame = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(true);
    setShowSettings(false);
    setScore({ correct: 0, wrong: 0 });
    setStreak(0);

    // Set initial number
    const newNumber = generateRandomNumbers();
    setDisplayNumber(newNumber);
    setCurrentNumber(newNumber);
    setUserInput("");

    intervalRef.current = setInterval(() => {
      // Check previous input before generating new number
      if (userInput !== "") {
        checkInput(userInput);
      } else {
        setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
        setLastResult("TIME UP!");
        setStreak(0);
      }

      // Generate new number
      const newNumber = generateRandomNumbers();
      setDisplayNumber(newNumber);
      setCurrentNumber(newNumber);
      setUserInput("");
      inputRef.current?.focus();
    }, timeLimit);
  };

  const pauseGame = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const handleInput = (e) => {
    const input = e.target.value;
    setUserInput(input);

    // If input matches current number, handle it immediately
    if (input === currentNumber) {
      checkInput(input);
      // Generate new number immediately
      const newNumber = generateRandomNumbers();
      setDisplayNumber(newNumber);
      setCurrentNumber(newNumber);
      setUserInput("");

      // Reset the interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          if (userInput !== "") {
            checkInput(userInput);
          } else {
            setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
            setLastResult("TIME UP!");
            setStreak(0);
          }
          const newNum = generateRandomNumbers();
          setDisplayNumber(newNum);
          setCurrentNumber(newNum);
          setUserInput("");
          inputRef.current?.focus();
        }, timeLimit);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const accuracy =
    score.correct + score.wrong > 0
      ? ((score.correct / (score.correct + score.wrong)) * 100).toFixed(1)
      : 0;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col items-center justify-center text-white">
      {/* Top Stats Bar */}
      <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center bg-black/30 backdrop-blur-sm z-50">
        <div className="flex gap-4 md:gap-6">
          <div className="flex flex-col items-center">
            <span className="text-xs md:text-sm opacity-80 font-retro">
              CORRECT
            </span>
            <span className="text-green-400 font-bold text-lg md:text-xl font-retro">
              {score.correct}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs md:text-sm opacity-80 font-retro">
              WRONG
            </span>
            <span className="text-red-400 font-bold text-lg md:text-xl font-retro">
              {score.wrong}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs md:text-sm opacity-80 font-retro">
              ACCURACY
            </span>
            <span className="text-blue-400 font-bold text-lg md:text-xl font-retro">
              {accuracy}%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-xs md:text-sm opacity-80 font-retro">
              STREAK
            </span>
            <span className="text-yellow-400 font-bold text-lg md:text-xl font-retro">
              🔥 {streak}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs md:text-sm opacity-80 font-retro">
              HIGHEST STREAK
            </span>
            <span className="text-yellow-500 font-bold text-lg md:text-xl font-retro">
              {highestStreak}
            </span>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center font-retro">
          <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm opacity-80 mb-2">
                  Time Limit (seconds)
                </label>
                <div className="flex gap-2">
                  {[0.5, 1, 1.5, 2, 3].map((time) => (
                    <button
                      key={time}
                      onClick={() => setTimeLimit(time * 1000)} // Update time limit without closing the modal
                      className={`px-4 py-2 rounded ${
                        timeLimit === time * 1000
                          ? "bg-purple-500 text-white"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      {time}s
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => {
                    startGame(); // Start game only when the user clicks "Start Game"
                    setShowSettings(false); // Close settings modal after starting the game
                  }}
                  className="flex-1 py-2 rounded bg-green-500 hover:bg-green-600 transition-colors"
                >
                  Start Game
                </button>
                <button
                  onClick={() => setShowSettings(false)} // Close settings modal without starting the game
                  className="flex-1 py-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Game Area */}
      {!showSettings && (
        <div className="flex flex-col items-center gap-8 px-4 max-w-full font-retro">
          {!isPlaying ? (
            <button
              onClick={startGame}
              className="px-8 py-4 text-2xl rounded-xl bg-purple-500 hover:bg-purple-600 transition-colors"
            >
              Start Game
            </button>
          ) : (
            <>
              <div className="relative">
                <div className="font-retro text-6xl md:text-8xl font-bold font-mono tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse whitespace-nowrap">
                  {displayNumber}
                </div>
                <div className="absolute -inset-4 bg-white/5 rounded-lg blur-lg -z-10"></div>
              </div>

              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInput}
                className="w-full max-w-[16rem] text-center text-2xl md:text-3xl font-mono py-3 px-4 
                           bg-white/10 border-2 border-white/20 rounded-xl
                           focus:outline-none focus:border-purple-400
                           transition-all duration-300 backdrop-blur-sm"
                placeholder="Type here"
                autoFocus
              />

              <div
                className={`text-xl md:text-2xl font-bold transition-all duration-300 
                              ${
                                lastResult === "CORRECT!"
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
              >
                {lastResult}
              </div>
              <button
                onClick={pauseGame}
                className="px-8 py-4 text-2xl rounded-xl bg-red-500 hover:bg-red-600 transition-colors"
              >
                Stop Game
              </button>
            </>
          )}
        </div>
      )}

      {/* Bottom Instructions */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 text-center 
                      bg-black/30 backdrop-blur-sm text-white/70 md:text-base font-retro"
      >
        <p className="border p-2 rounded-lg border-white/10 bg-white/5 text-sm font-bold">
          {isPlaying ? (
            <>
              Type the numbers before they change! | {timeLimit / 1000} second
              per number
            </>
          ) : (
            <>
              Click Start Game to begin or adjust settings using the ⚙️ button
            </>
          )}
        </p>
        <p className="text-xs p-2">
          Developed and Designed by Mohammad Inteshar Alam with ❤️ © 2024
        </p>
      </div>
    </div>
  );
};

export default NumberTypingMode;
