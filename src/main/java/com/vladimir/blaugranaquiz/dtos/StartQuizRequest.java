package com.vladimir.blaugranaquiz.dtos;

import com.vladimir.blaugranaquiz.entities.Difficulty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StartQuizRequest {

    @NotNull(message = "Category id is required.")
    private Long categoryId;

    @NotNull(message = "Difficulty is required.")
    private Difficulty difficulty;

    @NotNull(message = "Number of questions is required.")
    @Min(value = 1, message = "Number of questions must be at least 1.")
    @Max(value = 20, message = "Number of questions cannot exceed 20.")
    private Integer numberOfQuestions;
}
