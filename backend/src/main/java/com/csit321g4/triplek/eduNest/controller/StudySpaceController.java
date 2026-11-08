package com.csit321g4.triplek.eduNest.controller;

import com.csit321g4.triplek.eduNest.entity.StudySpace;
import com.csit321g4.triplek.eduNest.service.StudySpaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/studyspaces")
@CrossOrigin(origins = "http://localhost:5173")
public class StudySpaceController {

    private final StudySpaceService service;

    public StudySpaceController(StudySpaceService service) {
        this.service = service;
    }

    @PostMapping
    public StudySpace create(@RequestBody StudySpace studySpace) {
        return service.create(studySpace);
    }

    @GetMapping
    public List<StudySpace> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudySpace> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudySpace> update(@PathVariable Integer id, @RequestBody StudySpace studySpace) {
        return service.update(id, studySpace)
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