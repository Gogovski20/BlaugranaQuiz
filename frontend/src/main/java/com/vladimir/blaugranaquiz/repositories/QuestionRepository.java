package com.vladimir.blaugranaquiz.repositories;

import com.vladimir.blaugranaquiz.entities.Difficulty;
import com.vladimir.blaugranaquiz.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByCategoryId(Long categoryId);
    List<Question> findByCategoryIdAndDifficulty(Long categoryId, Difficulty difficulty);
}
