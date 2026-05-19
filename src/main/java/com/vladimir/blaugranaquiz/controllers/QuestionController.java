package com.vladimir.blaugranaquiz.controllers;

import com.vladimir.blaugranaquiz.dtos.CreateQuestionRequest;
import com.vladimir.blaugranaquiz.dtos.QuestionResponse;
import com.vladimir.blaugranaquiz.services.QuestionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public List<QuestionResponse> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/{id}")
    public QuestionResponse getQuestionById(@PathVariable Long id) {
        return questionService.getQuestionById(id);
    }

    @GetMapping("/category/{categoryId}")
    public List<QuestionResponse> getQuestionsByCategory(@PathVariable Long categoryId) {
        return questionService.getQuestionsByCategory(categoryId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public QuestionResponse createQuestion(@Valid @RequestBody CreateQuestionRequest request) {
        return questionService.createQuestion(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
    }
}
