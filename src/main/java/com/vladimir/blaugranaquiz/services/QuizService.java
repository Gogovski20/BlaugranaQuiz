package com.vladimir.blaugranaquiz.services;

import com.vladimir.blaugranaquiz.dtos.*;
import com.vladimir.blaugranaquiz.entities.AnswerOption;
import com.vladimir.blaugranaquiz.entities.Question;
import com.vladimir.blaugranaquiz.exceptions.ResourceNotFoundException;
import com.vladimir.blaugranaquiz.repositories.AnswerOptionRepository;
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
    private final AnswerOptionRepository answerOptionRepository;

    public QuizService(QuestionRepository questionRepository, CategoryRepository categoryRepository, AnswerOptionRepository answerOptionRepository) {
        this.questionRepository = questionRepository;
        this.categoryRepository = categoryRepository;
        this.answerOptionRepository = answerOptionRepository;
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

    public SubmitQuizResponse submitQuiz(SubmitQuizRequest request) {
        List<QuizAnswerResultResponse> results = request.getAnswers()
                .stream()
                .map(this::evaluateAnswer)
                .toList();

        int score = (int) results.stream()
                .filter(QuizAnswerResultResponse::isCorrect)
                .count();

        int totalQuestions = results.size();

        double percentage = ((double) score / totalQuestions) * 100;

        return new SubmitQuizResponse(
                score,
                totalQuestions,
                percentage,
                results
        );
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

    private QuizAnswerResultResponse evaluateAnswer(SubmitAnswerRequest answerRequest) {
        Question question = questionRepository.findById(answerRequest.getQuestionId())
                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));

        AnswerOption selectedAnswer = answerOptionRepository.findById(answerRequest.getSelectedAnswerOptionId())
                .orElseThrow(() -> new ResourceNotFoundException("Selected answer option not found."));

        if (!selectedAnswer.getQuestion().getId().equals(question.getId())) {
            throw new IllegalArgumentException("Selected answer option does not belong to the question.");
        }

        AnswerOption correctAnswer = question.getAnswerOptions()
                .stream()
                .filter(AnswerOption::isCorrect)
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Question has no correct answer."));

        boolean isCorrect = selectedAnswer.isCorrect();

        return new QuizAnswerResultResponse(
                question.getId(),
                question.getText(),
                selectedAnswer.getText(),
                correctAnswer.getText(),
                isCorrect,
                question.getExplanation()
        );
    }
}
