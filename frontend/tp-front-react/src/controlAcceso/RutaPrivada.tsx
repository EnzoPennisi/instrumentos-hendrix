import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUsuario } from '../hooks/useUsuario';


export const RutaPrivada = ({ children }: { children: ReactNode }) => {

    const { usuario } = useUsuario();

    console.log(JSON.stringify(usuario))

    return usuario.nombre ? children : <Navigate to='/login' />;
};