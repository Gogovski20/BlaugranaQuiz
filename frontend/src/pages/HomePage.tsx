import { Link } from "react-router-dom";
import Card from "../components/Card";
import PageLayout from "../components/PageLayout";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <PageLayout>
      <Card>
        <p className="eyebrow">FC Barcelona Trivia</p>
        <h1>BlaugranaQuiz</h1>

        {isAuthenticated && user ? (
          <p className="hero-text">Welcome back, {user.username}.</p>
        ) : (
          <p className="hero-text">
            Test your FC Barcelona knowledge with category-based football trivia,
            instant scoring, and answer explanations.
          </p>
        )}

        <ul className="feature-list">
          <li>Choose category and difficulty</li>
          <li>Answer multiple-choice quiz questions</li>
          <li>Review correct answers and explanations</li>
          <li>Logged-in users can save scores</li>
        </ul>

        <div className="button-row">
          <Link to="/quiz/setup" className="button">
            Start Quiz
          </Link>

          {isAuthenticated ? (
            <Link to="/my-scores" className="button secondary-button">
              View My Scores
            </Link>
          ) : (
            <Link to="/login" className="button secondary-button">
              Log in to save scores
            </Link>
          )}
        </div>
      </Card>
    </PageLayout>
  );
}