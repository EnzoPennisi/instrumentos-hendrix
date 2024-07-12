package com.example.apiinstrumentos.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoInstrumentoDetalleDTO {
    private LocalDate fechaPedido;
    private String nombreInstrumento;
    private String marca;
    private String modelo;
    private Long cantidadPedidos;
    private Double precio;
}
