package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.PermisoRepository;

@Service
public class PermisoService {
    private final PermisoRepository permisoRepository;

    public PermisoService(PermisoRepository permisoRepository) {
        this.permisoRepository = permisoRepository;
    }
}
