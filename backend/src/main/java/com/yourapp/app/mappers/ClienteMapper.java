package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.ClienteDto;
import com.yourapp.app.models.entities.Cliente;

public class ClienteMapper {
    public static Cliente toEntity(ClienteDto clienteDto) {
        Cliente cliente = new Cliente();
        cliente.setNombre(clienteDto.getNombre());
        cliente.setApellido(clienteDto.getApellido());
        cliente.setTelefono(clienteDto.getTelefono());
        cliente.setDni(clienteDto.getDni());
        cliente.setCreditoLimite(clienteDto.getCreditoLimite() != null ? clienteDto.getCreditoLimite() : 0.0);
        
        if (clienteDto.getCategoria() != null) cliente.setCategoriaCliente(clienteDto.getCategoria());
        else cliente.setCategoriaCliente(Cliente.CategoriaCliente.NO_CONFIABLE);
        
        return cliente;
    }
}
