package com.yourapp.app.config;

import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.yourapp.app.exceptions.UnauthorizedException;
import com.yourapp.app.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = request.getServletPath();
        String method = request.getMethod();

        // 1. MANEJO DE PETICIONES OPTIONS (CORS PRE-FLIGHT)
        if ("OPTIONS".equalsIgnoreCase(method)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. RUTAS PÚBLICAS (Se ignora validación de token)
        // Se excluye explícitamente "/auth/me" para que SÍ sea validado
        if (
                (path.startsWith("/auth/") && !path.equals("/auth/me"))
                        || path.startsWith("/v3/api-docs")
                        || path.startsWith("/swagger-ui")
                        || path.equals("/swagger-ui.html")
                        || path.startsWith("/swagger-resources")
                        || path.startsWith("/webjars")
                        || path.equals("/favicon.ico")
        ) {
            filterChain.doFilter(request, response);
            return;
        }

        // 3. VALIDACIÓN DEL HEADER AUTHORIZATION
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Se requiere token de autenticación.");
        }

        try {
            String token = authHeader.substring(7);

            // 4. REGLA DE PRIMER LOGIN
            Boolean primerLogin = jwtService.extractPrimerLogin(token);
            if (Boolean.TRUE.equals(primerLogin)
                    && !path.equals("/auth/cambiar-contrasenia")
                    && !path.equals("/auth/recuperar-contrasenia")
                    && !path.equals("/auth/resetear-contrasenia")
            ) {
                throw new UnauthorizedException("Debe cambiar su contraseña inicial antes de acceder a otros recursos.");
            }

            // 5. AUTENTICACIÓN EN SPRING SECURITY
            String username = jwtService.extractUsername(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (!jwtService.isTokenValid(token, userDetails)) {
                    throw new UnauthorizedException("Token de autenticación inválido o expirado.");
                }

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

            filterChain.doFilter(request, response);
        } catch (UnauthorizedException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new UnauthorizedException("Token de autenticación inválido o corrupto.");
        }
    }
}