package com.yourapp.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.yourapp.app.services.TalleService;

@RestController
@RequestMapping("/talles")
public class TalleController {
    private final TalleService talleService;

    public TalleController(TalleService talleService) {
        this.talleService = talleService;
    }
}
