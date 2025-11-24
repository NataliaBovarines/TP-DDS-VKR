package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourapp.app.models.entities.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
}
