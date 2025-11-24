package com.yourapp.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.yourapp.app.services.ColorService;

@RestController
@RequestMapping("/colores")
public class ColorController {
    private final ColorService colorService;

    public ColorController(ColorService colorService) {
        this.colorService = colorService;
    }
}
