package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.TalleDto;
import com.yourapp.app.models.entities.Talle;

public class TalleMapper {
    public static Talle toEntity(TalleDto talleDto) {
        Talle talle = new Talle();
        talle.setDescripcion(talleDto.getDescripcion());
        return talle;
    }
}
