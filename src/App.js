import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WordTypingMode from "./components/WordTypingMode";
import NumberTypingMode from "./components/NumberTypingMode";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/word-typing" element={<WordTypingMode />} />
        <Route path="/number-typing" element={<NumberTypingMode />} />
      </Routes>
    </Router>
  );
}

export default App;
