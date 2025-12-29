package com.yourapp.app.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "medios_de_notificacion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedioNotificacion extends Persistible {
    private String nombre;
}

