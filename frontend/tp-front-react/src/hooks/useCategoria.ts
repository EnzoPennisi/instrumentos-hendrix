import Categoria from "../entities/CategoriaEntity"

import { useEffect, useState } from "react";
import { getCategorias } from "../services/FuncionesApi";

export function useCategoria() {

    const [categorias, setCategoria] = useState<Categoria[]>([]);

    useEffect(() => {

        getCategorias()
            .then(data => setCategoria(data))
            .catch(e => console.error(e));

    }, [])


    return { categorias }
}