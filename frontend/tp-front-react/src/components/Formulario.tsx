import Instrumento from "../entities/InstrumentoEntity";
import Categoria from "../entities/CategoriaEntity";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInstrumentoPorID, saveInstrumento } from "../services/FuncionesApi";
import { useCategoria } from "../hooks/useCategoria";
import { useFormulario } from "../hooks/useFormulario";

export function Formulario() {

    const navigate = useNavigate();

    const { idInstrumento } = useParams();
    const { categorias } = useCategoria();
    const { instrumento, setInstrumento, txtValidacion, validateForm, handleCategoriaChange } = useFormulario(new Instrumento());

    useEffect(() => {
        getInstrumento();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getInstrumento = async () => {

        if (Number(idInstrumento) !== 0) {

            const instrumentoSelect = await getInstrumentoPorID(Number(idInstrumento));
            console.log(JSON.stringify(instrumentoSelect));
            setInstrumento(instrumentoSelect);
        } else {
            const newInstrumento = new Instrumento();
            setInstrumento(newInstrumento);
        }
    }

    const save = async () => {

        if (validateForm()) {
            await saveInstrumento(instrumento);
            navigate('/grilla');
        }
    }

    return (
        <>

            <div className="d-flex flex-column w-50 justify-content-center m-auto">
                <div className="mb-3">
                    <label htmlFor="txtNombre" className="form-label">Nombre</label>
                    <input type="text" id='txtNombre' className="form-control" placeholder="Ingrese el nombre" defaultValue={instrumento?.instrumento} onChange={e => instrumento.instrumento = String(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="txtMarca" className="form-label">Marca</label>
                    <input type="text" id='txtMarca' className="form-control" placeholder="Ingrese la marca" defaultValue={instrumento?.marca} onChange={e => instrumento.marca = String(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="txtModelo" className="form-label">Modelo</label>
                    <input type="text" id='txtModelo' className="form-control" placeholder="Ingrese el modelo" defaultValue={instrumento?.modelo} onChange={e => instrumento.modelo = String(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="txtImagen" className="form-label">Imagen</label>
                    <input type="text" id='txtImagen' className="form-control" placeholder="Ingrese el path de la imagen" defaultValue={instrumento?.imagen} onChange={e => instrumento.imagen = String(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="txtPrecio" className="form-label">Precio</label>
                    <input type="text" id='txtPrecio' className="form-control" placeholder="Ingrese el precio" value={instrumento?.precio} onChange={e => setInstrumento({ ...instrumento, precio: Number(e.target.value) })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="txtCostoEnvio" className="form-label">Costo de Envio</label>
                    <input type="text" id='txtCostoEnvio' className="form-control" placeholder="Ingrese el costo de envio" defaultValue={instrumento?.costoEnvio} onChange={e => instrumento.costoEnvio = String(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="txtCantidadVendida" className="form-label">Cantidad Vendida</label>
                    <input type="text" id='txtCantidadVendida' className="form-control" placeholder="Ingrese la cantidad vendida" value={instrumento?.cantidadVendida} onChange={e => setInstrumento({ ...instrumento, cantidadVendida: Number(e.target.value) })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="txtDescripcion" className="form-label">Descripcion</label>
                    <textarea id="descripcion" name="descripcion" className="form-control"
                        placeholder="Ingrese la descripcion"
                        defaultValue={instrumento?.descripcion}
                        onChange={e => instrumento.descripcion = String(e.target.value)}
                    />
                </div>
                <div className="d-flex flex-column mb-3">
                    <label htmlFor="selectCategoria" className="form-label mr-4">Categoria</label>

                    <select style={{ width: '200px' }} id="selectCategoria" name="select" value={instrumento?.categoriaInstrumento?.id || 0} onChange={(e) => handleCategoriaChange(e, categorias)}>
                        <option value={0}> Seleccione una categoria </option>

                        {categorias.map((categoria: Categoria) =>
                            <option key={categoria.id} value={categoria.id}> {categoria.denominacion} </option>
                        )}
                    </select>
                </div>

                <div>
                    <p style={{ color: 'red', lineHeight: 5, padding: 5 }}>{txtValidacion}</p>
                </div>

                <div className="col mb-4">
                    <button onClick={save} className="btn btn-success" type="button">
                        Guardar
                    </button>

                    <button type="button" className="btn btn-warning" style={{ marginLeft: "30px" }} onClick={() => navigate(`/grilla`)}>Volver</button>
                </div>

            </div>
        </>
    )
}