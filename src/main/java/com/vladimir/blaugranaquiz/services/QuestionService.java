package com.vladimir.blaugranaquiz.services;

import com.vladimir.blaugranaquiz.dtos.AnswerOptionRequest;
import com.vladimir.blaugranaquiz.dtos.AnswerOptionResponse;
import com.vladimir.blaugranaquiz.dtos.CreateQuestionRequest;
import com.vladimir.blaugranaquiz.dtos.QuestionResponse;
import com.vladimir.blaugranaquiz.entities.AnswerOption;
import com.vladimir.blaugranaquiz.entities.Category;
import com.vladimir.blaugranaquiz.entities.Question;
import com.vladimir.blaugranaquiz.exceptions.ResourceNotFoundException;
import com.vladimir.blaugranaquiz.repositories.CategoryRepository;
import com.vladimir.blaugranaquiz.repositories.QuestionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final CategoryRepository categoryRepository;

    public QuestionService(QuestionRepository questionRepository, CategoryRepository categoryRepository) {
        this.questionRepository = questionRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<QuestionResponse> getAllQuestions() {
        return questionRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public QuestionResponse getQuestionById(Long id) {
        return mapToResponse(questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found.")));
    }

    public List<QuestionResponse> getQuestionsByCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category not found.");
        }

        return questionRepository.findByCategoryId(categoryId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public QuestionResponse createQuestion(CreateQuestionRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found."));

        validateCorrectAnswerCount(request);

        Question question = new Question();
        question.setText(request.getText().trim());
        question.setDifficulty(request.getDifficulty());
        question.setExplanation(request.getExplanation());
        question.setCategory(category);

        List<AnswerOption> answerOptions = request.getAnswerOptions()
                .stream()
                .map(optionRequest -> {
                    AnswerOption option = new AnswerOption();
                    option.setText(optionRequest.getText().trim());
                    option.setCorrect(optionRequest.isCorrect());
                    option.setQuestion(question);
                    return option;
                })
                .toList();

        question.setAnswerOptions(answerOptions);

        Question savedQuestion = questionRepository.save(question);

        return mapToResponse(savedQuestion);
    }

    public void deleteQuestion(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found."));

        questionRepository.delete(question);
    }

    private void validateCorrectAnswerCount(CreateQuestionRequest request) {
        long correctAnswersCount = request.getAnswerOptions()
                .stream()
                .filter(AnswerOptionRequest::isCorrect)
                .count();

        if (correctAnswersCount != 1) {
            throw new IllegalArgumentException("Question must have exactly one correct answer.");
        }
    }

    private QuestionResponse mapToResponse(Question question) {
        List<AnswerOptionResponse> answerOptionResponses = question.getAnswerOptions()
                .stream()
                .map(option -> new AnswerOptionResponse(
                        option.getId(),
                        option.getText(),
                        option.isCorrect()
                ))
                .toList();

        return new QuestionResponse(
                question.getId(),
                question.getText(),
                question.getDifficulty(),
                question.getExplanation(),
                question.getCategory().getId(),
                question.getCategory().getName(),
                answerOptionResponses
        );
    }
}
