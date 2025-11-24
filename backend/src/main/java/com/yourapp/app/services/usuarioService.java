package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.UsuarioRepository;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
}
