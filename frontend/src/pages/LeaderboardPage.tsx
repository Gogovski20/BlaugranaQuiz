import { useEffect, useState } from "react";
import { getCategories } from "../api/quizApi";
import { getLeaderboard } from "../api/scoreApi";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import LoadingState from "../components/LoadingState";
import PageLayout from "../components/PageLayout";
import type { CategoryResponse, Difficulty } from "../types/quiz";
import type { LeaderboardEntryResponse } from "../types/score";
import { getErrorMessage } from "../utils/errorUtils";

const difficulties: Difficulty[] = ["EASY", "MEDIUM", "HARD", "EXPERT"];

export default function LeaderboardPage() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");
  const [difficulty, setDifficulty] = useState<Difficulty>("EASY");

  const [entries, setEntries] = useState<LeaderboardEntryResponse[]>([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [error, setError] = useState("");

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
      } catch (error) {
        setError(
          getErrorMessage(
            error,
            "Failed to load categories. Make sure the backend is running."
          )
        );
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadLeaderboard() {
      if (selectedCategoryId === "") {
        return;
      }

      try {
        setError("");
        setLoadingLeaderboard(true);

        const data = await getLeaderboard(selectedCategoryId, difficulty);
        setEntries(data);
      } catch (error) {
        setError(getErrorMessage(error, "Failed to load leaderboard."));
      } finally {
        setLoadingLeaderboard(false);
      }
    }

    loadLeaderboard();
  }, [selectedCategoryId, difficulty]);

  if (loadingCategories) {
    return (
      <PageLayout>
        <Card>
          <LoadingState
            title="Loading leaderboard..."
            message="Please wait while categories are loaded."
          />
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout wide>
      <Card wide>
        <p className="eyebrow">Top scores</p>
        <h1>Leaderboard</h1>
        <p>
          Compare scores fairly by category and difficulty. EASY and EXPERT
          results are separated.
        </p>

        <ErrorMessage message={error} />

        <div className="leaderboard-filters">
          <div className="form-group">
            <label htmlFor="leaderboard-category">Category</label>
            <select
              id="leaderboard-category"
              value={selectedCategoryId}
              onChange={(event) =>
                setSelectedCategoryId(Number(event.target.value))
              }
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="leaderboard-difficulty">Difficulty</label>
            <select
              id="leaderboard-difficulty"
              value={difficulty}
              onChange={(event) =>
                setDifficulty(event.target.value as Difficulty)
              }
            >
              {difficulties.map((difficultyOption) => (
                <option key={difficultyOption} value={difficultyOption}>
                  {difficultyOption}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loadingLeaderboard && (
          <LoadingState message="Loading leaderboard results..." />
        )}

        {!loadingLeaderboard && !error && entries.length === 0 && (
          <EmptyState
            title="No Scores Yet"
            message="No one has completed this category and difficulty yet."
            buttonText="Play Quiz"
            buttonTo="/quiz/setup"
          />
        )}

        {!loadingLeaderboard && !error && entries.length > 0 && (
          <div className="leaderboard-table-wrapper">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Category</th>
                  <th>Difficulty</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Completed</th>
                </tr>
              </thead>

              <tbody>
                {entries.map((entry) => (
                  <tr key={`${entry.rank}-${entry.username}-${entry.completedAt}`}>
                    <td>#{entry.rank}</td>
                    <td>{entry.username}</td>
                    <td>{entry.categoryName}</td>
                    <td>{entry.difficulty}</td>
                    <td>
                      {entry.score}/{entry.totalQuestions}
                    </td>
                    <td>{entry.percentage}%</td>
                    <td>{new Date(entry.completedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </PageLayout>
  );
}