package com.vladimir.blaugranaquiz.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "scores")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many scores belong to one user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    // Many scores belong to one category
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Difficulty difficulty;

    @Column(nullable = false)
    private int score;

    @Column(nullable = false)
    private int totalQuestions;

    @Column(nullable = false)
    private double percentage;

    @Column(nullable = false)
    private LocalDateTime completedAt = LocalDateTime.now();

    public Score() {
    }

    public Score(AppUser user,
                 Category category,
                 Difficulty difficulty,
                 int score,
                 int totalQuestions,
                 double percentage) {
        this.user = user;
        this.category = category;
        this.difficulty = difficulty;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.percentage = percentage;
        this.completedAt = LocalDateTime.now();
    }
}