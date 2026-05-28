package com.vladimir.blaugranaquiz.repositories;

import com.vladimir.blaugranaquiz.entities.Difficulty;
import com.vladimir.blaugranaquiz.entities.Score;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {

    @EntityGraph(attributePaths = {"user", "category"})
    List<Score> findByUserIdOrderByCompletedAtDesc(Long userId);

    @EntityGraph(attributePaths = {"user", "category"})
    List<Score> findTop10ByCategoryIdAndDifficultyOrderByPercentageDescScoreDescCompletedAtAsc(
            Long categoryId,
            Difficulty difficulty
    );
}