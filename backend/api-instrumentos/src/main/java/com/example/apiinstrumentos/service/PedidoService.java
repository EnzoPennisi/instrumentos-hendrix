package com.example.apiinstrumentos.service;

import com.example.apiinstrumentos.entities.Pedido;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import java.time.LocalDate;
import java.util.List;

public interface PedidoService {

    List<Pedido> findAll() throws Exception;
    Pedido findById(Long id) throws Exception;
    Pedido save(Pedido instrumento) throws Exception;
    Pedido update(Long id, Pedido instrumento) throws Exception;
    boolean delete(Long id) throws Exception;

    //---Obtiene la cantidad de pedidos realizados en un determinado Mes y Año
    List<List<Object>> getPedidosPorMesAño() throws Exception;

    //---Generar Archivo Excel con los datos obtenidos de la consulta de la BD
    SXSSFWorkbook printExcelData(LocalDate fechaInicio, LocalDate fechaFin) throws Exception;
}
