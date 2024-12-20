import { generate } from "random-words"; // Use 'generate' instead of default import
import React, { useState, useRef, useEffect } from "react";
import CorrectGif from "../assets/correct.gif";
import WrongGif from "../assets/wrong.gif";
import { Link } from "react-router-dom";

const WordTypingMode = () => {
  const [displayWord, setDisplayWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [lastResult, setLastResult] = useState("");
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(() => {
    const savedStreak = localStorage.getItem("wordHighestStreak");
    return savedStreak ? parseInt(savedStreak) : 0;
  });
  const [timeLimit, setTimeLimit] = useState(2000);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [wordLength, setWordLength] = useState("any");
  const inputRef = useRef(null);
  const intervalRef = useRef(null);

  // Generate a random word with filtering options
  const generateRandomWord = () => {
    let options = {};
    switch (wordLength) {
      case "short":
        options = { min: 3, max: 4 };
        break;
      case "medium":
        options = { min: 5, max: 7 };
        break;
      case "long":
        options = { min: 8 };
        break;
      default:
        break;
    }

    const word = generate({ exactly: 1, maxLength: options.max || 1000 });
    return word[0];
  };

  const checkInput = (input) => {
    if (input.toLowerCase() === displayWord.toLowerCase()) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      setLastResult("CORRECT!");
      setStreak((prev) => {
        const newStreak = prev + 1;
        if (newStreak > highestStreak) {
          setHighestStreak(newStreak);
          localStorage.setItem("wordHighestStreak", newStreak);
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

    const newWord = generateRandomWord();
    setDisplayWord(newWord);
    setUserInput("");

    intervalRef.current = setInterval(() => {
      if (userInput !== "") {
        checkInput(userInput);
      } else {
        setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
        setLastResult("TIME UP!");
        setStreak(0);
      }

      const newWord = generateRandomWord();
      setDisplayWord(newWord);
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

    if (input.toLowerCase() === displayWord.toLowerCase()) {
      checkInput(input);
      const newWord = generateRandomWord();
      setDisplayWord(newWord);
      setUserInput("");

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
          const newWord = generateRandomWord();
          setDisplayWord(newWord);
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
            <span className="text-[8px] font-bold md:text-sm opacity-80">
              CORRECT
            </span>
            <span className="text-green-400 font-bold text-lg md:text-xl">
              {score.correct}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-bold md:text-sm opacity-80">
              WRONG
            </span>
            <span className="text-red-400 font-bold text-lg md:text-xl">
              {score.wrong}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-bold md:text-sm opacity-80">
              ACCURACY
            </span>
            <span className="text-blue-400 font-bold text-lg md:text-xl">
              {accuracy}%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-bold md:text-sm opacity-80">
              STREAK
            </span>
            <span className="text-yellow-400 font-bold text-lg md:text-xl">
              🔥 {streak}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-bold md:text-sm opacity-80">
              HIGHEST STREAK
            </span>
            <span className="text-yellow-500 font-bold text-lg md:text-xl">
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
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm opacity-80 mb-2">
                  Time Limit (seconds)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((time) => (
                    <button
                      key={time}
                      onClick={() => setTimeLimit(time * 1000)}
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
              <div>
                <label className="block text-sm opacity-80 mb-2">
                  Word Length
                </label>
                <div className="flex gap-2">
                  <select
                    className="bg-white/10 rounded px-4 py-2 w-full"
                    onChange={(e) => setWordLength(e.target.value)}
                    value={wordLength}
                  >
                    <option
                      style={{ backgroundColor: "rgb(51, 65, 84)" }}
                      value="any"
                    >
                      Any Length
                    </option>
                    <option
                      style={{ backgroundColor: "rgb(51, 65, 84)" }}
                      value="short"
                    >
                      Short (3-4 letters)
                    </option>
                    <option
                      style={{ backgroundColor: "rgb(51, 65, 84)" }}
                      value="medium"
                    >
                      Medium (5-7 letters)
                    </option>
                    <option
                      style={{ backgroundColor: "rgb(51, 65, 84)" }}
                      value="long"
                    >
                      Long (8+ letters)
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => {
                    startGame();
                    setShowSettings(false);
                  }}
                  className="flex-1 py-2 rounded bg-green-500 hover:bg-green-600 transition-colors"
                >
                  Start
                </button>
                <button
                  onClick={() => setShowSettings(false)}
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
        <div className="flex flex-col items-center gap-8 px-4 max-w-full">
          {!isPlaying ? (
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl md:text-4xl text-yellow-400 font-bold">
                WORD TYPING MODE
              </h1>
              <p className="text-sm md:text-xl text-center opacity-80">
                In this mode, type words as fast as you can to beat the timer!
              </p>
              <button
                onClick={startGame}
                className="w-52 px-8 py-4 text-2xl rounded-xl bg-purple-500 hover:bg-purple-600 transition-colors"
              >
                Start Game
              </button>
              <Link
                to="/number-typing"
                className="w-52 px-8 py-4 text-center font-bold text-sm rounded-xl bg-gray-600 hover:bg-gray-700 transition-colors"
              >
                Play with Numbers
              </Link>
            </div>
          ) : (
            <>
              <div className="relative">
                <div
                  className="text-4xl md:text-8xl font-bold font-mono tracking-wider 
                   bg-clip-text text-transparent bg-gradient-to-r 
                   from-blue-400 to-purple-400 animate-pulse whitespace-nowrap"
                >
                  {displayWord}
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
                className={`flex flex-col items-center text-xl md:text-2xl font-bold transition-all duration-300 
                  ${
                    lastResult === "CORRECT!"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
              >
                <img
                  className={`inline-block mr-2 ${
                    lastResult === "CORRECT!" ? "h-50 w-50 m-0" : "h-24 w-24"
                  }`}
                  src={lastResult === "CORRECT!" ? CorrectGif : WrongGif}
                  alt={lastResult}
                />
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
                    bg-black/30 backdrop-blur-sm text-white/70 md:text-base"
      >
        <p className="border p-2 rounded-lg border-white/10 bg-white/5 text-sm font-bold">
          {isPlaying ? (
            <>
              Type the words before they change! | {timeLimit / 1000} second per
              word
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

export default WordTypingMode;
