import { Link, useLocation } from "react-router-dom";
import type { SubmitQuizResponse } from "../types/quiz";

interface ResultsPageLocationState {
  result?: SubmitQuizResponse;
}

export default function ResultsPage() {
  const location = useLocation();

  const state = location.state as ResultsPageLocationState | null;
  const result = state?.result;

  if (!result) {
    return (
      <main className="page">
        <section className="card">
          <h1>No Results Found</h1>
          <p>You need to complete a quiz first.</p>
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
        <h1>Quiz Results</h1>

        <div className="score-box">
          <p className="score-main">
            Score: {result.score} / {result.totalQuestions}
          </p>
          <p className="score-percentage">{result.percentage}%</p>
        </div>

        <div className="question-list">
          {result.results.map((answerResult, index) => (
            <article
              key={answerResult.questionId}
              className={`result-card ${
                answerResult.correct ? "result-correct" : "result-wrong"
              }`}
            >
              <h2>
                {index + 1}. {answerResult.questionText}
              </h2>

              <p>
                <strong>Your answer:</strong> {answerResult.selectedAnswer}
              </p>

              <p>
                <strong>Correct answer:</strong> {answerResult.correctAnswer}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {answerResult.correct ? "Correct" : "Wrong"}
              </p>

              {answerResult.explanation && (
                <p>
                  <strong>Explanation:</strong> {answerResult.explanation}
                </p>
              )}
            </article>
          ))}
        </div>

        <Link to="/quiz/setup" className="button">
          Play Again
        </Link>
      </section>
    </main>
  );
}