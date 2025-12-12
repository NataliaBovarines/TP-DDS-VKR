package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.EmpleadoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmpleadoService {
    private final EmpleadoRepository empleadoRepository;
}
