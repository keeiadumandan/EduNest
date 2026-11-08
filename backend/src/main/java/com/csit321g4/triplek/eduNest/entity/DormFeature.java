package com.csit321g4.triplek.eduNest.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "dorm_feature")
@Data
public class DormFeature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer dormFeatureId;

    @ManyToOne
    @JoinColumn(name = "dorm_id")
    private Dorm dorm;

    @ManyToOne
    @JoinColumn(name = "feature_id")
    private Feature feature;
}