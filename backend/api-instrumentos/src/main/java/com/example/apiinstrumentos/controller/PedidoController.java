package com.example.apiinstrumentos.controller;

import com.example.apiinstrumentos.controller.mercadoPago.MercadoPagoController;
import com.example.apiinstrumentos.controller.mercadoPago.PreferenceMP;
import com.example.apiinstrumentos.entities.Pedido;
import com.example.apiinstrumentos.service.PedidoService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/pedido")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoService pedidoService;

    @GetMapping("/all")
    public ResponseEntity<List<Pedido>> getAll() {
        try {
            return ResponseEntity.ok(pedidoService.findAll());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> getOne(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(pedidoService.findById(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/pedidos_por_fecha")
    public ResponseEntity<List<List<Object>>> getPedidosPorMesAño() {
        try {
            return ResponseEntity.ok(pedidoService.getPedidosPorMesAño());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/download_excel_pedido")
    public ResponseEntity<byte[]> downloadExcelPedido(
            @RequestParam(value = "fechaInicio", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam(value = "fechaFin", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {

        ByteArrayOutputStream outputStream = null;

        try {
            var libroExcel = pedidoService.printExcelData(fechaInicio, fechaFin);

            // Escribir el libro de trabajo en un flujo de bytes
            outputStream = new ByteArrayOutputStream();
            libroExcel.write(outputStream);

            //Colocar el header de la solicitud
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setContentDispositionFormData("attachment", "datos.xlsx");
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);

        } catch (Exception e) {
            System.err.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException e) {
                    System.err.println(e.getMessage());
                }
            }
        }
    }


    @PostMapping
    public ResponseEntity<Pedido> save(@RequestBody Pedido pedido) {
        try {
            return ResponseEntity.ok(pedidoService.save(pedido));
        } catch (Exception e) {
            throw new RuntimeException(e);

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pedido> update(@PathVariable Long id, @RequestBody Pedido pedido) {
        try {
            return ResponseEntity.ok(pedidoService.update(id, pedido));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(pedidoService.delete(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //----- MercadoPago Pedido

    @PostMapping("/create_preference_mp")
    public PreferenceMP crearPreferenciaMercadoPago(@RequestBody Pedido pedido) {
        var controllerMercadoPago = new MercadoPagoController();

        return controllerMercadoPago.getPreferenciaIdMercadoPago(pedido);
    }

}
