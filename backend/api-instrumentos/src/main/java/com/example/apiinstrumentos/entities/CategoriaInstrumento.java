package com.example.apiinstrumentos.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class CategoriaInstrumento implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String denominacion;


    /*
    Si quisiera hacer bidireccional se hace de la siguiente manera:

    @OneToMany(mappedBy = "categoriaInstrumento")
    @JsonBackReference  // Indica que este lado de la relación no será serializado por Jackson para evitar un bucle infinito.
    private List<Instrumento> instrumentos;

     */
}
