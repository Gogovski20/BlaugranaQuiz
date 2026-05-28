import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import PageLayout from "../components/PageLayout";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../utils/errorUtils";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const response = await register({
        username,
        email,
        password,
      });

      navigate("/login", {
        state: {
          message: response.message,
        },
      });
    } catch (error) {
      setError(getErrorMessage(error, "Error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageLayout>
      <Card>
        <p className="eyebrow">Create account</p>
        <h1>Register</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="form">
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>

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
              minLength={6}
            />
          </label>

          <button type="submit" className="button" disabled={submitting}>
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </Card>
    </PageLayout>
  );
}