package com.csit321g4.triplek.eduNest.service;

import com.csit321g4.triplek.eduNest.entity.Review;
import com.csit321g4.triplek.eduNest.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository repo;

    public ReviewService(ReviewRepository repo) {
        this.repo = repo;
    }

    public Review create(Review review) {
        return repo.save(review);
    }

    public List<Review> getAll() {
        return repo.findAll();
    }

    public Optional<Review> getById(Integer id) {
        return repo.findById(id);
    }

    public Optional<Review> update(Integer id, Review newData) {
        return repo.findById(id).map(x -> {
            x.setStudent(newData.getStudent());
            x.setDorm(newData.getDorm());
            x.setNoiseRating(newData.getNoiseRating());
            x.setStudyFriendlyRating(newData.getStudyFriendlyRating());
            x.setComment(newData.getComment());
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