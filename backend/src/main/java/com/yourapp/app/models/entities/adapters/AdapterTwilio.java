package com.yourapp.app.models.entities.adapters;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import com.twilio.exception.ApiException;

@Service
public class AdapterTwilio implements AdapterWhatsapp {
    private static final Logger log = LoggerFactory.getLogger(AdapterTwilio.class);

    @Value("${twilio.sid}")
    private String accountSid;

    @Value("${twilio.token}")
    private String authToken;

    @Value("${twilio.phoneNumber}")
    private String fromNumber; // El número de Twilio (Sandbox)

    private boolean initialized = false;

    @PostConstruct
    public void init() {
        if (accountSid == null || accountSid.isBlank() || authToken == null || authToken.isBlank()) {
            log.warn("⚠️ Credenciales de Twilio no configuradas. El adaptador de WhatsApp quedará desactivado.");
            return;
        }

        try {
            Twilio.init(accountSid.trim(), authToken.trim());
            this.initialized = true;
            log.info("🚀 Twilio inicializado correctamente (SID: {})", mask(accountSid));
        } catch (Exception e) {
            this.initialized = false;
            log.error("❌ Error al inicializar el SDK de Twilio: {}", e.getMessage());
        }
    }

    @Override
    public void notificar(String mensaje, String contacto) {
        // 1. Verificación de inicialización
        if (!initialized) {
            log.warn("⚠️ Intento de envío abortado: AdapterTwilio no está inicializado.");
            return;
        }

        // 2. Validación de número de contacto
        if (contacto == null || contacto.isBlank()) {
            log.warn("⚠️ Intento de envío abortado: El número de contacto está vacío.");
            return;
        }

        try {
            // Limpieza y formateo del número de destino (E.164)
            String to = contacto.trim();
            if (!to.startsWith("+")) to = "+" + to;

            // Twilio Sandbox requiere el prefijo "whatsapp:"
            String formattedTo = to.startsWith("whatsapp:") ? to : "whatsapp:" + to;
            String formattedFrom = fromNumber.trim().startsWith("whatsapp:") ? fromNumber.trim() : "whatsapp:" + fromNumber.trim();

            // 3. Envío del mensaje
            Message message = Message.creator(
                    new PhoneNumber(formattedTo),
                    new PhoneNumber(formattedFrom),
                    mensaje
            ).create();

            log.info("✅ WhatsApp enviado con éxito a {} (SID: {})", contacto, message.getSid());

        } catch (ApiException e) {
            // Manejo específico de errores de Twilio (Sandbox, Auth, etc.)
            manejarErrorTwilio(e, contacto);
        } catch (Exception e) {
            // Cualquier otro error (Red, NullPointer, etc.)
            log.error("❌ Error inesperado al procesar envío a {}: {}", contacto, e.getMessage());
        }
        // El proceso sigue aquí, sin lanzar excepciones hacia arriba
    }

    private void manejarErrorTwilio(ApiException e, String contacto) {
        switch (e.getCode()) {
            case 20003:
                log.error("🚫 Error 401: Credenciales de Twilio incorrectas. Revisa tu SID y TOKEN.");
                break;
            case 63024:
                log.error("🚫 Sandbox Error: El número {} no está vinculado al Sandbox (debe enviar 'join ...').", contacto);
                break;
            case 21614:
                log.error("🚫 El número {} no es un número de WhatsApp válido o no tiene cobertura.", contacto);
                break;
            default:
                log.error("❌ Error de Twilio API [Código {}]: {}", e.getCode(), e.getMessage());
                break;
        }
    }

    private String mask(String s) {
        if (s == null || s.length() <= 6) return "****";
        return s.substring(0, 4) + "..." + s.substring(s.length() - 2);
    }
}