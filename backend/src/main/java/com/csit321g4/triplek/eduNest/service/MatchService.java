package com.csit321g4.triplek.eduNest.service;

import com.csit321g4.triplek.eduNest.entity.Match;
import com.csit321g4.triplek.eduNest.repository.MatchRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MatchService {

    private final MatchRepository repo;

    public MatchService(MatchRepository repo) {
        this.repo = repo;
    }

    public Match create(Match match) {
        return repo.save(match);
    }

    public List<Match> getAll() {
        return repo.findAll();
    }

    public Optional<Match> getById(Integer id) {
        return repo.findById(id);
    }

    public Optional<Match> update(Integer id, Match newData) {
        return repo.findById(id).map(x -> {
            x.setStudent(newData.getStudent());
            x.setDorm(newData.getDorm());
            x.setMatchScore(newData.getMatchScore());
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