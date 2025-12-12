package com.yourapp.app.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "pagos_credito")
@Getter
@Setter
@NoArgsConstructor
public class PagoDeCredito extends Persistible {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venta_id", nullable = false)
    private Venta venta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @Column(nullable = false)
    private Double monto;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @Column(name = "numero_pago")
    private Integer numeroPago;

    @Column(name = "es_pago_inicial")
    private Boolean esPagoInicial = false;

    // Lógica de negocio
    public void procesarPago() {
        if (cliente == null || venta == null) {
            throw new IllegalStateException("Pago incompleto: falta cliente o venta");
        }

        cliente.aumentarDeuda(monto);

        venta.setMontoPagado(venta.getMontoPagado() + monto);

        System.out.println(String.format(
            "Pago #%d registrado: $%.2f - Cliente: %s - Deuda actual: $%.2f",
            numeroPago, monto, cliente.getNombre(), cliente.getDeuda()
        ));
    }

    public void revertirPago() {
        if (cliente == null || venta == null) {
            throw new IllegalStateException("No se puede revertir pago incompleto");
        }

        // Disminuir deuda del cliente
        cliente.disminuirDeuda(monto);

        // Actualizar monto pagado en venta
        venta.setMontoPagado(venta.getMontoPagado() - monto);

        System.out.println(String.format(
            "Pago #%d revertido: $%.2f - Cliente: %s",
            numeroPago, monto, cliente.getNombre()
        ));
    }
}