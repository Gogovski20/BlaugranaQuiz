import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, startQuiz } from "../api/quizApi";
import type { CategoryResponse, Difficulty } from "../types/quiz";
import axios from "axios";

const difficulties: Difficulty[] = ["EASY", "MEDIUM", "HARD", "EXPERT"];

export default function QuizSetupPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
  const [difficulty, setDifficulty] = useState<Difficulty>("EASY");
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(3);

  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [startingQuiz, setStartingQuiz] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadCategories() {
      try {
        setError("");
        setLoadingCategories(true);

        const data = await getCategories();
        setCategories(data);

        if (data.length > 0) {
          setSelectedCategoryId(data[0].id);
        }
      } catch {
        setError("Failed to load categories. Make sure the backend is running.");
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  async function handleStartQuiz() {
    if (selectedCategoryId === "") {
      setError("Please select a category.");
      return;
    }

    try {
      setError("");
      setStartingQuiz(true);

      const response = await startQuiz({
        categoryId: selectedCategoryId,
        difficulty,
        numberOfQuestions,
      });

      navigate("/quiz/play", {
        state: {
          questions: response.questions,
        },
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          "Failed to start quiz. Please try different options.";

        setError(message);
      } else {
        setError("Failed to start quiz. Please try again.");
      }
    } finally {
      setStartingQuiz(false);
    }
  }

  if (loadingCategories) {
    return (
      <main className="page">
        <section className="card">
          <h1>Loading quiz setup...</h1>
          <p>Please wait while categories are loaded.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="card">
        <h1>Set Up Your Quiz</h1>
        <p>Choose a category, difficulty, and number of questions.</p>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={selectedCategoryId}
            onChange={(event) => setSelectedCategoryId(Number(event.target.value))}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value as Difficulty)}
          >
            {difficulties.map((difficultyOption) => (
              <option key={difficultyOption} value={difficultyOption}>
                {difficultyOption}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="numberOfQuestions">Number of questions</label>
          <select
            id="numberOfQuestions"
            value={numberOfQuestions}
            onChange={(event) => setNumberOfQuestions(Number(event.target.value))}
          >
            <option value={1}>1</option>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>

        <button
          className="button"
          onClick={handleStartQuiz}
          disabled={startingQuiz || categories.length === 0}
        >
          {startingQuiz ? "Starting..." : "Start Quiz"}
        </button>
      </section>
    </main>
  );
}