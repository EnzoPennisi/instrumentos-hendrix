import "../styles/Mapa.css"

function Mapa() {

    const latitud = -32.897197;
    const longitud = -68.853356;
    const zoomFactor = 8;
    const src = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11270.125646913215!2d${longitud}!3d${latitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f${13.1 / zoomFactor}!5e0!3m2!1ses-419!2sar!4v1615335513448!5m2!1ses-419!2sar`;

    return (
        <div className="map-container">
            <iframe
                title="Mapa de Google"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                src={src}
            />
        </div>
    );
}

export function DondeEstamos() {

    return (
        <>
            <p className="fs-2" style={{ marginLeft: "20px" }}>Donde Estamos</p >

            <div className="d-flex justify-content-center">
                <Mapa />
            </div>


        </>
    );
}
