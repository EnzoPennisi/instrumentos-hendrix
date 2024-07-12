import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ModalProps {
    showModal: boolean;
    handleClose: () => void;
}

export const ModalReporteExcel: React.FC<ModalProps> = ({ showModal, handleClose }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleGenerateExcel = () => {
        let url = `http://localhost:9000/pedido/download_excel_pedido?`;

        if (startDate) {
            console.log("fechaInicio" + startDate.toISOString())
            url += `fechaInicio=${startDate.toISOString().split('T')[0]}&`;
        }

        if (endDate) {
            console.log("fechaFin" + endDate.toISOString())
            url += `fechaFin=${endDate.toISOString().split('T')[0]}`;
        }

        window.open(url, "_blank");
    };

    return (
        <>
            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title> Reporte por rango de fechas de pedido </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row md="auto" className="m-auto">
                        <Col>
                            <label style={{ marginRight: "10px", fontWeight: "bold" }}>Fecha Desde: </label>
                            <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                        </Col>
                        <Col>
                            <label style={{ marginRight: "10px", fontWeight: "bold" }}>Fecha Hasta: </label>
                            <DatePicker selected={endDate} onChange={(date: Date) => setEndDate(date)} />
                        </Col>
                    </Row>
                    <Row md="auto" className="mt-5 m-auto">
                        <Button style={{ backgroundColor: "#7c8569", border: "#7c8569", fontWeight: "600" }} onClick={handleGenerateExcel}>Generar Excel</Button>
                    </Row>
                </Modal.Body>
            </Modal>
        </>

    )
}
