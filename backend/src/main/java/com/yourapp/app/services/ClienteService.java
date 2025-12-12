package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.ClienteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClienteService {
    private final ClienteRepository clienteRepository;
      
}
