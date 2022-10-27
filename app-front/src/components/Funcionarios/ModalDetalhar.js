import React from "react";
import {Form,Col,Row,Button,Modal} from 'react-bootstrap';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

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
            Funcionário
        </Modal.Title>
        </Modal.Header>

        <Form onSubmit={props.salvar}>
            <Modal.Body>

            <Row className="mb-3">
                    <Col xs={4} controlId="formGridNome">
                        <Form.Label>Nome*</Form.Label>
                        <Form.Control value={props.state.nomeFuncionario} disabled={props.state.input} onChange={props.atualizaNomeFuncionario} required />
                    </Col>

                    <Col controlId="formGridFuncao">
                        <Form.Label>Função*</Form.Label>
                        <Form.Control value={props.state.funcao} disabled={props.state.input} onChange={props.atualizaFuncao} required/>
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
                            } label="Sim" disabled={props.state.input} />
                            <FormControlLabel value={props.state.nao} control={
                            <Radio
                            checked={props.state.nao === true}
                            onChange={props.atualizaNRadio}
                            value={props.state.nao}
                            name="radio-buttons"
                            />
                            } label="Não" disabled={props.state.input} />
                        </Col>
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