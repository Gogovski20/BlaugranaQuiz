import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizSetupPage from "./pages/QuizSetupPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz/setup" element={<QuizSetupPage />} />
      <Route path="/quiz/play" element={<QuizPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  );
}