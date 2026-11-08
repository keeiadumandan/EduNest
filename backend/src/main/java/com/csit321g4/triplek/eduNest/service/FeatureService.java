package com.csit321g4.triplek.eduNest.service;

import com.csit321g4.triplek.eduNest.entity.Feature;
import com.csit321g4.triplek.eduNest.repository.FeatureRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {

    private final FeatureRepository repo;

    public FeatureService(FeatureRepository repo) {
        this.repo = repo;
    }

    public Feature create(Feature feature) {
        return repo.save(feature);
    }

    public List<Feature> getAll() {
        return repo.findAll();
    }

    public Optional<Feature> getById(Integer id) {
        return repo.findById(id);
    }

    public Optional<Feature> update(Integer id, Feature newData) {
        return repo.findById(id).map(x -> {
            x.setFeatureName(newData.getFeatureName());
            x.setCategory(newData.getCategory());
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