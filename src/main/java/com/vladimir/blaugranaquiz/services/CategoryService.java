package com.vladimir.blaugranaquiz.services;

import com.vladimir.blaugranaquiz.dtos.CategoryResponse;
import com.vladimir.blaugranaquiz.dtos.CreateCategoryRequest;
import com.vladimir.blaugranaquiz.dtos.UpdateCategoryRequest;
import com.vladimir.blaugranaquiz.entities.Category;
import com.vladimir.blaugranaquiz.exceptions.DuplicateResourceException;
import com.vladimir.blaugranaquiz.exceptions.ResourceNotFoundException;
import com.vladimir.blaugranaquiz.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found."));

        return mapToResponse(category);
    }

    public CategoryResponse createCategory(CreateCategoryRequest request) {
        if (categoryRepository.existsByNameIgnoreCase(request.getName())){
            throw new DuplicateResourceException("Category with this name already exists.");
        }
        Category category = new Category();
        category.setName(request.getName().trim());
        category.setDescription(request.getDescription());

        Category savedCategory = categoryRepository.save(category);

        return mapToResponse(savedCategory);
    }

    public CategoryResponse updateCategory(Long id, UpdateCategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found."));

        boolean nameAlreadyExists = categoryRepository.existsByNameIgnoreCase(request.getName());

        if (nameAlreadyExists && !category.getName().equalsIgnoreCase(request.getName())) {
            throw new DuplicateResourceException("Category with this name already exists.");
        }

        category.setName(request.getName().trim());
        category.setDescription(request.getDescription());

        Category updatedCategory = categoryRepository.save(category);

        return mapToResponse(updatedCategory);
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found."));

        categoryRepository.delete(category);
    }

    private CategoryResponse mapToResponse(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getDescription()
        );
    }
}
