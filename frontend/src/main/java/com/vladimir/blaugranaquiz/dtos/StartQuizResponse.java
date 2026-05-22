package com.vladimir.blaugranaquiz.dtos;

import lombok.Getter;

import java.util.List;

@Getter
public class StartQuizResponse {

    private List<QuizQuestionResponse> questions;

    public StartQuizResponse(List<QuizQuestionResponse> questions) {
        this.questions = questions;
    }
}
