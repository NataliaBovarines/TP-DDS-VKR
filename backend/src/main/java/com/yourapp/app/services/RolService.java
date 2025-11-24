package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.RolRepository;

@Service
public class RolService {
    private final RolRepository rolRepository;

    public RolService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }
}
