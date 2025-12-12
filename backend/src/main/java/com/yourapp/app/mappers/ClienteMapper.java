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
        cliente.setCreditoLimite(clienteDto.getCreditoLimite());
        cliente.setCategoriaCliente(clienteDto.getCategoria());
        return cliente;
    }
}
