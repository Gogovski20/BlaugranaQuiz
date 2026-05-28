export interface ScoreResponse {
  id: number;
  username: string;
  categoryId: number;
  categoryName: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

export interface LeaderboardEntryResponse {
  rank: number;
  username: string;
  categoryName: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}