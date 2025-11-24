package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.CategoriaRepository;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }    
}
