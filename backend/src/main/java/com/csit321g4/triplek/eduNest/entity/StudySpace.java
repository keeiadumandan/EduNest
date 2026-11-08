package com.csit321g4.triplek.eduNest.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "study_space")
@Data
public class StudySpace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer spaceId;

    @ManyToOne
    @JoinColumn(name = "dorm_id")
    private Dorm dorm;

    private String spaceType;

    private Integer capacity;

    private String noiseLevel;

    private Boolean is24h;
}