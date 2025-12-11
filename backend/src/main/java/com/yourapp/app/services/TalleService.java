package com.yourapp.app.services;

import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.TalleMapper;
import com.yourapp.app.models.dto.TalleDto;
import com.yourapp.app.models.entities.Talle;
import com.yourapp.app.repositories.TalleRepository;

@Service
public class TalleService {
    private final TalleRepository talleRepository;

    public TalleService(TalleRepository talleRepository) {
        this.talleRepository = talleRepository;
    }
    
    public Talle crearTalle(TalleDto talleDto) {
        if (talleRepository.existsByDescripcion(talleDto.getDescripcion())) throw new ConflictException("La descripción del talle ya está en uso");
        Talle talle = TalleMapper.toEntity(talleDto);
        return talleRepository.save(talle);
    }

    public Talle obtenerTalle(Long talleId) {
        return talleRepository.findById(talleId).orElseThrow(() -> new NotFoundException("Talle no encontrado"));
    }
}
