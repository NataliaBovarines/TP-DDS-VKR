package com.yourapp.app;

import com.yourapp.app.models.entities.Permiso;
import com.yourapp.app.models.entities.Rol;
import com.yourapp.app.models.entities.Usuario;
import com.yourapp.app.repositories.RolRepository;
import com.yourapp.app.repositories.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@SpringBootApplication
@EnableAsync
public class AppApplication {

    public static void main(String[] args) {
        SpringApplication.run(AppApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {
            // 1. Crear o recuperar el Rol ADMIN
            Rol rolAdmin = rolRepository.findByNombre("ADMIN")
                    .orElseGet(() -> {
                        Rol nuevoRol = new Rol();
                        nuevoRol.setNombre("ADMIN");
                        // Asigna todos los permisos definidos en tu Enum Permiso
                        nuevoRol.setPermisos(Arrays.asList(Permiso.values()));
                        System.out.println("🛠️ Creando Rol ADMIN con todos los permisos...");
                        return rolRepository.save(nuevoRol);
                    });

            // 2. Crear el Usuario admin si no existe
            // Usamos findByNombreDeUsuario basándonos en tu lógica de Service
            if (usuarioRepository.findByNombreDeUsuario("admin") == null) {
                Usuario admin = new Usuario();
                admin.setNombreDeUsuario("admin");
                // La contraseña será "admin", encriptada con BCrypt
                admin.setContrasenia(passwordEncoder.encode("admin"));
                admin.setRol(rolAdmin);
                admin.setFueEliminado(false);
                admin.setPrimerLogin(false);
                
                usuarioRepository.save(admin);
                System.out.println("✅ Usuario 'admin' inicializado con éxito (Password: admin).");
            } else {
                System.out.println("ℹ️ El usuario 'admin' ya existe en la base de datos.");
            }
        };
    }
}
