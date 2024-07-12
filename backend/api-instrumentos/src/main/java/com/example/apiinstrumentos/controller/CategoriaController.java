package com.example.apiinstrumentos.controller;

import com.example.apiinstrumentos.entities.CategoriaInstrumento;
import com.example.apiinstrumentos.service.CategoriaService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categoria")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class CategoriaController {

    private final CategoriaService categoriaService;

    @GetMapping("/all")
    public ResponseEntity<List<CategoriaInstrumento>> getAll() {
        try {
            return ResponseEntity.ok(categoriaService.findAll());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
