package com.yourapp.app.models.entities.adapters;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor // Genera el constructor para inyectar JavaMailSender
public class AdapterJetmail implements AdapterEmail {

    // Bean de spring-boot-starter-mail
    private final JavaMailSender mailSender;

    @Override
    public void notificar(String mensaje, String contacto) {
        // 1. Creamos el objeto del mensaje
        SimpleMailMessage email = new SimpleMailMessage();

        // 2. Configuramos los datos (el remitente debe coincidir con tu cuenta de Jetmail)
        email.setTo(contacto);
        email.setSubject("⚠️ ALERTA: Stock Crítico de Producto");
        email.setText(mensaje);
        email.setFrom("notificaciones@tutienda.com");

        // 3. Enviamos el correo
        try {
            mailSender.send(email);
            System.out.println("✅ Correo enviado con éxito a: " + contacto);
        } catch (Exception e) {
            // Es vital capturar la excepción para que el sistema no se caiga
            // si el servidor de Jetmail falla momentáneamente
            System.err.println("❌ Error al enviar email vía Jetmail: " + e.getMessage());
        }
    }
}