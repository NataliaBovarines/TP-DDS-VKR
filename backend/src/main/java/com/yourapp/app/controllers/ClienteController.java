package com.yourapp.app.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.models.dto.ClienteDto;
import com.yourapp.app.models.entities.Cliente;
import com.yourapp.app.services.ClienteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/clientes")
@RequiredArgsConstructor
public class ClienteController {
    private final ClienteService clienteService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Cliente crearCliente(@RequestBody @Valid ClienteDto clienteDto) {
        return clienteService.crearCliente(clienteDto);
    }

    @GetMapping("/{}")
    @ResponseStatus(HttpStatus.OK) 
    public Cliente obtenerCliente(@PathVariable Long id) {
        return clienteService.obtenerCliente(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Cliente> obtenerTodosLosClientes() {
        return clienteService.obtenerTodosLosClientes();
    }
}
