package com.example.apiinstrumentos.service;

import com.example.apiinstrumentos.entities.Instrumento;

import java.io.ByteArrayOutputStream;
import java.util.List;

public interface InstrumentoService {
    //CRUD
    List<Instrumento> findAll() throws Exception;
    Instrumento findById(Long id) throws Exception;
    Instrumento save(Instrumento instrumento) throws Exception;
    Instrumento update(Long id, Instrumento instrumento) throws Exception;
    boolean delete(Long id) throws Exception;

    //Para filtrar los intrumentos que pertenecen a una categoria en especifico
    List<Instrumento> findByCategoriaInstrumento_Id(Long idCategoria) throws Exception;

    //Genera un archivo PDF con los datos de un instrumento que recibe por parametro como id;
    void printPDF(Long id, ByteArrayOutputStream outputStream) throws Exception;
}
