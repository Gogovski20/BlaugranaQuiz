import Card from "./Card";
import PageLayout from "./PageLayout";

interface LoadingStateProps {
  title?: string;
  message?: string;
}

export default function LoadingState({
  title = "Loading...",
  message = "Please wait.",
}: LoadingStateProps) {
  return (
    <PageLayout>
      <Card>
        <h1>{title}</h1>
        <p>{message}</p>
      </Card>
    </PageLayout>
  );
}