package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.TalleRepository;

@Service
public class TalleService {
    private final TalleRepository talleRepository;

    public TalleService(TalleRepository talleRepository) {
        this.talleRepository = talleRepository;
    }
}
