import { useState } from "react";
import Instrumento from "../entities/InstrumentoEntity";
import Categoria from "../entities/CategoriaEntity";

export const useFormulario = (initialInstrumento: Instrumento) => {

    const [instrumento, setInstrumento] = useState<Instrumento>(initialInstrumento);
    const [txtValidacion, setTxtValidacion] = useState("");


    const validateForm = () => {
        if (instrumento?.instrumento === undefined || instrumento.instrumento === "") {
            setTxtValidacion("Debe ingresar el nombre del instrumento");
            return false;
        }
        if (instrumento?.marca === undefined || instrumento.marca === "") {
            setTxtValidacion("Debe ingresar la marca del instrumento");
            return false;
        }
        if (instrumento?.modelo === undefined || instrumento.modelo === "") {
            setTxtValidacion("Debe ingresar el modelo del instrumento");
            return false;
        }
        if (instrumento?.imagen === undefined || instrumento.imagen === "") {
            setTxtValidacion("Debe ingresar la imagen del instrumento");
            return false;
        }
        if (instrumento?.precio === undefined || instrumento.precio === 0) {
            setTxtValidacion("Debe ingresar el precio del instrumento");
            return false;
        }
        if (instrumento?.costoEnvio === undefined || instrumento.costoEnvio === "") {
            setTxtValidacion("Debe ingresar el costo de envío del instrumento");
            return false;
        }
        if (instrumento?.cantidadVendida === undefined || instrumento.cantidadVendida === 0) {
            setTxtValidacion("Debe ingresar la cantidad vendida del instrumento");
            return false;
        }
        if (instrumento?.descripcion === undefined || instrumento.descripcion === "") {
            setTxtValidacion("Debe ingresar la descripción del instrumento");
            return false;
        }
        if (instrumento?.categoriaInstrumento?.denominacion === undefined || instrumento.categoriaInstrumento.denominacion === "") {
            setTxtValidacion("Debe ingresar la categoría del instrumento");
            return false;
        }
        return true;
    }

    const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>, categorias: Categoria[]) => {
        const selectedId = Number(e.target.value);

        const selectedCategoria = categorias.find(categoria => categoria.id === selectedId);
        if (selectedCategoria && instrumento) {
            setInstrumento({ ...instrumento, categoriaInstrumento: selectedCategoria });
        }
    }

    return { instrumento, setInstrumento, txtValidacion, validateForm, handleCategoriaChange };
}