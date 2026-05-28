import { apiClient } from "./apiClient";
import type {
  CategoryResponse,
  StartQuizRequest,
  StartQuizResponse,
  SubmitQuizRequest,
  SubmitQuizResponse,
} from "../types/quiz";

export async function getCategories(): Promise<CategoryResponse[]> {
  const response = await apiClient.get<CategoryResponse[]>("/categories");
  return response.data;
}

export async function startQuiz(
  request: StartQuizRequest
): Promise<StartQuizResponse> {
  const response = await apiClient.post<StartQuizResponse>(
    "/quizzes/start",
    request
  );

  return response.data;
}

export async function submitQuiz(
  request: SubmitQuizRequest
): Promise<SubmitQuizResponse> {
  const response = await apiClient.post<SubmitQuizResponse>(
    "/quizzes/submit",
    request
  );

  return response.data;
}