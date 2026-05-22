import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  wide?: boolean;
}

export default function Card({ children, wide = false }: CardProps) {
  return (
    <section className={`card ${wide ? "quiz-card" : ""}`}>
      {children}
    </section>
  );
}