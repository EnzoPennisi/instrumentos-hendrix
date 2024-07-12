import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/Home.css"
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";

export function Home() {

    const carruselItems = [];
    const randomNumber = Math.floor(Math.random() * 7) + 1;
    for (let i = randomNumber; i < randomNumber + 4; i++) {
        carruselItems.push(
            <CCarouselItem key={`nro${i}`}>
                <CImage className="d-block img-carousel" src={`./img/nro${i}.jpg`} alt={`nro${i}`} />
            </CCarouselItem>
        );
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <h1 style={{ alignSelf: "center" }}>Musical Hendrix</h1>
            </div>

            <div className="d-flex flex-column w-50 justify-content-center m-auto" style={{ minHeight: "80vh" }}>
                <CCarousel controls transition="crossfade" indicators dark>
                    {carruselItems}
                </CCarousel>
                <p className="fs-5">
                    Es una tienda de instrumentos musicales con más de 15 años de experiencia.
                    Tenemos el conocimiento y la capacidad para asesorarte sobre las mejores elecciones para tu compra musical.
                </p>
            </div>

        </>
    );
}