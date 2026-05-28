package com.vladimir.blaugranaquiz.controllers;

import com.vladimir.blaugranaquiz.dtos.LeaderboardEntryResponse;
import com.vladimir.blaugranaquiz.dtos.ScoreResponse;
import com.vladimir.blaugranaquiz.entities.Difficulty;
import com.vladimir.blaugranaquiz.services.ScoreService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    private final ScoreService scoreService;

    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @GetMapping("/me")
    public List<ScoreResponse> getMyScores(Authentication authentication) {
        return scoreService.getMyScores(authentication.getName());
    }

    @GetMapping("/leaderboard")
    public List<LeaderboardEntryResponse> getLeaderboard(@RequestParam Long categoryId,
                                                         @RequestParam Difficulty difficulty) {
        return scoreService.getLeaderboard(categoryId, difficulty);
    }
}