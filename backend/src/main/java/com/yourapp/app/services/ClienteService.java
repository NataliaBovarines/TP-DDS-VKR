package com.yourapp.app.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.ClienteMapper;
import com.yourapp.app.models.dto.ClienteDto;
import com.yourapp.app.models.entities.Cliente;
import com.yourapp.app.repositories.ClienteRepository;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClienteService {
    private final ClienteRepository clienteRepository;
    
    @Transactional
    public Cliente crearCliente(ClienteDto clienteDto) {
        Cliente cliente = ClienteMapper.toEntity(clienteDto);
        if (clienteRepository.existsByDni(clienteDto.getDni())) throw new ConflictException("El DNI ya esta asignado a otro cliente");
        return clienteRepository.save(cliente);
    }

    public Cliente obtenerCliente(Long id) {
        return clienteRepository.findById(id).orElseThrow(() -> new NotFoundException("Cliente no encontrado"));
    }

    public List<Cliente> obtenerTodosLosClientes() {
        return clienteRepository.findAll();
    }
}
