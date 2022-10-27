import React from "react";
import {Form,Col,Row,Button,Modal} from 'react-bootstrap';
import AutocompleteClientes from "../Autocompletes/AutocompleteClientes"
import AutocompleteVeiculos from "../Autocompletes/AutocompleteVeiculos";
import AutocompleteProdutos from "../Autocompletes/AutocompleteProdutos";
import AutocompleteServicos from "../Autocompletes/AutocompleteServicos";
import deleta from '../../static/deleta.png'

export default function ModalDetalhar(props){
    let totalVendido = 0;
    function vendas  ()  {
            props.state.produtosVendidos.map((produto, i) => (
                totalVendido += parseFloat(produto.precoTotal)
            ))
            props.state.servicosPrestados.map((s, i) => (
                totalVendido += parseFloat(s.precoServico)
            ))
            return (totalVendido).toFixed(2);
    }
    let nomeFuncionario = '';
    return(
        <Modal
        show={props.state.modalDetalhar}
        onHide={props.fecharModalDetalhar}
        aria-labelledby="example-custom-modal-styling-title"
        size='xl'
        >
        <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
            Ordem de Serviço
        </Modal.Title>
        </Modal.Header>

        <Form onSubmit={() => props.salvar(totalVendido)}>
            <Modal.Body>
            
                <Row className="mb-3">
                    <Col controlId="formGridUF" xs={6}>
                        <Form.Label>Cliente</Form.Label>
                        <AutocompleteClientes state={props.state} atualizaCamposAC={props.atualizaCamposAC} />
                    </Col>

                    <Col controlId="formGridVeiculo" xs={4}>
                            <Form.Label>Veículo</Form.Label>
                            <AutocompleteVeiculos state={props.state} atualizaCamposACVeiculo={props.atualizaCamposACVeiculo} />
                    </Col>

                    <Col xs={2} controlId="formGridKm">
                            <Form.Label>Km</Form.Label>
                            <Form.Control value={props.state.km} disabled={props.state.input} onChange={props.atualizaKm} required />
                    </Col>

                    <Col controlId="formGridVeiculo" xs={10}>
                        <br></br>
                        <Form.Label>Produtos</Form.Label>
                        <AutocompleteProdutos state={props.state} atualizaCamposACProduto={props.atualizaCamposACProduto} required />
                    </Col>

                    <Col controlId="formGridProduto" xs={10}>
                    <table>
                        <thead>
                        <tr>
                            <th>Cód. Barras</th>
                            <th>Descrição</th>
                            <th>Quantidade Vendida</th>
                            <th>Preço</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                            props.state.produtosVendidos.map((produto, i) => (
                                    <tr>
                                        <td>{produto.codigoBarras}</td>
                                        <td>{produto.descricao}</td>
                                        <Col xs={2}>
                                        <td> <Form.Control type="number" disabled={props.state.input} value={produto.quantidadeVendida} onChange={(e) => produto.quantidadeVendida = e.target.value} /></td>
                                        </Col>
                                        <td>{produto.precoTotal}</td>
                                        <img alt='delete' src={deleta} onClick={ props.state.input ? "" : () => props.excluirProduto(produto)} />
                                    </tr>
                            ))
                            }
                        </tbody>
                    </table>
                    </Col>

                    <Col controlId="formGridServico" xs={10}>
                        <br></br>
                        <Form.Label>Serviços</Form.Label>
                        <AutocompleteServicos state={props.state} atualizaCamposACServico={props.atualizaCamposACServico} required />
                    </Col>

                    <Col controlId="formGridServico1" xs={10}>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Funcionário</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody >
                            {
                            props.state.servicosPrestados.map((servico, i) => (
                                    <tr>
                                        <td>{servico.idServico}</td>
                                        <td>{servico.descricaoServico}</td>
                                        <td>{servico.precoServico}</td>
                                        <Col xs={4}>
                                        <td>
                                        {
                                                props.state.funcionarios.map((f) => {
                                                    if(f.idFuncionario === servico.idFuncionario){
                                                        nomeFuncionario = f.nomeFuncionario;
                                                    } 
                                                }
                                                )
                                        }
                                        <Form.Select disabled={props.state.input} defaultValue={`${servico.idFuncionario} - ${nomeFuncionario}`} onChange={(e) => servico.idFuncionario = e.target.value} >
                                        <option>Selecione...</option> 
                                        {   
                                                props.state.funcionarios.map((f) => (
                                                <option>{f.idFuncionario} - {f.nomeFuncionario}</option> 

                                                ))
                                        }
                                        </Form.Select>
                                        </td>
                                        </Col>
                                        <td> <img alt='delete' src={deleta} onClick={props.state.input ? "" : () => props.excluirServico(servico)} /></td>
                                    </tr>
                            ))
                            }
                        </tbody>
                    </table>
                    </Col>
                </Row>

                <Row>
                    <Col xs={2} controlId="formGridKm">                               
                            <Form.Label>Total</Form.Label>           
                            <h4>{vendas()} </h4>
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