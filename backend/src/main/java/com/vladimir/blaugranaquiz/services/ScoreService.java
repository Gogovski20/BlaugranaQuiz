package com.vladimir.blaugranaquiz.services;

import com.vladimir.blaugranaquiz.dtos.LeaderboardEntryResponse;
import com.vladimir.blaugranaquiz.dtos.ScoreResponse;
import com.vladimir.blaugranaquiz.entities.AppUser;
import com.vladimir.blaugranaquiz.entities.Category;
import com.vladimir.blaugranaquiz.entities.Difficulty;
import com.vladimir.blaugranaquiz.entities.Score;
import com.vladimir.blaugranaquiz.exceptions.ResourceNotFoundException;
import com.vladimir.blaugranaquiz.repositories.AppUserRepository;
import com.vladimir.blaugranaquiz.repositories.CategoryRepository;
import com.vladimir.blaugranaquiz.repositories.ScoreRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;
    private final AppUserRepository appUserRepository;
    private final CategoryRepository categoryRepository;

    public ScoreService(ScoreRepository scoreRepository,
                        AppUserRepository appUserRepository,
                        CategoryRepository categoryRepository) {
        this.scoreRepository = scoreRepository;
        this.appUserRepository = appUserRepository;
        this.categoryRepository = categoryRepository;
    }

    public void saveScore(String userEmail,
                          Long categoryId,
                          Difficulty difficulty,
                          int scoreValue,
                          int totalQuestions,
                          double percentage) {

        AppUser user = appUserRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found."));

        Score score = new Score(
                user,
                category,
                difficulty,
                scoreValue,
                totalQuestions,
                percentage
        );

        scoreRepository.save(score);
    }

    public List<ScoreResponse> getMyScores(String userEmail) {
        AppUser user = appUserRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        return scoreRepository.findByUserIdOrderByCompletedAtDesc(user.getId())
                .stream()
                .map(this::mapToScoreResponse)
                .toList();
    }

    public List<LeaderboardEntryResponse> getLeaderboard(Long categoryId, Difficulty difficulty) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category not found.");
        }

        List<Score> scores = scoreRepository
                .findTop10ByCategoryIdAndDifficultyOrderByPercentageDescScoreDescCompletedAtAsc(
                        categoryId,
                        difficulty
                );

        List<LeaderboardEntryResponse> leaderboard = new ArrayList<>();

        for (int i = 0; i < scores.size(); i++) {
            Score score = scores.get(i);

            leaderboard.add(new LeaderboardEntryResponse(
                    i + 1,
                    score.getUser().getUsername(),
                    score.getCategory().getName(),
                    score.getDifficulty().name(),
                    score.getScore(),
                    score.getTotalQuestions(),
                    score.getPercentage(),
                    score.getCompletedAt()
            ));
        }

        return leaderboard;
    }

    private ScoreResponse mapToScoreResponse(Score score) {
        return new ScoreResponse(
                score.getId(),
                score.getUser().getUsername(),
                score.getCategory().getId(),
                score.getCategory().getName(),
                score.getDifficulty().name(),
                score.getScore(),
                score.getTotalQuestions(),
                score.getPercentage(),
                score.getCompletedAt()
        );
    }
}