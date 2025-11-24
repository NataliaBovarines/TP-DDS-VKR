package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.ClienteRepository;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;

    public ClienteService (ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }        
}
