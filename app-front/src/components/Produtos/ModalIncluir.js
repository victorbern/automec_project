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
                        Incluir Novo Produto
                    </Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={props.incluir}>

                        <Modal.Body>
                            <Row className="mb-3">
                                <Col xs={8} controlId="formGridcodBarras">
                                    <Form.Label>Código de Barras*</Form.Label>
                                    <Form.Control value={props.state.codigoBarras} onChange={props.atualizaCodigoBarras} required />
                                </Col>

                                <Col controlId="formGridDescricao">
                                    <Form.Label>Descrição*</Form.Label>
                                    <Form.Control value={props.state.descricao} onChange={props.atualizaDescricao} required/>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col xs={4} controlId="formGridValorCusto">
                                    <Form.Label>Valor de Custo</Form.Label>
                                    <Form.Control value={props.state.valorCusto} onChange={props.atualizaValorCusto}  />
                                </Col>

                                <Col controlId="formGridPrecoVenda">
                                    <Form.Label>Preço de Venda</Form.Label>
                                    <Form.Control value={props.state.precoVenda} onChange={props.atualizPrecoVenda} required/>
                                </Col>

                                <Col controlId="formGridQuantidade">
                                    <Form.Label>Estoque</Form.Label>
                                    <Form.Control value={props.state.quantidadeEstoque} onChange={props.atualizaQuantidadeEstoque} />
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