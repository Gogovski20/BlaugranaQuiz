package com.vladimir.blaugranaquiz.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerOptionRequest {

    @NotBlank(message = "Answer option text is required.")
    @Size(max = 500, message = "Answer option text cannot exceed 500 characters.")
    private String text;

    private boolean correct;
}
