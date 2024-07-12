package com.example.apiinstrumentos.service;

import com.example.apiinstrumentos.entities.Usuario;
import com.example.apiinstrumentos.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
@Transactional
@AllArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;


    @Override
    public Usuario autenticar(Usuario usuario) {
        Usuario usuarioBD = usuarioRepository.findByNombre(usuario.getNombre());

        if (usuarioBD == null) {
            return null;
        }

        String claveEncriptada = encryptPassword(usuario.getClave());

        if(!claveEncriptada.equals(usuarioBD.getClave())){
            return null;
        }

        return usuarioBD;
    }

    private String encryptPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1");

            byte[] messageDigest = md.digest(password.getBytes());

            BigInteger no = new BigInteger(1, messageDigest);
            String hashtext = no.toString(16);

            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }

            return hashtext;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

}
