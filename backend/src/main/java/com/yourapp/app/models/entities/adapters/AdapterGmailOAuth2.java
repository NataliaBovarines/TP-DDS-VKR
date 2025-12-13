package com.yourapp.app.models.entities.adapters;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import com.yourapp.app.services.OAuth2TokenService;

@Service
public class AdapterGmailOAuth2 {

    private final JavaMailSender mailSender;
    private final OAuth2TokenService tokenService;

    public AdapterGmailOAuth2(JavaMailSender mailSender, OAuth2TokenService tokenService) {
        this.mailSender = mailSender;
        this.tokenService = tokenService;
    }

    public void notificar(String to, String subject, String body) {
        String accessToken = tokenService.getAccessToken();

        if (!(mailSender instanceof JavaMailSenderImpl)) {
            throw new IllegalStateException("Se requiere JavaMailSenderImpl para setear XOAUTH2");
        }

        JavaMailSenderImpl impl = (JavaMailSenderImpl) mailSender;
        // asignar token como "password" y asegurar XOAUTH2 como mecanismo
        impl.getJavaMailProperties().put("mail.smtp.auth.mechanisms", "XOAUTH2");
        impl.setPassword(accessToken);

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject(subject);
        msg.setText(body);
        msg.setFrom(impl.getUsername());

        impl.send(msg);
    }
}