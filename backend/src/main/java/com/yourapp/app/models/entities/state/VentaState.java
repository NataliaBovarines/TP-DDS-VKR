package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.Persistible;
import com.yourapp.app.models.entities.Venta;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity @Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_estado", discriminatorType = DiscriminatorType.STRING)
@Table(name = "estados_venta")
@NoArgsConstructor
public abstract class VentaState extends Persistible {

    @OneToOne
    @JoinColumn(name = "venta_id", unique = true)
    private Venta venta;


    public void cobrarTotal(Double monto, Venta.MetodoPago metodoPago) {
        throwUnsupportedError();
    }

    public void fiar(Double monto) {
        throwUnsupportedError();
    }

    public void reservarConSenia(Double senia) {
        throwUnsupportedError();
    }

    public void reservarConCredito(Double montoInicial) {
        throwUnsupportedError();
    }

    public void agregarPagoCredito(Double monto) {
        throwUnsupportedError();
    }

    public void cancelar(String motivo) {
        throwUnsupportedError();
    }

    public void rechazar(String motivo) {
        throwUnsupportedError();
    }

    public boolean puedeCambiarA(Class<? extends VentaState> nuevoEstado) {
        return false;
    }

    public Double getSaldoPendiente() {
        return 0.0;
    }

    private void throwUnsupportedError() {
        throw new UnsupportedOperationException("Operación no soportada en estado: " + this.getClass().getSimpleName());
    }
}