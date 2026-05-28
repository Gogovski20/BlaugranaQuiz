import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PageLayoutProps {
  children: React.ReactNode;
  wide?: boolean;
}

export default function PageLayout({ children, wide = false }: PageLayoutProps) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="page">
      <header className="app-header">
        <Link to="/" className="app-logo">
          BlaugranaQuiz
        </Link>

        <nav className="app-nav">
          <Link to="/">Home</Link>
          <Link to="/quiz/setup">Start Quiz</Link>

          {isAuthenticated && <Link to="/my-scores">My Scores</Link>}

          {!isAuthenticated && (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {isAuthenticated && (
            <button type="button" className="nav-button" onClick={logout}>
              Logout
            </button>
          )}
        </nav>
      </header>

      {isAuthenticated && user && (
        <p className="logged-in-text">Logged in as {user.username}</p>
      )}

      <main className={wide ? "page-content page-content-wide" : "page-content"}>
        {children}
      </main>
    </div>
  );
}