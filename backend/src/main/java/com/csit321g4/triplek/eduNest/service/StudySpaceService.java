package com.csit321g4.triplek.eduNest.service;

import com.csit321g4.triplek.eduNest.entity.StudySpace;
import com.csit321g4.triplek.eduNest.repository.StudySpaceRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StudySpaceService {

    private StudySpaceRepository repo;

    public StudySpaceService(StudySpaceRepository repo) {
        this.repo = repo;
    }

    public StudySpace create(StudySpace studySpace) {
        return repo.save(studySpace);
    }

    public List<StudySpace> getAll() {
        return repo.findAll();
    }

    public Optional<StudySpace> getById(Integer id) {
        return repo.findById(id);
    }

    public Optional<StudySpace> update(Integer id, StudySpace newData) {
        return repo.findById(id).map(x -> {
            x.setDorm(newData.getDorm());
            x.setSpaceType(newData.getSpaceType());
            x.setCapacity(newData.getCapacity());
            x.setNoiseLevel(newData.getNoiseLevel());
            x.setIs24h(newData.getIs24h());
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