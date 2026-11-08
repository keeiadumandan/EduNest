package com.csit321g4.triplek.eduNest.controller;

import com.csit321g4.triplek.eduNest.entity.StudentPreference;
import com.csit321g4.triplek.eduNest.service.StudentPreferenceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/studentpreferences")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentPreferenceController {

    private final StudentPreferenceService service;

    public StudentPreferenceController(StudentPreferenceService service) {
        this.service = service;
    }

    @PostMapping
    public StudentPreference create(@RequestBody StudentPreference studentPreference) {
        return service.create(studentPreference);
    }

    @GetMapping
    public List<StudentPreference> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentPreference> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentPreference> update(@PathVariable Integer id, @RequestBody StudentPreference studentPreference) {
        return service.update(id, studentPreference)
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