package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourapp.app.models.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByNombreDeUsuario(String nombreDeUsuario);
}
