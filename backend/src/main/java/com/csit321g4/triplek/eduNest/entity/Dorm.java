package com.csit321g4.triplek.eduNest.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "dorm")
@Data
public class Dorm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer dormId;

    private String name;
    private String address;
    private BigDecimal distanceToCampusKm;
    private BigDecimal basePrice;
    private String overallNoiseLevel;
    private String contactEmail;
}