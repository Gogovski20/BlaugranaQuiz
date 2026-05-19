package com.vladimir.blaugranaquiz.dtos;

import lombok.Getter;

import java.util.List;

@Getter
public class SubmitQuizResponse {

    private int score;
    private int totalQuestions;
    private double percentage;
    private List<QuizAnswerResultResponse> results;

    public SubmitQuizResponse(int score, int totalQuestions, double percentage, List<QuizAnswerResultResponse> results) {
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.percentage = percentage;
        this.results = results;
    }
}
