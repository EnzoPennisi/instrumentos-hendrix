package com.example.apiinstrumentos.service;

import com.example.apiinstrumentos.entities.CategoriaInstrumento;
import com.example.apiinstrumentos.repositories.CategoriaRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoriaServiceImpl implements CategoriaService{

    private final CategoriaRepository categoriaRepository;

    @Override
    @Transactional
    public List<CategoriaInstrumento> findAll() throws Exception {
        try{
            return categoriaRepository.findAll();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
