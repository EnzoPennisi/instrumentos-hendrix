package com.example.apiinstrumentos.controller;

import com.example.apiinstrumentos.dtos.UsuarioShortDTO;
import com.example.apiinstrumentos.entities.Usuario;
import com.example.apiinstrumentos.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Usuario authenticatedUser = usuarioService.autenticar(usuario);

        if (authenticatedUser != null) {
            UsuarioShortDTO usuarioDTO = new UsuarioShortDTO();
            usuarioDTO.setNombre(authenticatedUser.getNombre());
            usuarioDTO.setRol(authenticatedUser.getRol());
            return ResponseEntity.ok(usuarioDTO);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario y/o clave incorrectas");
        }
    }
}
