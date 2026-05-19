package com.vladimir.blaugranaquiz.services;

import com.vladimir.blaugranaquiz.dtos.QuizAnswerOptionResponse;
import com.vladimir.blaugranaquiz.dtos.QuizQuestionResponse;
import com.vladimir.blaugranaquiz.dtos.StartQuizRequest;
import com.vladimir.blaugranaquiz.dtos.StartQuizResponse;
import com.vladimir.blaugranaquiz.entities.Question;
import com.vladimir.blaugranaquiz.exceptions.ResourceNotFoundException;
import com.vladimir.blaugranaquiz.repositories.CategoryRepository;
import com.vladimir.blaugranaquiz.repositories.QuestionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class QuizService {

    private final QuestionRepository questionRepository;
    private final CategoryRepository categoryRepository;

    public QuizService(QuestionRepository questionRepository, CategoryRepository categoryRepository) {
        this.questionRepository = questionRepository;
        this.categoryRepository = categoryRepository;
    }

    public StartQuizResponse startQuiz(StartQuizRequest request) {
        if (!categoryRepository.existsById(request.getCategoryId())) {
            throw new ResourceNotFoundException("Category not found.");
        }

        List<Question> questions = new ArrayList<>(questionRepository.findByCategoryIdAndDifficulty(
                request.getCategoryId(),
                request.getDifficulty()
        ));

        if (questions.isEmpty()) {
            throw new ResourceNotFoundException("No questions found for this category and difficulty.");
        }

        if (questions.size() < request.getNumberOfQuestions()) {
            throw new IllegalArgumentException("Not enough questions available for the requested quiz.");
        }

        Collections.shuffle(questions);

        List<QuizQuestionResponse> selectedQuestions = questions.stream()
                .limit(request.getNumberOfQuestions())
                .map(this::mapToQuizQuestionResponse)
                .toList();

        return new StartQuizResponse(selectedQuestions);
    }

    private QuizQuestionResponse mapToQuizQuestionResponse(Question question) {
        List<QuizAnswerOptionResponse> answerOptions = question.getAnswerOptions()
                .stream()
                .map(option -> new QuizAnswerOptionResponse(
                        option.getId(),
                        option.getText()
                ))
                .collect(Collectors.toList());

        Collections.shuffle(answerOptions);

        return new QuizQuestionResponse(
                question.getId(),
                question.getText(),
                question.getDifficulty(),
                answerOptions
        );
    }
}
