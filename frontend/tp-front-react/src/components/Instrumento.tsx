import { Card, Button, Image } from 'react-bootstrap';
import InstrumentoEntity from "../entities/InstrumentoEntity";
import { useCarrito } from "../hooks/useCarrito";
import "../styles/Instrumento.css"
import { useNavigate } from 'react-router-dom';

type InstrumentoParams = {
    instrumentoEntity: InstrumentoEntity;
}

function EnvioConCosto({ costo }: { costo: string }) {
    return (
        <p className='texto-naranja'>Costo de Envio interior de Argentina: ${costo} </p>
    )
}

function EnvioGratis() {
    return (
        <div className="d-flex align-items-center">
            <Image src={`/img/camion.png`} alt="imagen de un camion" />
            <p className="mt-3 texto-verde">Envió gratis a todo el país</p>
        </div>
    )
}

export function Instrumento(args: InstrumentoParams) {

    const navigate = useNavigate();

    const instrumento = args.instrumentoEntity;

    const { addCarrito, removeCarrito, cart, removeItemCarrito } = useCarrito()

    const verificaInstrumentoEnCarrito = (product: InstrumentoEntity) => {
        return cart.some(item => item.instrumento.id === product.id)
    }

    const isInstrumentoInCarrito = verificaInstrumentoEnCarrito(instrumento)

    const toggleCarrito = () => {
        isInstrumentoInCarrito
            ? removeCarrito(instrumento)
            : addCarrito(instrumento)
    };

    const envioGratis = instrumento.costoEnvio === "G";

    return (
        <Card className="m-4 mx-auto text-center" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`/img/${instrumento.imagen}`} alt={instrumento.instrumento} />
            <Card.Body>
                <Card.Title>{instrumento.instrumento}</Card.Title>
                <Card.Text>{`$${instrumento.precio}`}</Card.Text>
                {
                    envioGratis
                        ? <EnvioGratis />
                        : <EnvioConCosto costo={instrumento.costoEnvio} />
                }
                <Card.Text>{instrumento.cantidadVendida} vendidos</Card.Text>
                <Button variant="primary" style={{ backgroundColor: "#de733e", border: "#de733e", fontWeight: "600" }} onClick={() => navigate(`/producto/${instrumento.id}`)}>Ver detalles</Button>

                <hr />
                <p>
                    {
                        !isInstrumentoInCarrito
                            ? <a style={{ marginLeft: '20px', marginRight: '16px' }}> </a>
                            : <a className='iconoMasMenos' onClick={() => removeItemCarrito(instrumento)}> - </a>
                    }

                    <Button className='colorFondoBlanco' onClick={toggleCarrito}>

                        {
                            isInstrumentoInCarrito
                                ? <Image src={`./img/deleteCart.png`} title='Quitar' />
                                : <Image src={`./img/addCart.png`} title='Comprar' />
                        }
                    </Button>

                    <a className='iconoMasMenos' onClick={() => addCarrito(instrumento)}>
                        +
                    </a>
                </p>
            </Card.Body>
        </Card>
    );
}
