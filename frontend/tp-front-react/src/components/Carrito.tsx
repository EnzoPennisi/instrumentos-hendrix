import { useState } from "react"
import Pedido from "../entities/Pedido"
import PedidoDetalle from "../entities/PedidoDetalle"
import { useCarrito } from "../hooks/useCarrito"
import { savePedido } from "../services/FuncionesApi"
import { ModalMensaje } from "./ModalMensaje"
import "../styles/Carrito.css"
import { CheckoutMP } from "./CheckoutMP"


function CartItem(item: PedidoDetalle) {
    return (
        <div key={item.id}>
            <span>
                <img width={50} height={50}
                    src={`/img/${item.instrumento.imagen}`}
                    alt={item.instrumento.instrumento}
                />
                <div>
                    <strong>{item.instrumento.instrumento}</strong> - ${item.instrumento.precio}
                </div>
                <div>
                    <b>{item.cantidad} {item.cantidad == 1 ? 'unidad' : 'unidades'} </b>
                </div>
            </span>
            <hr></hr>
        </div>
    )
}

export function Carrito() {

    const { cart, limpiarCarrito, totalPedido } = useCarrito()
    const [showModal, setShowModal] = useState(false);
    const [savedPedido, setSavedPedido] = useState<Pedido>(new Pedido())
    const [message, setMessage] = useState<string>('');

    const guardarPedido = async () => {

        if (cart.length === 0) {
            setMessage("Al menos debe agregar un instrumento al carrito")
            //Al abrir el modal se detiene la ejecucion hasta cerrarlo
            setShowModal(true)
            //Una vez que se cierra el modal se accede al return
            return


        }
        const pedido = new Pedido();

        pedido.totalPedido = totalPedido ?? 0
        pedido.pedidoDetalles = cart;

        const pedidoFromDB: Pedido = await savePedido(pedido);

        limpiarCarrito();

        setMessage(`El pedido con id ${pedidoFromDB.id} se guardó correctamente`)
        setShowModal(true)
        setSavedPedido(pedidoFromDB);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <aside className="text-center">
                <h3 className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128">
                        <path fill="#65878d" d="m95.84 41.06l-9.21.97l4.02-19.64a9.985 9.985 0 0 1 6.92-7.57l18.49-5.56c3.67-1.1 7.37 1.64 7.37 5.48c0 3.61-3.59 6.13-6.98 4.9l-2.57-.58l-10.36 3.07a6.019 6.019 0 0 0-4.13 4.34zm-9.55 41.69L79.88 110l-7.79-2.75l4.8-24.5z" />
                        <path fill="#65878d" d="M81.76 102H18.84v8.33h61.5z" />
                        <path fill="#fac136" d="M1.95 48.08L9.36 84.2c.57 2.8 3.03 4.8 5.88 4.8h68.52a2 2 0 0 0 1.95-1.55l12.02-52.01c.31-1.33-.77-2.56-2.13-2.44L7.29 40.9a5.995 5.995 0 0 0-5.34 7.18m13.95 1.09l4.26-.38a3.001 3.001 0 0 1 3.27 2.99v4.82c0 1.66-1.34 3-3 3h-4.48c-1.42 0-2.65-1-2.94-2.4l-.66-3.24a3.981 3.981 0 0 1 3.55-4.79m38.21 18.42h5.68c1.66 0 3 1.34 3 3V77c0 1.66-1.34 3-3 3h-5.68c-1.66 0-3-1.34-3-3v-6.41c0-1.66 1.34-3 3-3m5.68-8h-5.68c-1.66 0-3-1.34-3-3v-7.83c0-1.55 1.19-2.85 2.73-2.99l5.68-.51a3.001 3.001 0 0 1 3.27 2.99v8.34c0 1.66-1.34 3-3 3m-16.68 11V77c0 1.66-1.34 3-3 3h-5.68c-1.66 0-3-1.34-3-3v-6.41c0-1.66 1.34-3 3-3h5.68c1.66 0 3 1.34 3 3m-3-11h-5.68c-1.66 0-3-1.34-3-3v-6.07c0-1.55 1.19-2.85 2.73-2.99l5.68-.51a3.001 3.001 0 0 1 3.27 2.99v6.58c0 1.66-1.34 3-3 3m45.74-12.74l-2.41 10.41a2.995 2.995 0 0 1-2.92 2.32h-6.73c-1.66 0-3-1.34-3-3V47c0-1.55 1.19-2.85 2.73-2.99l9.13-.82c2.04-.18 3.66 1.68 3.2 3.66M75.01 80H72.8c-1.1 0-2-.9-2-2v-7.41c0-1.66 1.34-3 3-3h3.49c1.93 0 3.36 1.8 2.92 3.68l-1.3 5.64a4.01 4.01 0 0 1-3.9 3.09m-59.26-9.44c-.32-1.54.86-2.98 2.43-2.98h2.25c1.66 0 3 1.34 3 3v6.93a2.48 2.48 0 0 1-2.48 2.48c-1.9 0-3.54-1.34-3.92-3.2z" />
                        <circle cx="75.54" cy="106.33" r="11" fill="#2f2f2f" />
                        <circle cx="75.54" cy="106.33" r="5.13" fill="#65878d" />
                        <circle cx="22.7" cy="106.33" r="11" fill="#2f2f2f" />
                        <circle cx="22.7" cy="106.33" r="5.13" fill="#65878d" />
                        <circle cx="118.59" cy="16.25" r="7.41" fill="#65878d" />
                    </svg>

                    Carrito
                </h3>

                <ul>
                    {
                        cart.map(detalle =>
                            <CartItem id={detalle.instrumento.id} instrumento={detalle.instrumento} key={detalle.instrumento.id} cantidad={detalle.cantidad} />
                        )
                    }
                </ul>
                <div>
                    <h3>${totalPedido}</h3>
                </div>
                <br />
                <button title='Limpiar Todo' onClick={limpiarCarrito}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                        <path d='M17 17a2 2 0 1 0 2 2' />
                        <path d='M17 17h-11v-11' />
                        <path d='M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7' />
                        <path d='M3 3l18 18' />
                    </svg>
                </button>
                <br />
                <br />
                {
                    savedPedido.id === 0
                        ? <button onClick={guardarPedido}> Generar Pedido </button>
                        : null
                }

            </aside >

            <CheckoutMP pedido={savedPedido} />

            <ModalMensaje
                showModal={showModal}
                message={message}
                handleClose={handleCloseModal}
            />
        </>

    )
}