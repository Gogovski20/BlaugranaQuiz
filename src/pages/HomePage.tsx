import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="page">
      <section className="card">
        <h1>BlaugranaQuiz</h1>
        <p>
          Test your FC Barcelona knowledge across players, history, trophies,
          managers, and more.
        </p>

        <Link to="/quiz/setup" className="button">
          Start Quiz
        </Link>
      </section>
    </main>
  );
}