import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Usuario from "../entities/Usuario";
import { Button, Form } from "react-bootstrap";
import { checkUserPassword } from "../services/FuncionesApi";
import "../styles/Login.css"
import { useUsuario } from "../hooks/useUsuario";

export function Login() {

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario>(new Usuario());
    const [txtValidacion, setTxtValidacion] = useState<string>("");
    const { logIn } = useUsuario();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value: string = e.target.value;

        setUsuario({ ...usuario, [e.target.name]: value });
    }

    const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            login();
        }
    }


    const login = async () => {

        if (usuario?.nombre == undefined || usuario?.nombre === "") {
            setTxtValidacion("Ingrese el nombre de usuario");
            return;
        }

        if (usuario?.clave == undefined || usuario?.clave === "") {
            setTxtValidacion("Ingrese la clave");
            return;
        }

        const newUsuario = await checkUserPassword(usuario) as Usuario;

        if (!newUsuario) {
            setTxtValidacion("Usuario y/o clave incorrectas");
            return;
        }

        logIn(newUsuario);

        navigate('/home', { replace: true });
    }

    return (
        <>

            <Form className="login-form">
                <h2 className="d-flex justify-content-center">Login</h2>

                <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" name="nombre" placeholder="Ingrese el nombre" value={usuario?.nombre} onChange={handleInputChange} onKeyDown={handleKeyPressed} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" name="clave" placeholder="Ingrese la contraseña" value={usuario?.clave} onChange={handleInputChange} onKeyDown={handleKeyPressed} />
                </Form.Group>

                <div>
                    <p className="validation-text">{txtValidacion}</p>
                </div>

                <Button className="btn" onClick={login}>Ingresar</Button>
            </Form>
        </>

    )
}