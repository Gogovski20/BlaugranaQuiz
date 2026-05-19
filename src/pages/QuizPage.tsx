import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { submitQuiz } from "../api/quizApi";
import type {
  QuizQuestionResponse,
  SubmitAnswerRequest,
} from "../types/quiz";
import axios from "axios";

interface QuizPageLocationState {
  questions?: QuizQuestionResponse[];
}

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as QuizPageLocationState | null;
  const questions = state?.questions || [];

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  function handleSelectAnswer(questionId: number, answerOptionId: number) {
    setSelectedAnswers((previous) => ({
      ...previous,
      [questionId]: answerOptionId,
    }));
  }

  async function handleSubmitQuiz() {
    if (questions.length === 0) {
      setError("No quiz questions found. Please start a new quiz.");
      return;
    }

    if (Object.keys(selectedAnswers).length !== questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    const answers: SubmitAnswerRequest[] = questions.map((question) => ({
      questionId: question.id,
      selectedAnswerOptionId: selectedAnswers[question.id],
    }));

    try {
      setError("");
      setSubmitting(true);

      const response = await submitQuiz({ answers });

      navigate("/results", {
        state: {
          result: response,
        },
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          "Failed to submit quiz. Please try again.";

        setError(message);
      } else {
        setError("Failed to submit quiz. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (questions.length === 0) {
    return (
      <main className="page">
        <section className="card">
          <h1>No Quiz Found</h1>
          <p>You need to start a quiz first.</p>
          <Link to="/quiz/setup" className="button">
            Start New Quiz
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page page-wide">
      <section className="card quiz-card">
        <h1>Quiz</h1>
        <p>
          Answer all questions, then submit your quiz to see your result.
        </p>

        {error && <p className="error-message">{error}</p>}

        <div className="question-list">
          {questions.map((question, index) => (
            <article key={question.id} className="question-card">
              <h2>
                {index + 1}. {question.text}
              </h2>

              <div className="answer-list">
                {question.answerOptions.map((option) => (
                  <label key={option.id} className="answer-option">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      checked={selectedAnswers[question.id] === option.id}
                      onChange={() =>
                        handleSelectAnswer(question.id, option.id)
                      }
                    />
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>
            </article>
          ))}
        </div>

        <button
          className="button"
          onClick={handleSubmitQuiz}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </section>
    </main>
  );
}