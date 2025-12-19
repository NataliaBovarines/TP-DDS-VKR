package com.yourapp.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourapp.app.models.entities.Subcategoria;

public interface SubcategoriaRepository extends JpaRepository<Subcategoria, Long> {
    boolean existsByDescripcionAndFueEliminadoFalse(String descripcion);

    List<Subcategoria> findByCategoriaId(Long categoriaId);

    List<Subcategoria> findByFueEliminadoFalse();
}
