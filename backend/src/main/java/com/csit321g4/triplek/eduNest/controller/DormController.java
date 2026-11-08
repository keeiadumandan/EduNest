package com.csit321g4.triplek.eduNest.controller;

import com.csit321g4.triplek.eduNest.entity.Dorm;
import com.csit321g4.triplek.eduNest.service.DormService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/dorms")
@CrossOrigin(origins = "http://localhost:5173")
public class DormController {

    private final DormService service;

    public DormController(DormService service) {
        this.service = service;
    }

    @PostMapping
    public Dorm create(@RequestBody Dorm dorm) {
        return service.create(dorm);
    }

    @GetMapping
    public List<Dorm> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dorm> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dorm> update(@PathVariable Integer id, @RequestBody Dorm dorm) {
        return service.update(id, dorm)
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