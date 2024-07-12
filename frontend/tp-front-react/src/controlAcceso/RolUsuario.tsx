import { Navigate, Outlet } from 'react-router-dom';
import { useUsuario } from '../hooks/useUsuario';

export function RolUsuario() {

    const { usuario } = useUsuario();

    console.log(JSON.stringify(usuario))

    //si esta logueado y es administrador lo dejo ingresar si no
    if (usuario.nombre && usuario.rol === "ADMIN") {
        return <Outlet />;
    } else if (usuario.nombre) {
        return <Navigate replace to='/grilla' />;
    } else {
        return <Navigate replace to='/login' />;
    }
}

