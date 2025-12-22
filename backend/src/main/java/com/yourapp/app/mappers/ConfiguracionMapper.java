package com.yourapp.app.mappers;

import org.mapstruct.*;

import com.yourapp.app.models.dto.ConfiguracionUpdateRequest;
import com.yourapp.app.models.entities.ConfiguracionTienda;

@Mapper(
    componentModel = "spring", 
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ConfiguracionMapper {
    void updateEntity(ConfiguracionUpdateRequest dto, @MappingTarget ConfiguracionTienda entity);
}
