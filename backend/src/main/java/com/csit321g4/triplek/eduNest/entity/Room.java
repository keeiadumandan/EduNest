package com.csit321g4.triplek.eduNest.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "room")
@Data
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;

    @ManyToOne
    @JoinColumn(name = "dorm_id")
    private Dorm dorm;

    private String roomNumber;
    private Integer capacity;
    private BigDecimal monthlyPrice;
    private String occupancyStatus;
}