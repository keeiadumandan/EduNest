package com.csit321g4.triplek.eduNest.controller;

import com.csit321g4.triplek.eduNest.entity.DormFeature;
import com.csit321g4.triplek.eduNest.service.DormFeatureService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/dormfeatures")
@CrossOrigin(origins = "http://localhost:5173")
public class DormFeatureController {

    private final DormFeatureService service;

    public DormFeatureController(DormFeatureService service) {
        this.service = service;
    }

    @PostMapping
    public DormFeature create(@RequestBody DormFeature dormFeature) {
        return service.create(dormFeature);
    }

    @GetMapping
    public List<DormFeature> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DormFeature> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DormFeature> update(@PathVariable Integer id, @RequestBody DormFeature dormFeature) {
        return service.update(id, dormFeature)
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