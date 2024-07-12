package com.example.apiinstrumentos.repositories;

import com.example.apiinstrumentos.entities.PedidoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoDetalleRepository extends JpaRepository<PedidoDetalle, Long> {

    // El array tiene la forma: [nombreInstrumento, cantidadPedidos]
    @Query(
            value = "SELECT i.instrumento, COUNT(pd.id_pedido) " +
                    "FROM pedido_detalle pd " +
                    "JOIN instrumento i ON pd.id_instrumento = i.id " +
                    "GROUP BY i.instrumento",
            nativeQuery = true
    )
    List<Object[]> findPedidosPorInstrumento();


}
