package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.ProductoRepository;

@Service
public class ProductoService {
    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }
}
