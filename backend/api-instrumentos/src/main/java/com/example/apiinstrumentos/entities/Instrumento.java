package com.example.apiinstrumentos.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Instrumento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String instrumento;
    private String marca;
    private String modelo;
    private String imagen;
    private double precio;
    private String costoEnvio;
    private int cantidadVendida;
    @Column(length = 1000)
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "idCategoria")
    private CategoriaInstrumento categoriaInstrumento;

    /*
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idCategoria")
    // @JsonManagedReference  // Indica que este lado de la relación será serializado por Jackson.
    private CategoriaInstrumento categoriaInstrumento;
    */

}
