import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, startQuiz } from "../api/quizApi";
import type { CategoryResponse, Difficulty } from "../types/quiz";
import { clearQuizStorage, saveQuizQuestions } from "../utils/quizStorage";
import { getErrorMessage } from "../utils/errorUtils";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import ErrorMessage from "../components/ErrorMessage";
import LoadingState from "../components/LoadingState";

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
      } catch (err) {
        setError(getErrorMessage(err, "Failed to load categories. Make sure the backend is running."));
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

      clearQuizStorage();
      saveQuizQuestions(response.questions);

      navigate("/quiz/play", {
        state: {
          questions: response.questions,
        },
      });
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Failed to start quiz. Please try different options."
        )
      );
    } finally {
      setStartingQuiz(false);
    }
  }

  if (loadingCategories) {
    return (
      <LoadingState
        title="Loading quiz setup..."
        message="Please wait while categories are loaded."
      />
    );
  }

  return (
    <PageLayout>
      <Card>
        <h1>Set Up Your Quiz</h1>
        <p>Choose a category, difficulty, and number of questions.</p>

        <ErrorMessage message={error} />

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
          <p className="helper-text">
            If there are not enough questions for your selection, the backend will show a clear message.
          </p>
        </div>

        <button
          className="button"
          onClick={handleStartQuiz}
          disabled={startingQuiz || categories.length === 0}
        >
          {startingQuiz ? "Starting..." : "Start Quiz"}
        </button>
      </Card>
    </PageLayout>
  );
}