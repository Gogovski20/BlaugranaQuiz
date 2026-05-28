import { useEffect, useState } from "react";
import { getMyScores } from "../api/scoreApi";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import LoadingState from "../components/LoadingState";
import PageLayout from "../components/PageLayout";
import type { ScoreResponse } from "../types/score";
import { getErrorMessage } from "../utils/errorUtils";

export default function MyScoresPage() {
  const [scores, setScores] = useState<ScoreResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadScores() {
      try {
        setError("");
        const data = await getMyScores();
        setScores(data);
      } catch (error) {
        setError(getErrorMessage(error, "Failed to load your scores."));
      } finally {
        setLoading(false);
      }
    }

    loadScores();
  }, []);

  return (
    <PageLayout>
      <Card>
        <p className="eyebrow">Your quiz history</p>
        <h1>My Scores</h1>

        {loading && <LoadingState message="Loading your scores..." />}

        {!loading && error && <ErrorMessage message={error} />}

        {!loading && !error && scores.length === 0 && (
          <EmptyState
            title="No Scores Yet"
            message="You have not completed any quizzes while logged in yet."
            buttonText="Start Quiz"
            buttonTo="/quiz/setup"
          />
        )}

        {!loading && !error && scores.length > 0 && (
          <div className="score-list">
            {scores.map((score) => (
              <div key={score.id} className="score-card">
                <div>
                  <h2>{score.categoryName}</h2>
                  <p className="muted">{score.difficulty}</p>
                </div>

                <p>
                  Score:{" "}
                  <strong>
                    {score.score}/{score.totalQuestions}
                  </strong>
                </p>

                <p>
                  Percentage: <strong>{score.percentage}%</strong>
                </p>

                <p className="muted">
                  Completed: {new Date(score.completedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </PageLayout>
  );
}