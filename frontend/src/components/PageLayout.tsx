import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  wide?: boolean;
}

export default function PageLayout({ children, wide = false }: PageLayoutProps) {
  return (
    <main className={`page ${wide ? "page-wide" : ""}`}>
      {children}
    </main>
  );
}