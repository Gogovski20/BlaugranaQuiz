import { Link } from "react-router-dom";
import Card from "./Card";
import PageLayout from "./PageLayout";

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
    <PageLayout>
      <Card>
        <h1>{title}</h1>
        <p>{message}</p>
        <Link to={buttonTo} className="button">
          {buttonText}
        </Link>
      </Card>
    </PageLayout>
  );
}