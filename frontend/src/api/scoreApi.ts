import { apiClient } from "./apiClient";
import type {
  LeaderboardEntryResponse,
  ScoreResponse,
} from "../types/score";
import type { Difficulty } from "../types/quiz";

export async function getMyScores(): Promise<ScoreResponse[]> {
  const response = await apiClient.get<ScoreResponse[]>("/scores/me");
  return response.data;
}

export async function getLeaderboard(
  categoryId: number,
  difficulty: Difficulty
): Promise<LeaderboardEntryResponse[]> {
  const response = await apiClient.get<LeaderboardEntryResponse[]>(
    "/scores/leaderboard",
    {
      params: {
        categoryId,
        difficulty,
      },
    }
  );

  return response.data;
}