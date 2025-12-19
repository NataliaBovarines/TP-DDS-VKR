package com.yourapp.app.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.ColorMapper;
import com.yourapp.app.models.dto.ColorDto;
import com.yourapp.app.models.entities.Color;
import com.yourapp.app.repositories.ColorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ColorService {
    private final ColorRepository colorRepository;

    // ============================ CREAR COLOR ============================
    @Transactional
    public Color crearColor(ColorDto colorDto) {
        if (colorRepository.existsByDescripcion(colorDto.getDescripcion())) throw new ConflictException("La descripción del color ya está en uso");
        Color color = ColorMapper.toEntity(colorDto);
        return colorRepository.save(color);
    }

    // ============================ OBTENER COLOR ============================
    public Color obtenerColor(Long colorId) {
        return colorRepository.findById(colorId).orElseThrow(() -> new NotFoundException("Color no encontrado"));
    }

    // ============================ OBTENER TODOS LOS COLORES ============================
    public List<Color> obtenerTodosLosColores() {
        return colorRepository.findAll();
    }
}
