package com.vladimir.blaugranaquiz.dtos;

import com.vladimir.blaugranaquiz.entities.Difficulty;
import lombok.Getter;

import java.util.List;

@Getter
public class QuizQuestionResponse {

    private Long id;
    private String text;
    private Difficulty difficulty;
    private List<QuizAnswerOptionResponse> answerOptions;

    public QuizQuestionResponse(Long id, String text, Difficulty difficulty, List<QuizAnswerOptionResponse> answerOptions) {
        this.id = id;
        this.text = text;
        this.difficulty = difficulty;
        this.answerOptions = answerOptions;
    }
}
