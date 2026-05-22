import { Link } from "react-router-dom";
import Card from "../components/Card";
import PageLayout from "../components/PageLayout";

export default function HomePage() {
  return (
    <PageLayout>
      <Card>
        <p className="eyebrow">FC Barcelona Trivia</p>
        <h1>BlaugranaQuiz</h1>
        <p className="hero-text">
          Test your FC Barcelona knowledge with category-based football trivia,
          instant scoring, and answer explanations.
        </p>

        <ul className="feature-list">
          <li>Choose category and difficulty</li>
          <li>Answer multiple-choice quiz questions</li>
          <li>Review correct answers and explanations</li>
        </ul>

        <Link to="/quiz/setup" className="button">
          Start Quiz
        </Link>
      </Card>
    </PageLayout>
  );
}