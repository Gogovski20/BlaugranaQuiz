package com.vladimir.blaugranaquiz.dtos;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ScoreResponse {

    private Long id;
    private String username;
    private Long categoryId;
    private String categoryName;
    private String difficulty;
    private int score;
    private int totalQuestions;
    private double percentage;
    private LocalDateTime completedAt;

    public ScoreResponse(Long id,
                         String username,
                         Long categoryId,
                         String categoryName,
                         String difficulty,
                         int score,
                         int totalQuestions,
                         double percentage,
                         LocalDateTime completedAt) {
        this.id = id;
        this.username = username;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.difficulty = difficulty;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.percentage = percentage;
        this.completedAt = completedAt;
    }
}