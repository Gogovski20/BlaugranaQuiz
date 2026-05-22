package com.vladimir.blaugranaquiz.dtos;

import lombok.Getter;

@Getter
public class QuizAnswerResultResponse {

    private Long questionId;
    private String questionText;
    private String selectedAnswer;
    private String correctAnswer;
    private boolean correct;
    private String explanation;

    public QuizAnswerResultResponse(Long questionId, String questionText, String selectedAnswer, String correctAnswer, boolean correct, String explanation) {
        this.questionId = questionId;
        this.questionText = questionText;
        this.selectedAnswer = selectedAnswer;
        this.correctAnswer = correctAnswer;
        this.correct = correct;
        this.explanation = explanation;
    }
}
