import React from "react";
import {Form,Col,Row,Button,Modal} from 'react-bootstrap';
import { IMaskInput } from 'react-imask';
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

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
                        Incluir Novo Cliente
                    </Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={props.incluir}>

                        <Modal.Body>
                            <Row className="mb-3">
                                <Col xs={8} controlId="formGridNome">
                                    <Form.Label>Nome*</Form.Label>
                                    <Form.Control value={props.state.nome} onChange={props.atualizaNome} required />
                                </Col>

                                <Col controlId="formGridCpfCnpj">
                                <Form.Label>CPF / CNPJ*</Form.Label>
                                <Form.Control as={CpfCnpj} mask="CPF" value={props.state.cpf} onChange={props.atualizaCpf} required/>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col xs={4} controlId="formGridCel">
                                    <Form.Label>Celular*</Form.Label>
                                    <Form.Control as={IMaskInput} mask="(00) 00000-0000" value={props.state.celular} onChange={props.atualizaCelular} required/>
                                </Col>

                                <Col xs={4} controlId="formGridTel">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control as={IMaskInput} mask="(00) 0000-0000" value={props.state.telefone} onChange={props.atualizaTelefone}/>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col xs={4} controlId="formGridCep">
                                    <Form.Label>Cep</Form.Label>
                                    <Form.Control as={IMaskInput} mask="00000-000" value={props.state.cep} onChange={props.atualizaCep}/>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col controlId="formGridEnd">
                                    <Form.Label>Endereço</Form.Label>
                                    <Form.Control value={props.state.endereco} onChange={props.atualizaEndereco}/>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col xs={2} controlId="formGridNum">
                                    <Form.Label>Nº</Form.Label>
                                    <Form.Control value={props.state.numero} onChange={props.atualizaNumero}/>
                                </Col>

                                <Col xs={4} controlId="formGridBairro">
                                    <Form.Label>Bairro</Form.Label>
                                    <Form.Control value={props.state.bairro} onChange={props.atualizaBairro}/>
                                </Col>

                                <Col xs={4} controlId="formGridCidade">
                                    <Form.Label>Cidade</Form.Label>
                                    <Form.Control value={props.state.cidade} onChange={props.atualizaCidade}/>
                                </Col>

                                <Col controlId="formGridUF">
                                    <Form.Label>UF</Form.Label>
                                    <Form.Select defaultValue={props.state.uf} onChange={props.atualizaUf}>
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
                                    <Form.Label>Complemento</Form.Label>
                                    <Form.Control value={props.state.complemento} onChange={props.atualizaComplemento}/>
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