package com.vladimir.blaugranaquiz.dtos;

import com.vladimir.blaugranaquiz.entities.Difficulty;
import lombok.Getter;

import java.util.List;

@Getter
public class QuestionResponse {

    private Long id;
    private String text;
    private Difficulty difficulty;
    private String explanation;
    private Long categoryId;
    private String categoryName;
    private List<AnswerOptionResponse> answerOptions;

    public QuestionResponse(Long id, String text, Difficulty difficulty, String explanation, Long categoryId, String categoryName, List<AnswerOptionResponse> answerOptions) {
        this.id = id;
        this.text = text;
        this.difficulty = difficulty;
        this.explanation = explanation;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.answerOptions = answerOptions;
    }
}
