import axios from "axios";
import type {
  CategoryResponse,
  StartQuizRequest,
  StartQuizResponse,
  SubmitQuizRequest,
  SubmitQuizResponse,
} from "../types/quiz";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCategories(): Promise<CategoryResponse[]> {
  const response = await axios.get<CategoryResponse[]>(
    `${API_BASE_URL}/categories`
  );

  return response.data;
}

export async function startQuiz(
  request: StartQuizRequest
): Promise<StartQuizResponse> {
  const response = await axios.post<StartQuizResponse>(
    `${API_BASE_URL}/quizzes/start`,
    request
  );

  return response.data;
}

export async function submitQuiz(
  request: SubmitQuizRequest
): Promise<SubmitQuizResponse> {
  const response = await axios.post<SubmitQuizResponse>(
    `${API_BASE_URL}/quizzes/submit`,
    request
  );

  return response.data;
}