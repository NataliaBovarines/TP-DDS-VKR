package com.yourapp.app.models.dto;

import java.util.List;

import com.yourapp.app.models.entities.Permiso;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RolUpdateDto {
    @NotEmpty
    private List<Permiso> permisos;
}
