import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitQuiz } from "../api/quizApi";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import PageLayout from "../components/PageLayout";
import type {
  QuizQuestionResponse,
  SubmitAnswerRequest,
} from "../types/quiz";
import { getErrorMessage } from "../utils/errorUtils";
import {
  getSavedQuizQuestions,
  getSavedSelectedAnswers,
  saveQuizResult,
  saveSelectedAnswers,
} from "../utils/quizStorage";

interface QuizPageLocationState {
  questions?: QuizQuestionResponse[];
}

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as QuizPageLocationState | null;
  const questions = state?.questions || getSavedQuizQuestions();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    () => getSavedSelectedAnswers()
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const answeredCount = Object.keys(selectedAnswers).length;
  const allQuestionsAnswered = answeredCount === questions.length;

  function handleSelectAnswer(questionId: number, answerOptionId: number) {
    setSelectedAnswers((previous) => {
      const updatedAnswers = {
        ...previous,
        [questionId]: answerOptionId,
      };

      saveSelectedAnswers(updatedAnswers);

      return updatedAnswers;
    });
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

      saveQuizResult(response);

      navigate("/results", {
        state: {
          result: response,
        },
      });
    } catch (err) {
      setError(getErrorMessage(err, "Failed to submit quiz. Please try again."));
    } finally {
      setSubmitting(false);
    }
  }

  if (questions.length === 0) {
    return (
      <PageLayout>
        <Card>
          <EmptyState
            title="No Quiz Found"
            message="You need to start a quiz first."
            buttonText="Start New Quiz"
            buttonTo="/quiz/setup"
          />
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout wide>
      <Card wide>
        <h1>Quiz</h1>
        <p>Answer all questions, then submit your quiz to see your result.</p>

        <ErrorMessage message={error} />

        <p className="quiz-progress">
          Answered {answeredCount} / {questions.length}
        </p>

        <div className="question-list">
          {questions.map((question, index) => (
            <article key={question.id} className="question-card">
              <h2>
                {index + 1}. {question.text}
              </h2>

              <div className="answer-list">
                {question.answerOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`answer-option ${
                      selectedAnswers[question.id] === option.id
                        ? "answer-option-selected"
                        : ""
                    }`}
                  >
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
          disabled={submitting || !allQuestionsAnswered}
        >
          {submitting
            ? "Submitting..."
            : allQuestionsAnswered
            ? "Submit Quiz"
            : "Answer all questions"}
        </button>
      </Card>
    </PageLayout>
  );
}