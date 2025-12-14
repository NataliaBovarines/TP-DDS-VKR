package com.yourapp.app.models.entities.adapters;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.core.MPRequestOptions;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;

public class AdapterQrMercadoPago implements AdapterQr {

    @Value("${mercadopago.access-token}")
    private String accessToken;

    @Value("${mercadopago.api-url}")
    private String apiUrl;

    @Override
    public Map<String, String> crearPago(Double monto, String descripcion, String referenciaId, Map<String, String> datosAdicionales) {
        try {
            // Configurar el access token
            MercadoPagoConfig.setAccessToken(accessToken);

            // Crear el cliente de preferencias
            PreferenceClient client = new PreferenceClient();

            // Crear el item de la preferencia
            PreferenceItemRequest item = PreferenceItemRequest.builder()
                    .title(descripcion)
                    .quantity(1)
                    .unitPrice(new BigDecimal(monto))
                    .build();

            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(item);

            // Crear la preferencia de pago
            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .externalReference(referenciaId)
                    .statementDescriptor("VKR VENTAS")
                    .build();

            // Crear la preferencia en MercadoPago
            Preference preference = client.create(preferenceRequest);

            // Obtener información de la preferencia
            String preferenceId = preference.getId();
            String initPoint = preference.getInitPoint();

            // Obtener el código QR (el QR se puede generar a partir del init_point)
            String qrCode = "";
            qrCode = initPoint;

            Map<String, String> resultado = new HashMap<>();
            resultado.put("idPagoExterno", preferenceId);
            resultado.put("qrCode", qrCode);

            return resultado;
        } catch (MPException | MPApiException e) {
            System.err.println("Error al crear pago en MercadoPago: " + e.getMessage());
            throw new RuntimeException("Error al crear pago en MercadoPago: " + e.getMessage(), e);
        }
    }

    @Override
    public boolean cancelarPago(String idPagoExterno) {
        if (accessToken == null || accessToken.isEmpty()) {
            return true; // En modo demo, siempre retorna éxito
        }
    //Me tiraba error el compilador si no ponía el try-catch
        try {
            MercadoPagoConfig.setAccessToken(accessToken);
            PreferenceClient client = new PreferenceClient();

            // Las preferencias no se pueden cancelar directamente
            // Se pueden actualizar para deshabilitarlas o simplemente dejar que expiren
            // Por ahora retornamos true
            return true;

        } catch (Exception e) {
            System.err.println("Error al cancelar pago: " + e.getMessage());
            return false;
        }
    }

        @Override
        public String verificarEstadoPago(String idPagoExterno) {
            if (accessToken == null || accessToken.isEmpty()) {
                // Modo demo: siempre retorna PENDIENTE
                System.out.println("[MODO DEMO] Verificando estado del pago: " + idPagoExterno);
                System.out.println("   Estado simulado: PENDIENTE");
                return "PENDIENTE";
            }

            // Modo producción: consultar estado real usando el SDK
            try {
                MercadoPagoConfig.setAccessToken(accessToken);
                PreferenceClient client = new PreferenceClient();

                // Obtener la preferencia
                Preference preference = client.get(idPagoExterno);

                // La preferencia no tiene estado directamente, necesitamos buscar pagos asociados
                // Por ahora retornamos PENDIENTE
                // En producción, deberíamos consultar los pagos asociados a esta preferencia
                return "PENDIENTE";

            }   catch (MPException | MPApiException e) {
                System.err.println("Error al verificar estado del pago: " + e.getMessage());
                return "PENDIENTE";
            }
        }
            public void generarQr() {
        
        }

    @Override
    public String getNombreProveedor() {
        return "MERCADOPAGO";
    }
}
