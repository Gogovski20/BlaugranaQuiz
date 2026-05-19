package com.vladimir.blaugranaquiz.controllers;

import com.vladimir.blaugranaquiz.dtos.StartQuizRequest;
import com.vladimir.blaugranaquiz.dtos.StartQuizResponse;
import com.vladimir.blaugranaquiz.services.QuizService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/start")
    public StartQuizResponse startQuiz(@Valid @RequestBody StartQuizRequest request) {
        return quizService.startQuiz(request);
    }
}
