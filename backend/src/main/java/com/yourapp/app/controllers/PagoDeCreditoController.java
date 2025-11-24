package com.yourapp.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.yourapp.app.services.PagoDeCreditoService;

@RestController
@RequestMapping("/pagos-de-credito")
public class PagoDeCreditoController {
    private final PagoDeCreditoService pagoDeCreditoService;

    public PagoDeCreditoController(PagoDeCreditoService pagoDeCreditoService) {
        this.pagoDeCreditoService = pagoDeCreditoService;
    }
}
