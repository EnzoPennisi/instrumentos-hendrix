package com.example.apiinstrumentos.controller;

import com.example.apiinstrumentos.entities.Instrumento;
import com.example.apiinstrumentos.service.InstrumentoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/instrumento")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class InstrumentoController {

    private final InstrumentoService instrumentoService;

    @GetMapping("/all")
    public ResponseEntity<List<Instrumento>> getAll() {
        try {
            return ResponseEntity.ok(instrumentoService.findAll());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instrumento> getOne(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(instrumentoService.findById(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Obtener los instrumentos filtrados por categoria
    @GetMapping("/categoria/{idCategoria}")
    public ResponseEntity<List<Instrumento>> getByCategoriaId(@PathVariable Long idCategoria) {
        try {
            return ResponseEntity.ok(instrumentoService.findByCategoriaInstrumento_Id(idCategoria));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Generar un reporte pdf con los detalles de un instrumento
    @GetMapping("/download_pdf_instrumento/{id}")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) {

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            // Crear un nuevo documento
            instrumentoService.printPDF(id, outputStream);

            // Establecer las cabeceras de la respuesta
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/pdf"));
            headers.setContentDispositionFormData("attachment", "documento.pdf");
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            // Devolver el archivo PDF como parte de la respuesta HTTP
            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);

        } catch (Exception e) {
            System.err.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Instrumento> save(@RequestBody Instrumento instrumento) {
        try {
            return ResponseEntity.ok(instrumentoService.save(instrumento));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Instrumento> update(@PathVariable Long id, @RequestBody Instrumento instrumento) {
        try {
            return ResponseEntity.ok(instrumentoService.update(id, instrumento));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(instrumentoService.delete(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
