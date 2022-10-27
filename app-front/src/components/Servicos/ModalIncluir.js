import React from "react";
import {Form,Col,Row,Button,Modal} from 'react-bootstrap';

export default function ModalIncluir(props){
    return(
        <Modal
                    show={props.state.modalIncluir}
                    onHide={props.fecharModalIncluir}
                    aria-labelledby="example-custom-modal-styling-title"
                    size='xl'
                    >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Incluir Novo Serviço
                    </Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={props.incluir}>

                        <Modal.Body>
                            <Row className="mb-3">
                                <Col xs={8} controlId="formGridDescricao">
                                    <Form.Label>Descrição*</Form.Label>
                                    <Form.Control value={props.state.descricaoServico} onChange={props.atualizaDescricaoServico} required />
                                </Col>

                                <Col controlId="formGridPreco">
                                    <Form.Label>Preço*</Form.Label>
                                    <Form.Control value={props.state.precoServico} onChange={props.atualizaPrecoServico} required/>
                                </Col>
                            </Row>

                        </Modal.Body>

                        <Modal.Footer className="footer">
                            <Button type="submit" className="btnOk">Incluir</Button>{' '}
                        </Modal.Footer>
                    </Form>

                </Modal>
    )
}