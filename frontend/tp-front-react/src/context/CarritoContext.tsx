import { ReactNode, createContext, useEffect, useState } from "react";
import Instrumento from "../entities/InstrumentoEntity";
import PedidoDetalle from "../entities/PedidoDetalle";

interface CartContextType {
    cart: PedidoDetalle[];
    addCarrito: (product: Instrumento) => void;
    removeCarrito: (product: Instrumento) => void;
    removeItemCarrito: (product: Instrumento) => void;
    limpiarCarrito: () => void;
    totalPedido?: number;
}

//Crear el contexto
export const CartContext = createContext<CartContextType>({
    cart: [],
    addCarrito: () => { },
    removeCarrito: () => { },
    removeItemCarrito: () => { },
    limpiarCarrito: () => { },
    totalPedido: 0
})

//Crear provider
export function CarritoContextProvider({ children }: { children: ReactNode }) {

    const [cart, setCart] = useState<PedidoDetalle[]>([]);
    const [totalPedido, setTotalPedido] = useState<number>(0);

    useEffect(() => {
        calcularTotalCarrito();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    const addCarrito = (instrumento: Instrumento) => {
        setCart(prevCart => {

            const productInCart = cart.find((detalle) => detalle.instrumento.id === instrumento.id);

            if (productInCart) {

                const updatedCart = prevCart.map(detalle =>
                    detalle.instrumento.id === instrumento.id
                        ? { ...detalle, cantidad: detalle.cantidad + 1 }
                        : detalle
                );

                return updatedCart;
            } else {

                const newDetalle = new PedidoDetalle();
                newDetalle.cantidad = 1;
                newDetalle.instrumento = instrumento;

                return [...prevCart, newDetalle];
            }

        })
    }

    const removeCarrito = (instrumento: Instrumento) => {
        setCart(prevCart =>
            prevCart.filter(detalle => detalle.instrumento.id !== instrumento.id)
        )
    }

    const removeItemCarrito = (instrumento: Instrumento) => {

        setCart(prevCart => {

            const productInCart = cart.find(detalle => detalle.instrumento.id === instrumento.id);

            if (productInCart && productInCart.cantidad > 1) {

                const updatedCart = cart.map(detalle =>
                    detalle.instrumento.id === instrumento.id
                        ? { ...detalle, cantidad: detalle.cantidad - 1 }
                        : detalle
                )

                return updatedCart;

            } else {
                return prevCart.filter(detalle => detalle.instrumento.id !== instrumento.id)
            }
        })
    }

    const limpiarCarrito = () => {
        setCart([]);
    }

    const calcularTotalCarrito = () => {

        let total: number = 0;

        cart.forEach(product =>
            total += product.cantidad * product.instrumento.precio
        );

        setTotalPedido(total);
    }

    return (
        <CartContext.Provider value={{ cart, addCarrito, limpiarCarrito, removeCarrito, removeItemCarrito, totalPedido }}>
            {children}
        </CartContext.Provider>
    )

}