package com.vladimir.blaugranaquiz.dtos;

import lombok.Getter;

@Getter
public class CurrentUserResponse {

    private Long id;
    private String username;
    private String email;
    private String role;

    public CurrentUserResponse(Long id, String username, String email, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }
}
