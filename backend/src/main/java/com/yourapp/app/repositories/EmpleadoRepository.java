package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourapp.app.models.entities.Empleado;
import com.yourapp.app.models.entities.Usuario;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    boolean existsByUsuario(Usuario usuario);
}
