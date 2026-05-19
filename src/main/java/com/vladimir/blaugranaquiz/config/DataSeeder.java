package com.vladimir.blaugranaquiz.config;

import com.vladimir.blaugranaquiz.entities.AnswerOption;
import com.vladimir.blaugranaquiz.entities.Category;
import com.vladimir.blaugranaquiz.entities.Difficulty;
import com.vladimir.blaugranaquiz.entities.Question;
import com.vladimir.blaugranaquiz.repositories.CategoryRepository;
import com.vladimir.blaugranaquiz.repositories.QuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final QuestionRepository questionRepository;

    public DataSeeder(CategoryRepository categoryRepository, QuestionRepository questionRepository) {
        this.categoryRepository = categoryRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() > 0 || questionRepository.count() > 0) {
            return;
        }

        Category players = new Category();
        players.setName("Players");
        players.setDescription("Questions about FC Barcelona players.");

        Category history = new Category();
        history.setName("Club History");
        history.setDescription("Questions about FC Barcelona history.");

        categoryRepository.saveAll(List.of(players, history));

        Question q1 = createQuestion(
                "Who was Barcelona's manager during the 2008/09 treble-winning season?",
                Difficulty.EASY,
                "Pep Guardiola led Barcelona to the treble in his first season as first-team manager.",
                history,
                List.of(
                        createOption("Pep Guardiola", true),
                        createOption("Frank Rijkaard", false),
                        createOption("Luis Enrique", false),
                        createOption("Johan Cruyff", false)
                )
        );

        Question q2 = createQuestion(
                "Which team did Barca beat in 2015 UCL final?",
                Difficulty.EASY,
                "Lionel Messi became Barcelona's all-time leading goalscorer.",
                players,
                List.of(
                        createOption("Juventus", true),
                        createOption("Bayern Munich", false),
                        createOption("Real Madrid", false),
                        createOption("Manchester City", false)
                )
        );

        questionRepository.saveAll(List.of(q1, q2));
    }

    private Question createQuestion(
            String text,
            Difficulty difficulty,
            String explanation,
            Category category,
            List<AnswerOption> options
    ) {
        Question question = new Question();
        question.setText(text);
        question.setDifficulty(difficulty);
        question.setExplanation(explanation);
        question.setCategory(category);

        options.forEach(option -> option.setQuestion(question));
        question.setAnswerOptions(options);

        return question;
    }

    private AnswerOption createOption(String text, boolean correct) {
        AnswerOption option = new AnswerOption();
        option.setText(text);
        option.setCorrect(correct);
        return option;
    }
}