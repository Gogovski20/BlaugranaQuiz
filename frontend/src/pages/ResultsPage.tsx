import { Link, useLocation } from "react-router-dom";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import PageLayout from "../components/PageLayout";
import type { SubmitQuizResponse } from "../types/quiz";
import { clearQuizStorage, getSavedQuizResult } from "../utils/quizStorage";

interface ResultsPageLocationState {
  result?: SubmitQuizResponse;
}

function getResultMessage(percentage: number): string {
  if (percentage >= 90) {
    return "Elite Barça knowledge.";
  }

  if (percentage >= 70) {
    return "Strong performance.";
  }

  if (percentage >= 50) {
    return "Good attempt.";
  }

  return "Keep learning and try again.";
}

export default function ResultsPage() {
  const location = useLocation();

  const state = location.state as ResultsPageLocationState | null;
  const result = state?.result || getSavedQuizResult();

  if (!result) {
    return (
      <PageLayout>
        <Card>
          <EmptyState
            title="No Results Found"
            message="You need to complete a quiz first."
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
        <h1>Quiz Results</h1>

        <div className="score-box">
          <p className="score-main">
            Score: {result.score} / {result.totalQuestions}
          </p>
          <p className="score-percentage">{result.percentage}%</p>
          <p className="result-message">{getResultMessage(result.percentage)}</p>
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

              <p className="result-status">
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

        <div className="actions">
          <Link to="/quiz/setup" className="button" onClick={clearQuizStorage}>
            Play Again
          </Link>

          <Link to="/" className="button secondary-button">
            Back Home
          </Link>
        </div>
      </Card>
    </PageLayout>
  );
}