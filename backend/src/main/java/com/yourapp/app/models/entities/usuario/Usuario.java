package com.yourapp.app.models.entities.usuario;

import com.google.common.hash.Hashing;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.nio.charset.StandardCharsets;

@Entity
@Getter @Setter
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter @Setter
    private Long id;

    @Column(name = "nombreDeUsuario")
    @Getter @Setter
    private String nombreDeUsuario;


    private String contrasenia; // La guardamos plana ¿¿¿???

    @ManyToOne
    @JoinColumn(name = "rol_id", referencedColumnName = "id")
    @Getter @Setter
    private Rol rol;


    @Embedded
    @Getter @Setter
    private PenalizacionFalloContrasenia penalizacion;

    @Transient
    @Getter @Setter
    private Integer tiempoPenalizacion = 20;

    @javax.persistence.Enumerated(javax.persistence.EnumType.STRING)
    @javax.persistence.Column(name = "estado")
    @Getter @Setter
    private Estado estado = Estado.ACTIVO;


    public Usuario(String nombre, String contrasenia) {
        this();
        this.nombreDeUsuario = nombreDeUsuario;
        this.contrasenia = contrasenia;
    }

    public Usuario() {
        this.penalizacion = new PenalizacionFalloContrasenia();
    }

    public void penalizar(Integer tiempoPenalizacion) {
        penalizacion.penalizar(tiempoPenalizacion);
    }

    public void penalizar() {
        penalizacion.penalizar(tiempoPenalizacion);
    }

    public boolean estaPenalizado() {
        return penalizacion.estaPenalizado();
    }

    public void setContrasenia(String password2) {
        String sha256hex = Hashing.sha256()
                .hashString(password2, StandardCharsets.UTF_8)
                .toString();

        this.contrasenia = sha256hex;
    }
}
