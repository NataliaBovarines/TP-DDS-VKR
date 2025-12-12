package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.TipoDePrendaDto;
import com.yourapp.app.models.entities.TipoDePrenda;

public class TipoDePrendaMapper {
    public static TipoDePrenda toEntity(TipoDePrendaDto tipoDePrendaDto) {
        TipoDePrenda tipoDePrenda = new TipoDePrenda();
        tipoDePrenda.setDescripcion(tipoDePrendaDto.getDescripcion());
        return tipoDePrenda;
    }    
}
