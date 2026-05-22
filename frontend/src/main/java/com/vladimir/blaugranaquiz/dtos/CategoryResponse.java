package com.vladimir.blaugranaquiz.dtos;

import lombok.Getter;

@Getter
public class CategoryResponse {

    private Long id;
    private String name;
    private String description;

    public CategoryResponse(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
