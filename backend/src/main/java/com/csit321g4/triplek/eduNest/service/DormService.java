package com.csit321g4.triplek.eduNest.service;

import com.csit321g4.triplek.eduNest.entity.Dorm;
import com.csit321g4.triplek.eduNest.repository.DormRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DormService {

    private final DormRepository repo;

    public DormService(DormRepository repo) {
        this.repo = repo;
    }

    public Dorm create(Dorm dorm) {
        return repo.save(dorm);
    }

    public List<Dorm> getAll() {
        return repo.findAll();
    }

    public Optional<Dorm> getById(Integer id) {
        return repo.findById(id);
    }

    public Optional<Dorm> update(Integer id, Dorm newData) {
        return repo.findById(id).map(d -> {
            d.setName(newData.getName());
            d.setAddress(newData.getAddress());
            d.setDistanceToCampusKm(newData.getDistanceToCampusKm());
            d.setBasePrice(newData.getBasePrice());
            d.setOverallNoiseLevel(newData.getOverallNoiseLevel());
            d.setContactEmail(newData.getContactEmail());
            return repo.save(d);
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