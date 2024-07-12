package com.example.apiinstrumentos.service;

import com.example.apiinstrumentos.entities.PedidoDetalle;

import java.util.List;

public interface PedidoDetalleService {

    List<PedidoDetalle> findAll() throws Exception;
    PedidoDetalle findById(Long id) throws Exception;
    PedidoDetalle save(PedidoDetalle instrumento) throws Exception;
    PedidoDetalle update(Long id, PedidoDetalle instrumento) throws Exception;
    boolean delete(Long id) throws Exception;

    //---- Obtener nombre instrumento y cantidad vendida de ese instrumento
    List<List<Object>> getPedidosPorInstrumentos() throws Exception;
}
