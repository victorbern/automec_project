import React from "react";
import {Form,Col,Row,Button,Modal} from 'react-bootstrap';

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
            Serviço
        </Modal.Title>
        </Modal.Header>

        <Form onSubmit={props.salvar}>
            <Modal.Body>
            

                <Row className="mb-3">
                    <Col xs={8} controlId="formGridDescricao">
                        <Form.Label>Descrição*</Form.Label>
                        <Form.Control value={props.state.descricaoServico} disabled={props.state.input} onChange={props.atualizaDescricaoServico} required />
                    </Col>

                    <Col controlId="formGridPreco">
                        <Form.Label>Preço*</Form.Label>
                        <Form.Control value={props.state.precoServico} disabled={props.state.input} onChange={props.atualizaPrecoServico} required/>
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