package com.vladimir.blaugranaquiz.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubmitAnswerRequest {

    @NotNull(message = "Question id is required.")
    private Long questionId;

    @NotNull(message = "Selected answer option id is required.")
    private Long selectedAnswerOptionId;


}
