import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizSetupPage from "./pages/QuizSetupPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyScoresPage from "./pages/MyScoresPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz/setup" element={<QuizSetupPage />} />
      <Route path="/quiz/play" element={<QuizPage />} />
      <Route path="/results" element={<ResultsPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/my-scores"
        element={
          <ProtectedRoute>
            <MyScoresPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}