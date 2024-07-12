import { Button } from "react-bootstrap";
import "../styles/NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useUsuario } from "../hooks/useUsuario";

export function NavBar() {

    const { usuario, logOut } = useUsuario();
    const navigate = useNavigate();

    const cerrarSesion = async () => {
        logOut();

        navigate('/login', {
            replace: true,
        });
    }

    return (
        <>
            <div className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#f0ddbd" }}>

                {
                    usuario.nombre &&
                    <p className="usuario">Usuario: {usuario?.nombre} - Rol: {usuario?.rol} </p>
                }

                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ paddingRight: '50px' }}>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {(!usuario.nombre || !usuario.rol) ? (
                            <li className="nav-item">
                                <Link to={'/login'} className="nav-link nav-link-login"> Login </Link>
                            </li>
                        ) : (
                            <li className="nav-item nav-link-login">
                                <Button onClick={cerrarSesion} style={{ backgroundColor: "#52493a", border: "#52493a", fontWeight: "600" }}> Cerrar Sesion </Button>
                            </li>
                        )}

                    </ul>
                </div>

            </div>
            <br />
        </>
    )
}
