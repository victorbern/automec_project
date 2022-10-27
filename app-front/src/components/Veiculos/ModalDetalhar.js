import React from "react";
import {Form,Col,Row,Button,Modal} from 'react-bootstrap';
import AutocompleteClientes from "../Autocompletes/AutocompleteClientes"

export default function ModalDetalhar(props){
    return(
        <Modal
        show={props.state.modalDetalhar}
        onHide={props.fecharModalDetalhar}
        aria-labelledby="example-custom-modal-styling-title"
        size='xl'
        >
        <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
            Veículo
        </Modal.Title>
        </Modal.Header>

        <Form onSubmit={props.salvar}>
            <Modal.Body>
            
                <Row className="mb-3">
                    <Col xs={4} controlId="formGridNome">
                        <Form.Label>Placa*</Form.Label>
                        <Form.Control required value={props.state.placa} disabled={true} onChange={props.atualizaPlaca}/>
                    </Col>

                    <Col xs={4}  controlId="formGridCpfCnpj">
                        <Form.Label>Marca*</Form.Label>
                        <Form.Control required value={props.state.marca} disabled={props.state.input} onChange={props.atualizaMarca}/>
                    </Col>

                    <Col xs={4} controlId="formGridCel">
                        <Form.Label>Modelo*</Form.Label>
                        <Form.Control required value={props.state.modelo} disabled={props.state.input} onChange={props.atualizaModelo}/>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={4} controlId="formGridTel">
                        <Form.Label>Ano</Form.Label>
                        <Form.Control value={props.state.ano} disabled={props.state.input} onChange={props.atualizaAno}/>
                    </Col>

                    <Col xs={4} controlId="formGridCep">
                        <Form.Label>Capacidade de Óleo</Form.Label>
                        <Form.Control value={props.state.capacidadeOleo} disabled={props.state.input} onChange={props.atualizaCapacidadeOleo}/>
                    </Col>

                    <Col xs={4} controlId="formGridEnd">
                        <Form.Label>Cor</Form.Label>
                        <Form.Control value={props.state.cor} disabled={props.state.input} onChange={props.atualizaCor}/>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col controlId="formGridUF" xs={8}>
                        <Form.Label>Cliente</Form.Label>
                        <AutocompleteClientes state={props.state} atualizaCamposAC={props.atualizaCamposAC} />
                    </Col>
                </Row>
                
            </Modal.Body>

            <Modal.Footer className="footer">
                <Button type="submit" disabled = {props.state.input} className="btnOk">Salvar</Button>
                <Button disabled = {!props.state.input} className="btnOk" onClick={props.atualizaInput}>Alterar</Button>
                <Button disabled = {!props.state.input}   className="btnOkDel" onClick={ () => props.abrirModalExcluir()}>Excluir</Button>
            </Modal.Footer>
        </Form>
    </Modal>
    )
}