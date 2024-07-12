package com.example.apiinstrumentos.repositories;

import com.example.apiinstrumentos.entities.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstrumentoRepository extends JpaRepository<Instrumento, Long> {

    //Filtrar instrumentos por categoria
    List<Instrumento> findByCategoriaInstrumento_Id(Long idCategoria);

    /*
    Misma consulta que la de arriba pero NATIVA SQL

    @Query(value = "SELECT * FROM instrumento WHERE id_categoria = :idCategoria", nativeQuery = true)
    List<Instrumento> findByCategoriaInstrumento_Id(@Param("idCategoria") Long idCategoria);
     */
}
