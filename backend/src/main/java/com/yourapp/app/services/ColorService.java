package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.ColorRepository;

@Service
public class ColorService {
    private final ColorRepository colorRepository;

    public ColorService(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }
}
