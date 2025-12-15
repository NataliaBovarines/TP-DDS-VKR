package com.yourapp.app.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yourapp.app.exceptions.BadRequestException;
import com.yourapp.app.exceptions.ConflictException;

@Entity
@Table(name = "pagos_credito")
@Getter
@Setter
@NoArgsConstructor
public class PagoDeCredito extends Persistible {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venta_id", nullable = false)
    @JsonIgnore
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
    public void procesarPagoInicial() {
        if (cliente == null || venta == null) throw new BadRequestException("No se puede procesar pago: falta cliente o venta");
        
        venta.setMontoPagado(monto);

        cliente.aumentarDeuda(venta.getTotal() - monto);
        
        System.out.println(String.format(
            "Pago #%d procesado: $%.2f - Cliente: %s - Deuda actual: $%.2f", numeroPago, monto, cliente.getNombre(), cliente.getDeuda()
        ));
    }

    public void procesarPago() {
        if (cliente == null || venta == null) throw new BadRequestException("No se puede procesar pago: falta cliente o venta");
        
        double saldoPendiente = venta.getTotal() - venta.getMontoPagado();

        if (monto > saldoPendiente) throw new BadRequestException(String.format("El pago $%.2f excede el saldo pendiente $%.2f", monto, saldoPendiente));
        
        venta.setMontoPagado(venta.getMontoPagado() + monto);

        cliente.disminuirDeuda(monto);
        
        System.out.println(String.format(
            "Pago #%d procesado: $%.2f - Cliente: %s - Deuda actual: $%.2f", numeroPago, monto, cliente.getNombre(), cliente.getDeuda()
        ));
    }

    public void revertirPago() {
        if (cliente == null || venta == null) throw new ConflictException("No se puede revertir pago incompleto");
    
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