package com.vladimir.blaugranaquiz.dtos;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class LeaderboardEntryResponse {

    private int rank;
    private String username;
    private String categoryName;
    private String difficulty;
    private int score;
    private int totalQuestions;
    private double percentage;
    private LocalDateTime completedAt;

    public LeaderboardEntryResponse(int rank,
                                    String username,
                                    String categoryName,
                                    String difficulty,
                                    int score,
                                    int totalQuestions,
                                    double percentage,
                                    LocalDateTime completedAt) {
        this.rank = rank;
        this.username = username;
        this.categoryName = categoryName;
        this.difficulty = difficulty;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.percentage = percentage;
        this.completedAt = completedAt;
    }
}