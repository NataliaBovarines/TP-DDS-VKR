package com.yourapp.app.middlewares;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.yourapp.app.exceptions.AppException;
import com.yourapp.app.models.dto.ErrorDto;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class AppExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(AppExceptionHandler.class);

    private ResponseEntity<ErrorDto> crearErrorDto(String message, HttpStatus status, HttpServletRequest req) {
        logger.error("============= EXCEPCIÓN DETECTADA =============");
        logger.error("Status: {}", status.value());
        logger.error("Path: {}", req.getRequestURI());
        logger.error("Message: {}", message);
        logger.error("===============================================");

        ErrorDto errorDto = new ErrorDto(
            LocalDateTime.now(),
            status.value(),
            status.getReasonPhrase(),
            message,
            req.getRequestURI()
        );

        return ResponseEntity.status(status).body(errorDto);
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorDto> handleApp(AppException ex, HttpServletRequest req) {
        return crearErrorDto(ex.getMessage(), ex.getStatus(), req);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDto> handleValid(MethodArgumentNotValidException ex, HttpServletRequest req) {
        FieldError fieldError = ex.getBindingResult().getFieldErrors().get(0);
        
        String mensaje = String.format("El campo %s %s", fieldError.getField(), fieldError.getDefaultMessage());

        return crearErrorDto(mensaje, HttpStatus.BAD_REQUEST, req);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorDto> handleRoute(NoResourceFoundException ex, HttpServletRequest req) {
        return crearErrorDto("La ruta solicitada no existe", HttpStatus.NOT_FOUND, req);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
        public ResponseEntity<ErrorDto> handleMethod(HttpRequestMethodNotSupportedException ex, HttpServletRequest req) {
        String mensaje = String.format("El método %s no está permitido en esta ruta", ex.getMethod());
    
        return crearErrorDto(mensaje, HttpStatus.METHOD_NOT_ALLOWED, req);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorDto> handleAccessDenied(AccessDeniedException ex, HttpServletRequest req) {
        String mensaje = "Acceso denegado. No tiene los permisos necesarios.";
        
        return crearErrorDto(mensaje, HttpStatus.FORBIDDEN, req);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDto> handleGeneral(Exception ex, HttpServletRequest req) {
        return crearErrorDto("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR, req);
    }
}