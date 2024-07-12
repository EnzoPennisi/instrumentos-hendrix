package com.example.apiinstrumentos.repositories;

import com.example.apiinstrumentos.dtos.PedidoInstrumentoDetalleDTO;
import com.example.apiinstrumentos.entities.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    // El array tiene la forma: [año, mes, total]
    @Query(
            value = "SELECT YEAR(fecha_pedido), MONTH(fecha_pedido), COUNT(*) " +
                    "FROM pedido " +
                    "GROUP BY YEAR(fecha_pedido), MONTH(fecha_pedido) " +
                    "ORDER BY YEAR(fecha_pedido), MONTH(fecha_pedido)",
            nativeQuery = true
    )
    List<Object[]> getPedidosPorMesAño();

    //Obtener la cantidad de instrumentos vendidos en determinada fecha
    //El array tiene la forma: [fecha, nombreInstrumento, marca, modelo, cantidadPedidos, precio]
    @Query(
            value = "SELECT new com.example.apiinstrumentos.dtos.PedidoInstrumentoDetalleDTO(p.fechaPedido, i.instrumento, i.marca, i.modelo, SUM(pd.cantidad), i.precio) " +
                    "FROM Pedido p " +
                    "JOIN p.pedidoDetalles pd " +
                    "JOIN pd.instrumento i " +
                    "GROUP BY p.fechaPedido, i.instrumento, i.marca, i.modelo, i.precio " +
                    "ORDER BY p.fechaPedido ASC"
    )
    List<PedidoInstrumentoDetalleDTO> getInstrumentoPorFechaPedido();
}
