import React from "react";
import {Form,Col,Row,Button,Modal} from 'react-bootstrap';
import Radio from '@mui/material/Radio';


export default function ModalMovimentar(props){
    return(
        <Modal
        show={props.state.modalMovimentar}
        onHide={props.fecharModalMovimentar}
        aria-labelledby="example-custom-modal-styling-title"
        size='lg'
        centered
        >
        <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
            Movimentar Estoque
        </Modal.Title>
        </Modal.Header>

        <Form onSubmit={props.movimentar}>

            <Modal.Body >
                <Row className="mb-3">

                    <Col controlId="formGridcodEntrada">
                        <Form.Label>Entrada</Form.Label>
                        <Radio
                        checked={props.state.entradaRadio === true}
                        onChange={props.atualizaEntradaRadio}
                        value={props.state.entradaRadio}
                        name="radio-buttons"
                        />
                        <Form.Label>Saída</Form.Label>
                        <Radio
                        checked={props.state.saidaRadio === true}
                        onChange={props.atualizaSaidaRadio}
                        value={props.state.saidaRadio}
                        name="radio-buttons"
                        />
                        <Form.Control value={props.state.movimento} onChange={props.atualizaMovimento} />
                    </Col>

                </Row>

            </Modal.Body>

            <Modal.Footer className="footer">
                <Button type="submit" className="btnMov" onClick={ () => props.movimentarProduto(props.state.codigoBarras)}>Movimentar</Button>
            </Modal.Footer>
        </Form>

    </Modal>
    )
}