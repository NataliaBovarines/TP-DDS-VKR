package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourapp.app.models.entities.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
}
