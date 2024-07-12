package com.example.apiinstrumentos.service;

import com.example.apiinstrumentos.entities.CategoriaInstrumento;

import java.util.List;

public interface CategoriaService {
    List<CategoriaInstrumento> findAll() throws Exception;
}
