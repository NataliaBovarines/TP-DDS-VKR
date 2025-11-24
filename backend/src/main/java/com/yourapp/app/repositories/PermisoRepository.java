package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourapp.app.models.entities.Permiso;

public interface PermisoRepository extends JpaRepository<Permiso, Long> {
    
}
