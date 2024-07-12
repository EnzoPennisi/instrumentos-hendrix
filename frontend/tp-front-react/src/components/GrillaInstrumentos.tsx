import { useInstrumento } from "../hooks/useInstrumento"
import { useCategoria } from "../hooks/useCategoria";

import Instrumento from "../entities/InstrumentoEntity";
import Categoria from "../entities/CategoriaEntity"
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import { ModalReporteExcel } from "./ModalReporteExcel";
import { useUsuario } from "../hooks/useUsuario";
import { useNavigate } from "react-router-dom";



export function GrillaInstrumentos() {

    const { instrumentos, eliminarInstrumento, setIdCategoria } = useInstrumento();

    return (
        <>
            <OpcionesGrilla setIdCategoria={setIdCategoria} />
            <TablaInstrumentos instrumentos={instrumentos} eliminarInstrumento={eliminarInstrumento} />
            <ReporteExcel />
        </>
    )
}

function ReporteExcel() {

    const [showModal, setShowModal] = useState<boolean>(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <ModalReporteExcel
                showModal={showModal}
                handleClose={handleCloseModal}
            />

            <div className="mb-4 mt-4 d-flex flex-row" style={{ justifyContent: "center" }}>
                <Button onClick={handleOpenModal} style={{ backgroundColor: "#7c8569", border: "#7c8569", fontWeight: "600" }}>Generar Reporte Excel</Button>
            </div>


        </>
    )
}

function OpcionesGrilla({ setIdCategoria }: { setIdCategoria: (id: number) => void }) {

    const navigate = useNavigate();
    const { categorias } = useCategoria();



    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        setIdCategoria(parseInt(selectedId));
    };

    return (
        <Container>


            <Row className="justify-content-md-center align-items-center mb-4 mt-5">
                <Col md="auto" className="m-auto">
                    <Button onClick={() => { navigate('/formulario/0') }} style={{ backgroundColor: "#7c8569", border: "#7c8569", fontWeight: "600" }} >Ingresar nuevo Instrumento</Button>
                </Col>




                <Col md="auto" className="m-auto">
                    <label htmlFor="comboCategoria" style={{ fontWeight: "bold" }}> Filtrar tabla por Categoria: </label>
                    <select id="comboCateogira" className="form-select ml-2" style={{ width: '200px' }} name="select" onChange={handleSelectChange}>
                        <option value={0}> TODOS </option>
                        {categorias.map((categoria: Categoria) =>
                            <option key={categoria.id} value={categoria.id}> {categoria.denominacion} </option>
                        )}
                    </select>
                </Col>
            </Row>
        </Container>
    )
}


function TablaInstrumentos({ instrumentos, eliminarInstrumento }: { instrumentos: Instrumento[], eliminarInstrumento: (id: number) => void }) {

    const navigate = useNavigate()
    const { usuario } = useUsuario();

    return (
        <div className="container-fluid text-center">
            <table className="table table-striped w-75 m-auto">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Instrumento</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Precio</th>
                        {
                            usuario.rol === "ADMIN" &&
                            <>
                                <th>Modificar</th>
                                <th>Eliminar</th>
                            </>
                        }

                    </tr>
                </thead>

                <tbody>
                    {instrumentos.map((instrumento: Instrumento) =>
                        <tr key={instrumento.id}>
                            <td>{instrumento.id}</td>
                            <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={instrumento.instrumento}>
                                {instrumento.instrumento}
                            </td>
                            <td>{instrumento.marca}</td>
                            <td>{instrumento.modelo}</td>
                            <td>{instrumento.precio}</td>
                            {
                                usuario.rol === "ADMIN" &&

                                <>
                                    <td>
                                        <Button variant="info" style={{ marginBottom: 10, backgroundColor: "#5DADE2", border: "#5DADE2", color: "white", fontWeight: "600" }} onClick={() => navigate(`/formulario/${instrumento.id}`)}>Modificar</Button>
                                    </td>
                                    <td>

                                        <a className="btn btn-danger" style={{ marginBottom: 10, backgroundColor: "#C0392B", border: "#C0392B", color: "white", fontWeight: "600" }} onClick={() => eliminarInstrumento(Number(instrumento.id))}>Eliminar</a>
                                    </td>
                                </>

                            }
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}
