package com.csit321g4.triplek.eduNest.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "learning_style")
@Data
public class LearningStyle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer styleId;

    private String styleName;

    @Column(length = 1000)
    private String description;
}