package com.yourapp.app.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.TalleMapper;
import com.yourapp.app.models.dto.TalleDto;
import com.yourapp.app.models.entities.Talle;
import com.yourapp.app.repositories.TalleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TalleService {
    private final TalleRepository talleRepository;

    // ============================ CREAR TALLE ============================
    @Transactional
    public Talle crearTalle(TalleDto talleDto) {
        if (talleRepository.existsByDescripcionAndFueEliminadoFalse(talleDto.getDescripcion())) throw new ConflictException("La descripción del talle ya está en uso");
        Talle talle = TalleMapper.toEntity(talleDto);
        return talleRepository.save(talle);
    }

    // ============================ ELIMINAR UN TALLE ============================
    @Transactional
    public void eliminarTalle(Long id) {
        Talle talle = obtenerTalle(id);
        talle.softDelete();
        talleRepository.save(talle);
    }

    // ============================ OBTENER TALLE ============================
    public Talle obtenerTalle(Long talleId) {
        Talle talle = talleRepository.findById(talleId).orElseThrow(() -> new NotFoundException("Talle no encontrado"));
        if (talle.getFueEliminado()) throw new NotFoundException("Talle eliminado");
        return talle;
    }

    // ============================ OBTENER TODOS LOS TALLES ============================
    public List<Talle> obtenerTodosLosTalles() {
        return talleRepository.findByFueEliminadoFalse();
    }
}
