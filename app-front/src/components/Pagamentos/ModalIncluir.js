import React from "react";
import {Form,Col,Row,Button,Modal} from 'react-bootstrap';
import AutocompleteProdutos from "../Autocompletes/AutocompleteProdutos";
import AutocompleteOS from "../Autocompletes/AutocompleteOS";
import deleta from '../../static/deleta.png'

export default function ModalIncluir(props){
    let totalVendido = 0;
    function vendas  ()  {
            props.state.produtosVendidos.map((produto, i) => (
                totalVendido += parseFloat(produto.precoTotal)
            ))

            props.state.OSSelecionadas.map((os, i) => (
                totalVendido += parseFloat(os.total)
            ))

            totalVendido -= props.state.desconto;
            
            return (totalVendido).toFixed(2);
    }
   
    return(
        <>
        <Modal
                    show={props.state.modalIncluir}
                    onHide={props.fecharModalIncluir}
                    aria-labelledby="example-custom-modal-styling-title"
                    size='xl'
                    >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Incluir Novo Pagamento
                    </Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={() => props.incluir(totalVendido)}>

                        <Modal.Body>
                        
                        <Row className="mb-3">

                            <Col controlId="formGridOS" xs={12}>
                                <br></br>
                                <Form.Label>Ordens de Serviços</Form.Label>
                                <AutocompleteOS state={props.state} atualizaCamposACOrdensServico={props.atualizaCamposACOrdensServico} required />
                            </Col>

                            <Col controlId="formGridOS" xs={12}>
                            <table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Placa</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    
                                    {
                                    props.state.OSSelecionadas.map((os, i) => (
                                            <tr>
                                                <td>{os.idOrdemServico}</td>
                                                <td>{os.cliente.nomeCliente}</td>
                                                <td>{os.veiculo.placaVeiculo}</td>
                                                <td>{os.total}</td>
                                                <img alt='delete' src={deleta} onClick={() => props.excluirOS(os)} />
                                            </tr>
                                    ))
                                    
                                    }
                                </tbody>
                            </table>
                            </Col>

                            <Col controlId="formGridVeiculo" xs={12}>
                                <br></br>
                                <Form.Label>Venda Direta</Form.Label>
                                <AutocompleteProdutos state={props.state} atualizaCamposACProduto={props.atualizaCamposACProduto} required />
                            </Col>

                            <Col controlId="formGridProduto" xs={12}>
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
                                                <td> <Form.Control type="number" value={produto.quantidadeVendida} onChange={(e) => produto.quantidadeVendida = e.target.value} /></td>
                                                </Col>
                                                <td>{produto.precoTotal}</td>
                                                <img alt='delete' src={deleta} onClick={() => props.excluirProduto(produto)} />
                                            </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={4} controlId="formGridTotal">                               
                                    <Form.Label>Total</Form.Label>           
                                    <h4>{vendas()} </h4>
                            </Col>

                            <Col xs={4} controlId="formGridFP">                               
                                <Form.Label>Forma de Pagamento</Form.Label>           
                                <Form.Select onChange={(e) => props.atualizaFormaPagamento(e)} >
                                    <option>Selecione...</option> 
                                    <option>Dinheiro</option> 
                                    <option>Pix</option> 
                                    <option>Cartão de Crédito</option> 
                                    <option>Cartão de Débito</option> 
                                </Form.Select>                            
                            </Col>

                            <Col xs={4} controlId="formGridDesconto">
                                    <Form.Label>Desconto (R$)</Form.Label>
                                    <Form.Control type='number' value={props.state.desconto} onChange={props.atualizaDesconto} />
                            </Col>
                        </Row>

                        </Modal.Body>

                        <Modal.Footer className="footer">
                            <Button type="submit" className="btnOk">Incluir</Button>{' '}
                        </Modal.Footer>
                    </Form>

                </Modal>
                </>
    )
}