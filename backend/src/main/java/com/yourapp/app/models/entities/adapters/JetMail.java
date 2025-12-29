package com.yourapp.app.models.entities.adapters;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Primary;
import lombok.RequiredArgsConstructor;

@Component
@Primary
@RequiredArgsConstructor
public class JetMail implements AdapterEmail {
    private final JavaMailSender mailSender;

    @Override
    public void notificar(String mensaje, String contacto) {
        try {
            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(contacto);
            email.setSubject("Notificación desde tu aplicación");
            email.setText(mensaje);
            // El from puede configurarse en application.properties si es necesario
            mailSender.send(email);
            System.out.println("Correo enviado a: " + contacto);
        } catch (Exception e) {
            System.err.println("Error en JetMail.notificar: " + e.getMessage());
        }
    }
}
