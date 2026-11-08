package com.csit321g4.triplek.eduNest.service;

import com.csit321g4.triplek.eduNest.entity.LearningStyle;
import com.csit321g4.triplek.eduNest.repository.LearningStyleRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LearningStyleService {

    private final LearningStyleRepository repo;

    public LearningStyleService(LearningStyleRepository repo) {
        this.repo = repo;
    }

    public LearningStyle create(LearningStyle learningStyle) {
        return repo.save(learningStyle);
    }

    public List<LearningStyle> getAll() {
        return repo.findAll();
    }

    public Optional<LearningStyle> getById(Integer id) {
        return repo.findById(id);
    }

    public Optional<LearningStyle> update(Integer id, LearningStyle newData) {
        return repo.findById(id).map(x -> {
            x.setStyleName(newData.getStyleName());
            x.setDescription(newData.getDescription());
            return repo.save(x);
        });
    }

    public boolean delete(Integer id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}