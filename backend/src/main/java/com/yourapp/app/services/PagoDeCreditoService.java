package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.PagoDeCreditoRepository;

@Service
public class PagoDeCreditoService {
    private final PagoDeCreditoRepository pagoDeCreditoRepository;

    public PagoDeCreditoService(PagoDeCreditoRepository pagoDeCreditoRepository) {
        this.pagoDeCreditoRepository = pagoDeCreditoRepository; 
    }
}
