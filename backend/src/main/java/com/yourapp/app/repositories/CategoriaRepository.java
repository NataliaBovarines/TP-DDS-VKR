package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourapp.app.models.entities.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    boolean existsByDescripcion(String descripcion);
}
