package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.TipoDePrendaRepository;

@Service
public class TipoDePrendaService {
    private final TipoDePrendaRepository tipoDePrendaRepository;

    public TipoDePrendaService(TipoDePrendaRepository tipoDePrendaRepository) {
        this.tipoDePrendaRepository = tipoDePrendaRepository;
    }
}
