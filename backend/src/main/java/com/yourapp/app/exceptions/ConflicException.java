package com.yourapp.app.exceptions;

import org.springframework.http.HttpStatus;

public class ConflicException extends AppException {
    public ConflicException(String mensaje) {
        super(mensaje, HttpStatus.CONFLICT);
    }
}
