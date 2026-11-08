package com.csit321g4.triplek.eduNest.service;

import com.csit321g4.triplek.eduNest.entity.Student;
import com.csit321g4.triplek.eduNest.repository.StudentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public Student create(Student student) {
        return repo.save(student);
    }

    public List<Student> getAll() {
        return repo.findAll();
    }

    public Optional<Student> getById(Integer id) {
        return repo.findById(id);
    }

    public Optional<Student> update(Integer id, Student newData) {
        return repo.findById(id).map(x -> {
            x.setFirstName(newData.getFirstName());
            x.setLastName(newData.getLastName());
            x.setEmail(newData.getEmail());
            x.setPasswordHash(newData.getPasswordHash());
            x.setYearLevel(newData.getYearLevel());
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