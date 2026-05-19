package com.vladimir.blaugranaquiz.dtos;

import lombok.Getter;

@Getter
public class AnswerOptionResponse {

    private Long id;
    private String text;
    private boolean correct;

    public AnswerOptionResponse(Long id, String text, boolean correct) {
        this.id = id;
        this.text = text;
        this.correct = correct;
    }
}
