package com.yourapp.app.mappers;

import org.mapstruct.*;

import com.yourapp.app.models.dto.ConfiguracionUpdateDto;
import com.yourapp.app.models.entities.ConfiguracionTienda;

@Mapper(
    componentModel = "spring", 
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ConfiguracionMapper {
    void toUpdateEntity(ConfiguracionUpdateDto dto, @MappingTarget ConfiguracionTienda entity);
}
