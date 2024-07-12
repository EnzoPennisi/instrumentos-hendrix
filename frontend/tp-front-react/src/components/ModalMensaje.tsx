import { Button, Modal } from "react-bootstrap";

interface ModalProps {
    showModal: boolean;
    handleClose: () => void;
    message: string;
}

export const ModalMensaje: React.FC<ModalProps> = ({ showModal, handleClose, message }) => {
    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pedido de Instrumentos</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}