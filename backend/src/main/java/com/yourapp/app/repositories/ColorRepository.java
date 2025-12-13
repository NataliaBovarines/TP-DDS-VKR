package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourapp.app.models.entities.Color;

public interface ColorRepository extends JpaRepository<Color, Long> {
    boolean existsByDescripcion(String descripcion);   
}
