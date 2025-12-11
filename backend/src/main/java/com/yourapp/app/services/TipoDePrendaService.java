package com.yourapp.app.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.TipoDePrendaMapper;
import com.yourapp.app.models.dto.TipoDePrendaDto;
import com.yourapp.app.models.entities.TipoDePrenda;
import com.yourapp.app.repositories.TipoDePrendaRepository;

@Service
public class TipoDePrendaService {
    private final TipoDePrendaRepository tipoDePrendaRepository;

    public TipoDePrendaService(TipoDePrendaRepository tipoDePrendaRepository) {
        this.tipoDePrendaRepository = tipoDePrendaRepository;
    }

        public TipoDePrenda crearTipoDePrenda(TipoDePrendaDto tipoDePrendaDto) {
        if (tipoDePrendaRepository.existsByDescripcion(tipoDePrendaDto.getDescripcion())) throw new ConflictException("La descripción del tipo de prenda ya está en uso");
        TipoDePrenda tipoDePrenda = TipoDePrendaMapper.toEntity(tipoDePrendaDto);
        return tipoDePrendaRepository.save(tipoDePrenda);
    }

    public TipoDePrenda obtenerTipoDePrenda(Long tipoDePrendaId) {
        return tipoDePrendaRepository.findById(tipoDePrendaId).orElseThrow(() -> new NotFoundException("Tipo de prenda no encontrado"));
    }

    public List<TipoDePrenda> obtenerTodosLosTipos() {
        return tipoDePrendaRepository.findAll();
    }
}
