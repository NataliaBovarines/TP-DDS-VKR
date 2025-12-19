package com.yourapp.app.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.SubcategoriaMapper;
import com.yourapp.app.models.dto.SubcategoriaDto;
import com.yourapp.app.models.dto.SubcategoriaFiltroDto;
import com.yourapp.app.models.entities.Categoria;
import com.yourapp.app.models.entities.Subcategoria;
import com.yourapp.app.repositories.ProductoRepository;
import com.yourapp.app.repositories.SubcategoriaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubcategoriaService {
    private final SubcategoriaRepository subcategoriaRepository;
    private final CategoriaService categoriaService;
    private final ProductoRepository productoRepository;
    
    // ============================ CREAR UNA SUBCATEGORIA ============================
    @Transactional
    public Subcategoria crearSubcategoria(SubcategoriaDto subcategoriaDto) {
        if (subcategoriaRepository.existsByDescripcionAndFueEliminadoFalse(subcategoriaDto.getDescripcion())) throw new ConflictException("La descripción de la subcategoría ya está en uso");
        Categoria categoria = categoriaService.obtenerCategoria(subcategoriaDto.getCategoriaId());
        Subcategoria subcategoria = SubcategoriaMapper.toEntity(subcategoriaDto, categoria);
        return subcategoriaRepository.save(subcategoria);
    }

    // ============================ ELIMINAR UN SUBCATEGORIA ============================
    @Transactional
    public void eliminarSubcategoria(Long id) {
        Subcategoria subcategoria = obtenerSubcategoria(id);
        if (productoRepository.existsBySubcategoriaIdAndFueEliminadoFalse(id)) throw new ConflictException("No se puede eliminar la subcategoría porque tiene productos asociados");
        subcategoria.softDelete();
        subcategoriaRepository.save(subcategoria);
    }

    // ============================ OBTENER UNA SUBCATEGORIA ============================
    public Subcategoria obtenerSubcategoria(Long subcategoriaId) {
        Subcategoria subcategoria = subcategoriaRepository.findById(subcategoriaId).orElseThrow(() -> new NotFoundException("Subcategoría no encontrada"));
        if (subcategoria.getFueEliminado() || subcategoria.getCategoria().getFueEliminado()) throw new NotFoundException("Subcategoria o categoria eliminada");
        return subcategoria;
    }

    // ============================ OBTENER TODAS LAS SUBCATEGORIAS DE UNA CATEGORIA ============================
    public List<Subcategoria> obtenerSubcategoriasByCategoria(SubcategoriaFiltroDto filtros) {
        if (filtros.getCategoriaId() != null) return subcategoriaRepository.findByCategoriaId(filtros.getCategoriaId());
        return subcategoriaRepository.findByFueEliminadoFalse();
    }
}
