import React from "react";
import {Col,Row,Button,Modal} from 'react-bootstrap';

export default function ModalExcluir(props){
    return(
        <Modal
            show={props.state.modalExcluir}
            onHide={props.fecharModalExcluir}
            aria-labelledby="example-custom-modal-styling-title"
            size='lg'
            centered
            >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                Excluir
            </Modal.Title>
            </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col xs={8}>
                            <p>Deseja realmente excluir esse registro?</p>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer className="footer">
                    <Button className="btnOk" onClick={props.fecharModalExcluir}>Cancelar</Button>
                    <Button className="btnOkDel" onClick={() => props.deletarServico(props.state.idServico)}>Excluir</Button>
                </Modal.Footer>

        </Modal>
    )
}