package com.example.apiinstrumentos.repositories;

import com.example.apiinstrumentos.entities.CategoriaInstrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<CategoriaInstrumento, Long> {
}
