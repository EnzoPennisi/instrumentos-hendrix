import { Button, Col, Container, Image, Row } from "react-bootstrap"
import { useInstrumentoDetalle } from "../hooks/useInstrumentoDetalle"

import "../styles/InstrumentoDetalle.css"

function EnvioConCosto({ costo }: { costo: string }) {
    return (
        <p className='texto-naranja'>Costo de Envío interior de Argentina: ${costo} </p>
    )
}

function EnvioGratis() {
    return (
        <div className="d-flex align-items-center">
            <Image src={`/img/camion.png`} alt="imagen de un camion" />
            <p className="mt-3 texto-verde">Envío gratis a todo el país</p>
        </div>
    )
}

export function InstrumentoDetalle() {

    const { instrumento, idInstrumento } = useInstrumentoDetalle()

    const envioGratis = instrumento?.costoEnvio === "G";

    const handleGeneratePDF = () => {
        const url = `http://localhost:9000/instrumento/download_pdf_instrumento/${idInstrumento}`
        window.open(url, "_blank");
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div className="descripcion">
                            <img src={`/img/${instrumento?.imagen}`} alt={instrumento?.instrumento} className="img-publicacion" />
                            <p>Descripcion</p>
                            <p>{instrumento?.descripcion}</p>
                        </div>
                    </Col>
                    <Col>
                        <div className="detalle">
                            <p className="cantidad-detalle">{instrumento?.cantidadVendida} vendidos</p>
                            <p className="titulo-detalle">{instrumento?.instrumento}</p>
                            <p className="precio-detalle">${instrumento?.precio}</p>
                            <p className="marca-detalle">Marca: {instrumento?.marca}</p>
                            <p className="modelo-detalle">Modelo: {instrumento?.modelo}</p>
                            <p className="costo-detalle">Costo Envio:</p>
                            {
                                envioGratis
                                    ? <EnvioGratis />
                                    : <EnvioConCosto costo={instrumento?.costoEnvio ?? ""} />
                            }
                        </div>

                        <Button className="pdf-boton" onClick={handleGeneratePDF}>Generar PDF</Button>
                    </Col>
                </Row>

            </Container>
        </>
    )
}