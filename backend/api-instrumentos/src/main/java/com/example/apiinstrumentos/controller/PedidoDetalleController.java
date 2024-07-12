package com.example.apiinstrumentos.controller;

import com.example.apiinstrumentos.entities.PedidoDetalle;
import com.example.apiinstrumentos.service.PedidoDetalleService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidoDetalle")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class PedidoDetalleController {

    private final PedidoDetalleService pedidoDetalleService;

    @GetMapping("/all")
    public ResponseEntity<List<PedidoDetalle>> getAll() {
        try {
            return ResponseEntity.ok(pedidoDetalleService.findAll());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDetalle> getOne(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(pedidoDetalleService.findById(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/pedidos_por_instrumento")
    public ResponseEntity<List<List<Object>>> getPedidosPorInstrumentos() {
        try {
            return ResponseEntity.ok(pedidoDetalleService.getPedidosPorInstrumentos());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping
    public ResponseEntity<PedidoDetalle> save(@RequestBody PedidoDetalle pedidoDetalle) {
        try {
            return ResponseEntity.ok(pedidoDetalleService.save(pedidoDetalle));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedidoDetalle> update(@PathVariable Long id, @RequestBody PedidoDetalle pedidoDetalle) {
        try {
            return ResponseEntity.ok(pedidoDetalleService.update(id, pedidoDetalle));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(pedidoDetalleService.delete(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
