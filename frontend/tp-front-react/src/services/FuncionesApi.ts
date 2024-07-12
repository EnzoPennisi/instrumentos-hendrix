import Instrumento from "../entities/InstrumentoEntity";
import Categoria from "../entities/CategoriaEntity"
import Pedido from "../entities/Pedido";
import PreferenceMP from "../entities/MercadoPago/PreferenceMP";
import Usuario from "../entities/Usuario";

// ---------- INSTRUMENTOS ------------

export async function getInstrumentos() {
    const INSTRUMENTOS_ENDPOINT = 'http://localhost:9000/instrumento/all';

    try {
        const response = await fetch(INSTRUMENTOS_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Instrumento[];
    } catch (e) {
        throw new Error('Error al hacer fetch de instrumentos')
    }
}

export async function getInstrumentoPorID(id: number) {
    const INSTRUMENTO_ENDPOINT = `http://localhost:9000/instrumento/${id}`;

    try {
        const response = await fetch(INSTRUMENTO_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Instrumento;
    } catch (e) {
        throw new Error('Error al hacer fetch de instrumentos')
    }
}

export async function saveInstrumento(instrumento?: Instrumento) {
    let endpoint = 'http://localhost:9000/instrumento';
    let method: string = "POST";

    if (instrumento && instrumento.id >= 1) {
        endpoint = `http://localhost:9000/instrumento/${instrumento.id}`;
        method = "PUT";
    }

    await fetch(endpoint, {
        "method": method,
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(instrumento)
    });
}


export async function deleteInstrumento(id: number) {
    const DELETE_INSTRUMENTO_ENDPOINT = `http://localhost:9000/instrumento/${id}`

    try {
        const response = await fetch(DELETE_INSTRUMENTO_ENDPOINT, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el instrumento: ${response.status} ${response.statusText}`);
        }

        const isDeleted = await response.json();
        return isDeleted as boolean;
    } catch (e) {
        throw new Error('Error al hacer fetch de instrumentos')
    }
}


// ---------- CATEGORIAS ------------

export async function getCategorias() {
    const CATEGORIAS_ENDPOINT = 'http://localhost:9000/categoria/all';

    try {
        const response = await fetch(CATEGORIAS_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Categoria[];
    } catch (e) {
        throw new Error('Error al hacer fetch de instrumentos')
    }
}

export async function getInstrumentosPorCategoria(idCategoria: number) {
    const INSTRUMENTOS_CATEGORIA_ENDPOINT = `http://localhost:9000/instrumento/categoria/${idCategoria}`

    try {
        const response = await fetch(INSTRUMENTOS_CATEGORIA_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Instrumento[];
    } catch (e) {
        throw new Error('Error al hacer fetch de instrumentos')
    }
}


// ---------- PEDIDO ------------

export async function savePedido(pedido?: Pedido) {
    const endpoint = 'http://localhost:9000/pedido';

    const response = await fetch(endpoint, {
        "method": "POST",
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(pedido)
    });

    return response.json();
}



// ---------- PEDIDO / CREATE PREFERENCE MERCADO-PAGO  ------------

export async function savePreferenceMP(pedido?: Pedido) {
    const endpoint = 'http://localhost:9000/pedido/create_preference_mp';

    const response = await fetch(endpoint, {
        "method": "POST",
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(pedido)
    });

    const json = await response.json();
    return json as PreferenceMP
}

// ---------- PEDIDO / Obtener cantidad de pedidos por Mes y Año ------------

export async function getPedidosPorMesAño() {
    const endpoint = 'http://localhost:9000/pedido/pedidos_por_fecha';

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (e) {
        throw new Error('Error al hacer fetch de instrumentos')
    }
}

//---------- USUARIO - Autenticar Clave  ------------

export async function checkUserPassword(usuario?: Usuario) {
    const endpoint = 'http://localhost:9000/usuario/login';

    const userWithoutRol = {
        "nombre": usuario?.nombre,
        "clave": usuario?.clave
    }

    const response = await fetch(endpoint, {
        "method": "POST",
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(userWithoutRol)
    });

    if (response.status === 200) {
        return await response.json() as Promise<Usuario>;
    } else if (response.status === 401) {
        return null;
    } else {
        throw new Error(`Unexpected response status: ${response.status}`);
    }
}

// --- PedidoDetalle - Obtener Cantidad de Pedidos por Instrumento

export async function getPedidosPorInstrumentos() {
    const endpoint = 'http://localhost:9000/pedidoDetalle/pedidos_por_instrumento';

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (e) {
        throw new Error('Error al hacer fetch de instrumentos')
    }
}