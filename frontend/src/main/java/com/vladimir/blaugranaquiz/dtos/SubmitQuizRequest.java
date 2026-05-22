package com.vladimir.blaugranaquiz.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SubmitQuizRequest {

    @NotNull(message = "Answers are required.")
    @Size(min = 1, message = "At least one answer is required.")
    @Valid
    private List<SubmitAnswerRequest> answers;
}
