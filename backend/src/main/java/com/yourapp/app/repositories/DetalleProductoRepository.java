package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yourapp.app.models.entities.DetalleProducto;

public interface DetalleProductoRepository extends JpaRepository<DetalleProducto, Long> {
    
}
