package com.example.apiinstrumentos.service;

import com.example.apiinstrumentos.entities.Instrumento;
import com.example.apiinstrumentos.repositories.InstrumentoRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@AllArgsConstructor
public class InstrumentoServiceImpl implements InstrumentoService {

    private final InstrumentoRepository instrumentoRepository;

    @Override
    public List<Instrumento> findAll() throws Exception {
        try {
            return instrumentoRepository.findAll();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Instrumento findById(Long id) {
        return instrumentoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No existe un instruento con ese Id"));
    }

    @Override
    public Instrumento save(Instrumento instrumento) throws Exception {
        try {
            return instrumentoRepository.save(instrumento);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Instrumento update(Long id, Instrumento instrumento) throws Exception {

        try {

            if (!instrumentoRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un instrumento con ese Id");
            }

            instrumento.setId(id);
            return instrumentoRepository.save(instrumento);

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public boolean delete(Long id) throws Exception {
        try {

            if (!instrumentoRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un instrumento con ese Id");
            }

            instrumentoRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    //Filtra instrumentos por categoria
    @Override
    public List<Instrumento> findByCategoriaInstrumento_Id(Long idCategoria) throws Exception {
        try {
            return instrumentoRepository.findByCategoriaInstrumento_Id(idCategoria);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    //Genera archivo PDF
    @Override
    public void printPDF(Long id, ByteArrayOutputStream outputStream) throws Exception {
        try {

            //Declarar fuentes personalizadas para el PDF
            final Font fTexto = new Font(Font.FontFamily.UNDEFINED, 10, Font.NORMAL);
            final Font fTitulo = new Font(Font.FontFamily.UNDEFINED, 15, Font.BOLD);
            final Font fPrecio = new Font(Font.FontFamily.UNDEFINED, 35, Font.NORMAL);
            final Font fCantVendida = new Font(Font.FontFamily.UNDEFINED, 8, Font.NORMAL, new BaseColor(128, 128, 128));
            final Font fEnvioGratis = new Font(Font.FontFamily.UNDEFINED, 10, Font.NORMAL, new BaseColor(121, 205, 132));
            final Font fEnvioCosto = new Font(Font.FontFamily.UNDEFINED, 10, Font.NORMAL, new BaseColor(255, 150, 80));

            //Obtener instrumento desde la BD
            var instrumento = instrumentoRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("No existe un instruento con ese Id"));

            Document document = new Document(PageSize.A4, 30, 30, 0, 30);//float marginLeft, float marginRight, float marginTop, float marginBottom
            addMetaData(document);

            // Abrir el documento
            PdfWriter.getInstance(document, outputStream); // Code 2
            document.open();

            // Tabla con 2 columnas
            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);

            // Ajustar los anchos de las columnas
            float[] columnWidths = {65f, 35f};
            table.setWidths(columnWidths);

            // Columna izquierda
            PdfPCell celda = new PdfPCell();
            celda.setBorder(Rectangle.NO_BORDER);

            Image img = Image.getInstance("./imagenes/" + instrumento.getImagen());
            img.scaleAbsolute(200f, 100f);
            img.setAlignment(Image.ALIGN_CENTER);
            celda.addElement(img);
            addEmptyLine(celda, 2);

            Paragraph subtituloDescripcion = new Paragraph("Descripcion: ", fTexto);
            celda.addElement(subtituloDescripcion);
            addEmptyLine(celda, 1);

            Paragraph instDescripcion = new Paragraph(instrumento.getDescripcion(), fTexto);
            celda.addElement(instDescripcion);

            table.addCell(celda); //Agregar celda a la tabla

            //Celda derecha
            celda = new PdfPCell();
            celda.setBorder(Rectangle.LEFT);

            Paragraph cantidadVendida = new Paragraph(instrumento.getCantidadVendida() + " vendidos", fCantVendida);
            celda.addElement(cantidadVendida);

            Paragraph titulo = new Paragraph(instrumento.getInstrumento(), fTitulo);
            celda.addElement(titulo);
            addEmptyLine(celda, 1);

            Paragraph precio = new Paragraph("$" + instrumento.getPrecio(), fPrecio);
            celda.addElement(precio);
            addEmptyLine(celda, 2);

            Paragraph marca = new Paragraph("Marca: " + instrumento.getMarca(), fTexto);
            celda.addElement(marca);

            Paragraph modelo = new Paragraph("Modelo: " + instrumento.getModelo(), fTexto);
            celda.addElement(modelo);
            addEmptyLine(celda, 2);

            Paragraph subTituloCosto = new Paragraph("Costo Envio: ", fTexto);
            celda.addElement(subTituloCosto);

            Paragraph costoEnvio;
            if ("G".equals(instrumento.getCostoEnvio())) {
                costoEnvio = new Paragraph("Envío gratis a todo el país", fEnvioGratis);
            } else {
                costoEnvio = new Paragraph("Costo de Envío interior de Argentina: $" + instrumento.getCostoEnvio(), fEnvioCosto);
            }
            celda.addElement(costoEnvio);

            table.addCell(celda); //Agregar celda a la tabla

            // Agregar la tabla al documento y cerrarlo
            document.add(table);
            document.close();

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    private void addMetaData(Document document) {
        document.addTitle("Detalles del Instrumento");
        document.addSubject("Ejemplo PDF");
        document.addKeywords("PDF");
        document.addAuthor("Enzo Pennisi");
        document.addCreator("Enzo Pennisi");
    }

    private void addEmptyLine(PdfPCell celda, int cantEspacios) {
        try {
            Paragraph espacio = new Paragraph();
            for (int i = 0; i < cantEspacios; i++) {
                espacio.add(new Paragraph(" "));
            }
            celda.addElement(espacio);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
