import React from "react";
import {Form,Col,Row,Button,Modal} from 'react-bootstrap';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ModalIncluir(props){
    return(
        <Modal
        show={props.state.modalIncluir}
        onHide={props.fecharModalIncluir}
        aria-labelledby="example-custom-modal-styling-title"
        size='lg'
        >
        <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
            Incluir Novo Funcionário
        </Modal.Title>
        </Modal.Header>

        <Form onSubmit={props.incluir}>

            <Modal.Body>
                <Row className="mb-3">
                    <Col xs={4} controlId="formGridNome">
                        <Form.Label>Nome*</Form.Label>
                        <Form.Control value={props.state.nomeFuncionario} onChange={props.atualizaNomeFuncionario} required />
                    </Col>

                    <Col controlId="formGridFuncao">
                        <Form.Label>Função*</Form.Label>
                        <Form.Control value={props.state.funcao} onChange={props.atualizaFuncao} required/>
                    </Col>

                    <Col controlId="formGridFuncao">
                        <Form.Label>Ativo</Form.Label>
                        <Col>
                            <FormControlLabel value={props.state.sim} control={
                            <Radio 
                            checked={props.state.sim === true}
                            onChange={props.atualizaSRadio}
                            value={props.state.sim}
                            name="radio-buttons"
                            />
                            } label="Sim" />
                            <FormControlLabel value={props.state.nao} control={
                            <Radio
                            checked={props.state.nao === true}
                            onChange={props.atualizaNRadio}
                            value={props.state.nao}
                            name="radio-buttons"
                            />
                            } label="Não" />
                        </Col>
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