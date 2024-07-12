package com.example.apiinstrumentos.service;

import com.example.apiinstrumentos.dtos.PedidoInstrumentoDetalleDTO;
import com.example.apiinstrumentos.entities.Pedido;
import com.example.apiinstrumentos.repositories.PedidoRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Stream;

@Service
@Transactional
@AllArgsConstructor
public class PedidoServiceImpl implements PedidoService {

    private final PedidoRepository pedidoRepository;

    @Override
    public List<Pedido> findAll() throws Exception {
        try {
            return pedidoRepository.findAll();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Pedido findById(Long id) throws Exception {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No existe un pedido con ese Id"));
    }

    @Override
    public Pedido save(Pedido pedido) throws Exception {
        try {

            pedido.setFechaPedido(LocalDate.now());

            return pedidoRepository.save(pedido);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Pedido update(Long id, Pedido pedido) throws Exception {
        try {
            if (!pedidoRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un pedido con ese Id");
            }

            pedido.setId(id);
            return pedidoRepository.save(pedido);

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public boolean delete(Long id) throws Exception {
        try {
            if (!pedidoRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un pedido con ese Id");
            }

            pedidoRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<List<Object>> getPedidosPorMesAño() throws Exception {
        try {
            var results = pedidoRepository.getPedidosPorMesAño();

            List<List<Object>> pedidos = new ArrayList<>();

            results.forEach(result ->
                    pedidos.add( Arrays.asList( result[0] + "/" + result[1], result[2]))
            );

            return pedidos;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }



    @Override
    public SXSSFWorkbook printExcelData(LocalDate fechaInicio, LocalDate fechaFin) throws Exception {
        try {
            //Crea el libro
            SXSSFWorkbook libro = new SXSSFWorkbook(50); //importante !! el 50 indica el tamaño de paginación

            // Se crea una hoja dentro del libro
            SXSSFSheet hoja = (SXSSFSheet) libro.createSheet();

            //estilo
            XSSFFont font = (XSSFFont) libro.createFont();
            font.setBold(true);
            XSSFCellStyle style = (XSSFCellStyle) libro.createCellStyle();
            style.setFont(font);

            // Se crea una fila para el encabezado dentro de la hoja
            SXSSFRow encabezadoRow = (SXSSFRow) hoja.createRow(0);

            String[] encabezado = {"Fecha Pedido", "Instrumento", "Marca", "Modelo", "Cantidad", "Precio", "Subtotal"};

            // Se crean las celdas del encabezado dentro de la fila del encabezado
            int nroColumna = 0;
            for (String titulo : encabezado) {
                SXSSFCell encabezadoCell = (SXSSFCell) encabezadoRow.createCell(nroColumna++);
                encabezadoCell.setCellValue(titulo);
                encabezadoCell.setCellStyle(style);
            }

            //Lista con los datos filtrados correctamente
            List<PedidoInstrumentoDetalleDTO> pedidoInstrumentoDetalleDTOS = filtrarPedidoPorFecha(fechaInicio, fechaFin);

            // Validar que la lista contenga datos
            if (pedidoInstrumentoDetalleDTOS == null) {
                throw new RuntimeException("No se encontraron datos para generar el reporte");
            }

            // Crear las filas de datos
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            int nroFila = 1;
            for (PedidoInstrumentoDetalleDTO instrumento : pedidoInstrumentoDetalleDTOS) {
                SXSSFRow dataRow = (SXSSFRow) hoja.createRow(nroFila++);
                dataRow.createCell(0).setCellValue(instrumento.getFechaPedido().format(formatter));
                dataRow.createCell(1).setCellValue(instrumento.getNombreInstrumento());
                dataRow.createCell(2).setCellValue(instrumento.getMarca());
                dataRow.createCell(3).setCellValue(instrumento.getModelo());
                dataRow.createCell(4).setCellValue(instrumento.getCantidadPedidos());
                dataRow.createCell(5).setCellValue(instrumento.getPrecio());
                dataRow.createCell(6).setCellValue(instrumento.getCantidadPedidos() * instrumento.getPrecio());
            }

            return libro;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    private List<PedidoInstrumentoDetalleDTO> filtrarPedidoPorFecha(LocalDate fechaInicio, LocalDate fechaFin){

        //Se obtiene los datos desde la BD
        var dbData = pedidoRepository.getInstrumentoPorFechaPedido();

        // Filtrar los datos por las fechas proporcionadas
        Stream<PedidoInstrumentoDetalleDTO> stream = dbData.stream();

        if (fechaInicio != null) {
            stream = stream.filter(data -> !data.getFechaPedido().isBefore(fechaInicio));
        }

        if (fechaFin != null) {
            stream = stream.filter(data -> !data.getFechaPedido().isAfter(fechaFin));
        }

         return stream.toList();
    }


}
