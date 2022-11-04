import React from "react";
import {Col,Row,Button,Modal} from 'react-bootstrap';

export default function ModalComprovante(props){
    return(
        <Modal
            show={props.state.modalComprovante}
            onHide={props.fecharModalComprovante}
            aria-labelledby="example-custom-modal-styling-title"
            size='lg'
            centered
            >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                Comprovante Pagamento
            </Modal.Title>
            </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col xs={8}>
                            <p>Deseja realmente cancelar esse registro?</p>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer className="footer">
                    <Button className="btnOk" onClick={props.fecharModalComprovante}>Não</Button>
                    <Button className="btnOkDel" onClick={() => props.gerarPDF (props.state.comprovante)}>Sim</Button>
                </Modal.Footer>

        </Modal>
    )
}