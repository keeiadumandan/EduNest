package com.csit321g4.triplek.eduNest.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "feature")
@Data
public class Feature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer featureId;

    private String featureName;

    private String category;
}