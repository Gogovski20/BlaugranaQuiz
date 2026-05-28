import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  message: string;
  buttonText: string;
  buttonTo: string;
}

export default function EmptyState({
  title,
  message,
  buttonText,
  buttonTo,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to={buttonTo} className="button">
        {buttonText}
      </Link>
    </div>
  );
}