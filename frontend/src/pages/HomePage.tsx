import { Link } from "react-router-dom";
import Card from "../components/Card";
import PageLayout from "../components/PageLayout";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <PageLayout>
      <Card>
        <p className="eyebrow">FC Barcelona Trivia</p>
        <h1>BlaugranaQuiz</h1>

        {isAuthenticated && user ? (
          <p className="hero-text">Logged in as {user.username}</p>
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

          {!isAuthenticated && (
            <>
              <Link to="/login" className="button secondary-button">
                Log in
              </Link>

              <Link to="/register" className="button secondary-button">
                Register
              </Link>
            </>
          )}

          {isAuthenticated && (
            <button type="button" className="button secondary-button" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </Card>
    </PageLayout>
  );
}