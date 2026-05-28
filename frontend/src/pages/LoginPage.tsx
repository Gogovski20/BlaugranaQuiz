import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import PageLayout from "../components/PageLayout";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../utils/errorUtils";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const successMessage = location.state?.message as string | undefined;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await login({
        email,
        password,
      });

      navigate("/quiz/setup");
    } catch (error) {
      setError(getErrorMessage(error, "Error."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageLayout>
      <Card>
        <p className="eyebrow">Welcome back</p>
        <h1>Log in</h1>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <button type="submit" className="button" disabled={submitting}>
            {submitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p>
          No account yet? <Link to="/register">Create one</Link>
        </p>
      </Card>
    </PageLayout>
  );
}