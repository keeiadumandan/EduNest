package com.csit321g4.triplek.eduNest.controller;

import com.csit321g4.triplek.eduNest.entity.LearningStyle;
import com.csit321g4.triplek.eduNest.service.LearningStyleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/learningstyles")
@CrossOrigin(origins = "http://localhost:5173")
public class LearningStyleController {

    private final LearningStyleService service;

    public LearningStyleController(LearningStyleService service) {
        this.service = service;
    }

    @PostMapping
    public LearningStyle create(@RequestBody LearningStyle learningStyle) {
        return service.create(learningStyle);
    }

    @GetMapping
    public List<LearningStyle> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningStyle> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningStyle> update(@PathVariable Integer id, @RequestBody LearningStyle learningStyle) {
        return service.update(id, learningStyle)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        return service.delete(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}