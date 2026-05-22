package com.vladimir.blaugranaquiz.dtos;

import com.vladimir.blaugranaquiz.entities.Difficulty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateQuestionRequest {

    @NotBlank(message = "Question text is required.")
    @Size(max = 1000, message = "Question text cannot exceed 1000 characters.")
    private String text;

    @NotNull(message = "Difficulty is required.")
    private Difficulty difficulty;

    @Size(max = 1000, message = "Explanation cannot exceed 1000 characters.")
    private String explanation;

    @NotNull(message = "Category id is required.")
    private Long categoryId;

    @NotNull(message = "Answer options are required.")
    @Size(min = 2, message = "Question must have at least 2 answer options.")
    @Valid
    private List<AnswerOptionRequest> answerOptions;
}
