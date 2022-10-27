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
            Produto
        </Modal.Title>
        </Modal.Header>

        <Form onSubmit={props.salvar}>

            <Modal.Body>
                <Row className="mb-3">
                    <Col xs={8} controlId="formGridcodBarras">
                        <Form.Label>Código de Barras*</Form.Label>
                        <Form.Control value={props.state.codigoBarras} disabled={props.state.input} onChange={props.atualizaCodigoBarras} required />
                    </Col>

                    <Col controlId="formGridDescricao">
                        <Form.Label>Descrição*</Form.Label>
                        <Form.Control value={props.state.descricao} disabled={props.state.input} onChange={props.atualizaDescricao} required/>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={4} controlId="formGridValorCusto">
                        <Form.Label>Valor de Custo</Form.Label>
                        <Form.Control value={props.state.valorCusto} disabled={props.state.input} onChange={props.atualizaValorCusto}  />
                    </Col>

                    <Col xs={4} controlId="formGridPrecoVenda">
                        <Form.Label>Preço de Venda</Form.Label>
                        <Form.Control value={props.state.precoVenda} disabled={props.state.input} onChange={props.atualizPrecoVenda} required/>
                    </Col>

                    <Col xs={4} controlId="formGridQuantidade">
                        <Form.Label>Estoque</Form.Label>
                        <Form.Control value={props.state.quantidadeEstoque} disabled={true} onChange={props.atualizaQuantidadeEstoque} />
                    </Col>

                </Row>

            </Modal.Body>

            <Modal.Footer className="footer">
                <Button disabled = {false}   className="btnMov" onClick={ () => props.abrirModalMovimentar()}>Movimentar</Button>
                <Button type="submit" disabled = {props.state.input} className="btnOk">Salvar</Button>
                <Button disabled = {!props.state.input} className="btnOk" onClick={props.atualizaInput}>Alterar</Button>
                <Button disabled = {!props.state.input}   className="btnOkDel" onClick={ () => props.abrirModalExcluir()}>Excluir</Button>
            </Modal.Footer>

        </Form>

    </Modal>
    )
}