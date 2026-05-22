import type {
  QuizQuestionResponse,
  SubmitQuizResponse,
} from "../types/quiz";

const QUIZ_QUESTIONS_KEY = "blaugranaquiz_questions";
const QUIZ_RESULT_KEY = "blaugranaquiz_result";
const SELECTED_ANSWERS_KEY = "blaugranaquiz_selected_answers";

export function saveQuizQuestions(questions: QuizQuestionResponse[]) {
  localStorage.setItem(QUIZ_QUESTIONS_KEY, JSON.stringify(questions));
}

export function getSavedQuizQuestions(): QuizQuestionResponse[] {
  const savedQuestions = localStorage.getItem(QUIZ_QUESTIONS_KEY);

  if (!savedQuestions) {
    return [];
  }

  try {
    return JSON.parse(savedQuestions) as QuizQuestionResponse[];
  } catch {
    localStorage.removeItem(QUIZ_QUESTIONS_KEY);
    return [];
  }
}

export function saveQuizResult(result: SubmitQuizResponse) {
  localStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(result));
}

export function getSavedQuizResult(): SubmitQuizResponse | null {
  const savedResult = localStorage.getItem(QUIZ_RESULT_KEY);

  if (!savedResult) {
    return null;
  }

  try {
    return JSON.parse(savedResult) as SubmitQuizResponse;
  } catch {
    localStorage.removeItem(QUIZ_RESULT_KEY);
    return null;
  }
}

export function saveSelectedAnswers(selectedAnswers: Record<number, number>) {
  localStorage.setItem(
    SELECTED_ANSWERS_KEY,
    JSON.stringify(selectedAnswers)
  );
}

export function getSavedSelectedAnswers(): Record<number, number> {
  const savedAnswers = localStorage.getItem(SELECTED_ANSWERS_KEY);

  if (!savedAnswers) {
    return {};
  }

  try {
    return JSON.parse(savedAnswers) as Record<number, number>;
  } catch {
    localStorage.removeItem(SELECTED_ANSWERS_KEY);
    return {};
  }
}

export function clearQuizStorage() {
  localStorage.removeItem(QUIZ_QUESTIONS_KEY);
  localStorage.removeItem(QUIZ_RESULT_KEY);
  localStorage.removeItem(SELECTED_ANSWERS_KEY);
}