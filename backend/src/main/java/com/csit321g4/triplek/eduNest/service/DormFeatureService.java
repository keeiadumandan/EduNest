package com.csit321g4.triplek.eduNest.service;

import com.csit321g4.triplek.eduNest.entity.DormFeature;
import com.csit321g4.triplek.eduNest.repository.DormFeatureRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DormFeatureService {

    private final DormFeatureRepository repo;

    public DormFeatureService(DormFeatureRepository repo) {
        this.repo = repo;
    }

    public DormFeature create(DormFeature dormFeature) {
        return repo.save(dormFeature);
    }

    public List<DormFeature> getAll() {
        return repo.findAll();
    }

    public Optional<DormFeature> getById(Integer id) {
        return repo.findById(id);
    }

    public Optional<DormFeature> update(Integer id, DormFeature newData) {
        return repo.findById(id).map(x -> {
            x.setDorm(newData.getDorm());
            x.setFeature(newData.getFeature());
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