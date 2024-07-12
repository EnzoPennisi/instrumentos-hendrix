import Instrumento from "../entities/InstrumentoEntity";
import { getInstrumentos, getInstrumentosPorCategoria } from "../services/FuncionesApi";
import { deleteInstrumento } from "../services/FuncionesApi";

import { useEffect, useState } from "react";

export function useInstrumento() {

    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [idCategoria, setIdCategoria] = useState<number>(0);
    const [estadoEliminado, setEstadoEliminado] = useState<boolean>(false);


    useEffect(() => {
        obtenerInstrumentos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idCategoria, estadoEliminado]);

    const obtenerInstrumentos = async () => {
        let instrumentos: Instrumento[] = []

        if (Number(idCategoria) !== 0) {
            instrumentos = await getInstrumentosPorCategoria(idCategoria);
            setInstrumentos(instrumentos)
        } else {
            instrumentos = await getInstrumentos();
            setInstrumentos(instrumentos);
        }
    }

    const eliminarInstrumento = async (id: number) => {
        try {
            setEstadoEliminado(false);
            const estado = await deleteInstrumento(id);
            setEstadoEliminado(estado);
        } catch (error) {
            console.error('Error al eliminar el instrumento:', error);
        }
    }

    return { instrumentos, eliminarInstrumento, setIdCategoria };
}