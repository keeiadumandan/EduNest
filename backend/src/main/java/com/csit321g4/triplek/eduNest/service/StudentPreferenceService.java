package com.csit321g4.triplek.eduNest.service;

import com.csit321g4.triplek.eduNest.entity.StudentPreference;
import com.csit321g4.triplek.eduNest.repository.StudentPreferenceRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StudentPreferenceService {

    private final StudentPreferenceRepository repo;

    public StudentPreferenceService(StudentPreferenceRepository repo) {
        this.repo = repo;
    }

    public StudentPreference create(StudentPreference studentPreference) {
        return repo.save(studentPreference);
    }

    public List<StudentPreference> getAll() {
        return repo.findAll();
    }

    public Optional<StudentPreference> getById(Integer id) {
        return repo.findById(id);
    }

    public Optional<StudentPreference> update(Integer id, StudentPreference newData) {
        return repo.findById(id).map(x -> {
            x.setStudent(newData.getStudent());
            x.setStyle(newData.getStyle());
            x.setPreferredNoiseLevel(newData.getPreferredNoiseLevel());
            x.setNeedsSharedStudySpace(newData.getNeedsSharedStudySpace());
            x.setStudyStartHour(newData.getStudyStartHour());
            x.setStudyEndHour(newData.getStudyEndHour());
            x.setBudgetMax(newData.getBudgetMax());
            x.setMaxDistanceKm(newData.getMaxDistanceKm());
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