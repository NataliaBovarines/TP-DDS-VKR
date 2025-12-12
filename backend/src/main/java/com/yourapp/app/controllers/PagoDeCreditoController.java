package com.yourapp.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.services.PagoDeCreditoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/pagos-de-credito")
@RequiredArgsConstructor
public class PagoDeCreditoController {
    private final PagoDeCreditoService pagoDeCreditoService;
}
