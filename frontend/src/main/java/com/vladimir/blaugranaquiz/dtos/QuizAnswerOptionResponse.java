package com.vladimir.blaugranaquiz.dtos;

import lombok.Getter;

@Getter
public class QuizAnswerOptionResponse {

    private Long id;
    private String text;

    public QuizAnswerOptionResponse(Long id, String text) {
        this.id = id;
        this.text = text;
    }
}
