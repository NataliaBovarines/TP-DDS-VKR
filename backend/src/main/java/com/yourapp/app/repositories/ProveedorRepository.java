package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourapp.app.models.entities.Proveedor;

public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    
}
