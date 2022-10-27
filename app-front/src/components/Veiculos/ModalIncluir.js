import React from "react";
import {Form,Col,Row,Button,Modal} from 'react-bootstrap';
import AutocompleteClientes from "../Autocompletes/AutocompleteClientes"

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
                    Incluir Novo Veículo
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={props.incluir}>
                <Modal.Body>
                
                    <Row className="mb-3">
                        <Col xs={4} controlId="formGridNome">
                            <Form.Label>Placa*</Form.Label>
                            <Form.Control required value={props.state.placa} onChange={props.atualizaPlaca}/>
                        </Col>

                        <Col xs={4}  controlId="formGridCpfCnpj">
                            <Form.Label>Marca*</Form.Label>
                            <Form.Control required value={props.state.marca} onChange={props.atualizaMarca}/>
                        </Col>

                        <Col xs={4} controlId="formGridCel">
                            <Form.Label>Modelo*</Form.Label>
                            <Form.Control required value={props.state.modelo} onChange={props.atualizaModelo}/>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={4} controlId="formGridTel">
                            <Form.Label>Ano</Form.Label>
                            <Form.Control value={props.state.ano} onChange={props.atualizaAno}/>
                        </Col>

                        <Col xs={4} controlId="formGridCep">
                            <Form.Label>Capacidade de Óleo</Form.Label>
                            <Form.Control value={props.state.capacidadeOleo} onChange={props.atualizaCapacidadeOleo}/>
                        </Col>

                        <Col xs={4} controlId="formGridEnd">
                            <Form.Label>Cor</Form.Label>
                            <Form.Control value={props.state.cor} onChange={props.atualizaCor}/>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col controlId="formGridCliente" xs={8}>
                        <Form.Label>Cliente</Form.Label>
                        <AutocompleteClientes state={props.state} atualizaCamposAC={props.atualizaCamposAC} />
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