package com.yourapp.app.services;


import java.time.Instant;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OAuth2TokenService {

    @Value("${app.oauth.client-id}")
    private String clientId;

    @Value("${app.oauth.client-secret}")
    private String clientSecret;

    @Value("${app.oauth.refresh-token}")
    private String refreshToken;

    private String cachedAccessToken;
    private Instant expiresAt = Instant.EPOCH;

    private final RestTemplate rest = new RestTemplate();

    public synchronized String getAccessToken() {
        if (cachedAccessToken != null && Instant.now().isBefore(expiresAt.minusSeconds(30))) {
            return cachedAccessToken;
        }

        String url = "https://oauth2.googleapis.com/token";
        var body = Map.of(
                "client_id", clientId,
                "client_secret", clientSecret,
                "refresh_token", refreshToken,
                "grant_type", "refresh_token"
        );

        @SuppressWarnings("unchecked")
        Map<String, Object> resp = rest.postForObject(url, body, Map.class);
        if (resp == null || resp.get("access_token") == null) {
            throw new IllegalStateException("No access token from Google OAuth2 endpoint");
        }

        cachedAccessToken = (String) resp.get("access_token");
        Number expiresIn = (Number) resp.getOrDefault("expires_in", 3600);
        expiresAt = Instant.now().plusSeconds(expiresIn.longValue());
        return cachedAccessToken;
    }
}
