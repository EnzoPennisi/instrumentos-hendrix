import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Instrumento from "../entities/InstrumentoEntity";
import { getInstrumentoPorID } from "../services/FuncionesApi";


export function useInstrumentoDetalle() {

    const { idInstrumento } = useParams();

    const [instrumento, setInstrumento] = useState<Instrumento>();

    useEffect(() => {

        getInstrumentoPorID(Number(idInstrumento))
            .then(data => setInstrumento(data))
            .catch(e => console.error(e));

    }, [idInstrumento]);

    return { instrumento, idInstrumento };
}