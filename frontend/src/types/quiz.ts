export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "EXPERT";

export interface CategoryResponse {
  id: number;
  name: string;
  description: string;
}

export interface QuizAnswerOptionResponse {
  id: number;
  text: string;
}

export interface QuizQuestionResponse {
  id: number;
  text: string;
  difficulty: Difficulty;
  answerOptions: QuizAnswerOptionResponse[];
}

export interface StartQuizRequest {
  categoryId: number;
  difficulty: Difficulty;
  numberOfQuestions: number;
}

export interface StartQuizResponse {
  questions: QuizQuestionResponse[];
}

export interface SubmitAnswerRequest {
  questionId: number;
  selectedAnswerOptionId: number;
}

export interface SubmitQuizRequest {
  answers: SubmitAnswerRequest[];
}

export interface QuizAnswerResultResponse {
  questionId: number;
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  correct: boolean;
  explanation: string;
}

export interface SubmitQuizResponse {
  score: number;
  totalQuestions: number;
  percentage: number;
  results: QuizAnswerResultResponse[];
}