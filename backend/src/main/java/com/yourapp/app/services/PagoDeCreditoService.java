package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.PagoDeCreditoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PagoDeCreditoService {
    private final PagoDeCreditoRepository pagoDeCreditoRepository;
}
