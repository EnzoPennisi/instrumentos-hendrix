package com.example.apiinstrumentos.dtos;

import com.example.apiinstrumentos.entities.Roles;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsuarioShortDTO {
    private String nombre;
    private Roles rol;
}
