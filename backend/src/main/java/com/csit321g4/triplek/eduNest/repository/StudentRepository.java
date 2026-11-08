package com.csit321g4.triplek.eduNest.repository;

import com.csit321g4.triplek.eduNest.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}