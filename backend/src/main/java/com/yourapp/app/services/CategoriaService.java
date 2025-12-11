package com.yourapp.app.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.CategoriaMapper;
import com.yourapp.app.models.dto.CategoriaDto;
import com.yourapp.app.models.entities.Categoria;
import com.yourapp.app.repositories.CategoriaRepository;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public Categoria crearCategoria(CategoriaDto categoriaDto) {
        if (categoriaRepository.existsByDescripcion(categoriaDto.getDescripcion())) throw new ConflictException("La descripción de la categoria ya está en uso");
        Categoria categoria = CategoriaMapper.toEntity(categoriaDto);
        return categoriaRepository.save(categoria);
    }

    public Categoria obtenerCategoria(Long categoriaId) {
        return categoriaRepository.findById(categoriaId).orElseThrow(() -> new NotFoundException("Categoria no encontrada"));
    }

    public List<Categoria> obtenerTodasLasCategorias() {
        return categoriaRepository.findAll();
    }
}
