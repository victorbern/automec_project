import React from "react";
import {Form,Col,Row,Button,Modal} from 'react-bootstrap';
import { IMaskInput } from 'react-imask';
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

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
            Cliente
        </Modal.Title>
        </Modal.Header>

        <Form onSubmit={props.salvar}>
            <Modal.Body>
            
                <Row className="mb-3">
                    <Col xs={8} controlId="formGridNome">
                        <Form.Label>Nome* </Form.Label>                             
                        <Form.Control required value = {props.state.nome} disabled={props.state.input} onChange={props.atualizaNome}/>
                    </Col>

                    <Col controlId="formGridCpfCnpj">
                        <Form.Label>CPF / CNPJ*</Form.Label>
                        <Form.Control as={CpfCnpj} mask="CPF" value={props.state.cpf} disabled={props.state.input} onChange={props.atualizaCpf} required/>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={4} controlId="formGridCel">
                        <Form.Label>Celular*</Form.Label>
                        <Form.Control required as={IMaskInput} mask="(00) 00000-0000" value={props.state.celular} disabled={props.state.input} onChange={props.atualizaCelular}/>
                    </Col>

                    <Col xs={4} controlId="formGridTel">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control as={IMaskInput} mask="(00) 0000-0000" value={props.state.telefone} disabled={props.state.input} onChange={props.atualizaTelefone}/>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={4} controlId="formGridCep">
                        <Form.Label>Cep</Form.Label>
                        <Form.Control as={IMaskInput} mask="00000-000" value={props.state.cep} disabled={props.state.input} onChange={props.atualizaCep}/>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col controlId="formGridEnd">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control value={props.state.endereco}  disabled={props.state.input} onChange={props.atualizaEndereco}/>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={2} controlId="formGridNum">
                        <Form.Label>Nº</Form.Label>
                        <Form.Control value={props.state.numero}  disabled={props.state.input} onChange={props.atualizaNumero}/>
                    </Col>

                    <Col xs={4} controlId="formGridBairro">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control value={props.state.bairro}  disabled={props.state.input} onChange={props.atualizaBairro}/>
                    </Col>

                    <Col xs={4} controlId="formGridCidade">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control value={props.state.cidade}  disabled={props.state.input} onChange={props.atualizaCidade}/>
                    </Col>

                    <Col controlId="formGridUF">
                        <Form.Label >UF</Form.Label>
                        <Form.Select defaultValue={props.state.uf} disabled={props.state.input} onChange={props.atualizaUf}>
                        <option>Selecione...</option>
                        <option>AC</option>
                        <option>AL</option>
                        <option>AP</option>
                        <option>AM</option>
                        <option>BA</option>
                        <option>CE</option>
                        <option>DF</option>
                        <option>GO</option>
                        <option>MA</option>
                        <option>MT</option>
                        <option>MS</option>
                        <option>MG</option>
                        <option>PA</option>
                        <option>PB</option>
                        <option>PR</option>
                        <option>PE</option>
                        <option>PI</option>
                        <option>RJ</option>
                        <option>RN</option>
                        <option>RS</option>
                        <option>RO</option>
                        <option>RR</option>
                        <option>SP</option>
                        <option>SE</option>
                        <option>TO</option>        
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col controlId="formGridComplemento">
                        <Form.Label>Complemento</Form.Label >
                        <Form.Control value={props.state.complemento} disabled={props.state.input} onChange={props.atualizaComplemento}/>
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