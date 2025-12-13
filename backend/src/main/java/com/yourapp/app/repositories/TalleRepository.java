package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourapp.app.models.entities.Talle;

public interface TalleRepository extends JpaRepository<Talle, Long> {
    boolean existsByDescripcion(String descripcion);  
}
