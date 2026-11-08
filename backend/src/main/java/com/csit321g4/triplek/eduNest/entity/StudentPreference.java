package com.csit321g4.triplek.eduNest.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_preference")
@Data
public class StudentPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer prefId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "style_id")
    private LearningStyle style;

    private String preferredNoiseLevel;

    private Boolean needsSharedStudySpace;

    private Integer studyStartHour;

    private Integer studyEndHour;

    private BigDecimal budgetMax;

    private BigDecimal maxDistanceKm;

    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onSave() {
        updatedAt = LocalDateTime.now();
    }
}