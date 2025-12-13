package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.ColorDto;
import com.yourapp.app.models.entities.Color;

public class ColorMapper {
    public static Color toEntity(ColorDto colorDto) {
        Color color = new Color();
        color.setDescripcion(colorDto.getDescripcion());
        return color;
    }
}
