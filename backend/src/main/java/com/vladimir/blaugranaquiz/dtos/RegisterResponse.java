package com.vladimir.blaugranaquiz.dtos;

import lombok.Getter;

@Getter
public class RegisterResponse {

    private Long userId;
    private String username;
    private String email;
    private String role;
    private String message;

    public RegisterResponse(Long userId, String username, String email, String role, String message) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.role = role;
        this.message = message;
    }
}
