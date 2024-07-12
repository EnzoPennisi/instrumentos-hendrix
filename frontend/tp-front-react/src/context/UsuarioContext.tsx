import { ReactNode, createContext, useState } from "react";
import Usuario from "../entities/Usuario";
import UsuarioRol from "../entities/UsuarioRol";

interface UserContextType {
    usuario: UsuarioRol;
    logIn: (usuario: Usuario) => void;
    logOut: () => void;
}

//Crear el contexto
export const UserContext = createContext<UserContextType>({
    usuario: new UsuarioRol(),
    logIn: () => { },
    logOut: () => { }
})

//Crear provider
export function UsuarioContextProvider({ children }: { children: ReactNode }) {

    const jsonUsuario = localStorage.getItem('usuario');
    const usuarioInicial = jsonUsuario ? JSON.parse(jsonUsuario) as UsuarioRol : new UsuarioRol();
    const [usuario, setUsuario] = useState(usuarioInicial);

    const logIn = (usuario: Usuario) => {
        const usuarioDTO = new UsuarioRol();
        usuarioDTO.nombre = usuario.nombre;
        usuarioDTO.rol = usuario.rol;
        localStorage.setItem('usuario', JSON.stringify(usuarioDTO));
        setUsuario(usuarioDTO); // Actualiza el estado del usuario en el contexto
    }

    const logOut = () => {
        localStorage.removeItem('usuario'); // Elimina el usuario del localStorage
        setUsuario(new UsuarioRol()); // Resetea el estado del usuario en el contexto
    }

    return (
        <UserContext.Provider value={{ usuario, logIn, logOut }}>
            {children}
        </UserContext.Provider>
    )
}
