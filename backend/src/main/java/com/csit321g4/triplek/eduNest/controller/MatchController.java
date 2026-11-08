package com.csit321g4.triplek.eduNest.controller;

import com.csit321g4.triplek.eduNest.entity.Match;
import com.csit321g4.triplek.eduNest.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:5173")
public class MatchController {

    private final MatchService service;

    MatchController(MatchService service) {
        this.service = service;
    }

    @PostMapping
    public Match create(@RequestBody Match match) {
        return service.create(match);
    }

    @GetMapping
    public List<Match> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Match> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Match> update(@PathVariable Integer id, @RequestBody Match match) {
        return service.update(id, match)
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