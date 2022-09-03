
import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';
import './style.css'
import qs from 'qs'

class Clientes extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id: 0,
            nome: '',
            cpf: '',
            celular: '',
            telefone: '',
            cep:'',
            endereco:'',
            numero:'',
            bairro:'',
            cidade:'',
            uf:'',
            complemento:'',
            input: false,
            clientes : [],
            modalIncluir:false,
            modalDetalhar:false,
            tituloClasse: 'Clientes'
        }

    }

    componentDidMount(){
        this.buscarCliente();
    }

    componentWillUnmount(){

    }

    buscarCliente = () => {
        fetch("http://localhost:3000/api/clientes")
        .then(resposta => resposta.json())
        .then(dados => {
            this.setState({ clientes : dados.result})
        })
    }

    buscarClienteEspec = (valor) => {
        fetch("http://localhost:3000/api/clientes/"+valor)
        .then(resposta => resposta.json())
        .then(clientes => {
            this.setState({ clientes : clientes.result})
        })
    }

    deletarCliente = (id) => {
        fetch("http://localhost:3000/api/cliente/"+id, {method: 'DELETE'})
        .then(resposta => {
            if(resposta.ok){
                this.buscarCliente();
            }
        })
        this.fecharModalDetalhar()
    }

    incluirCliente = (cliente) => {
        fetch("http://localhost:3000/api/cliente", {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: qs.stringify(cliente)
        })
        .then(resposta => {
            if(resposta.ok){
                this.buscarCliente();
            } else {
                alert('Não foi possível incluir o cliente!')
            }
        })
        this.fecharModalIncluir()
    }

    atualizarCliente = (cliente) => {
        fetch("http://localhost:3000/api/cliente/"+cliente.idCliente, {
            method: 'PUT',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: qs.stringify(cliente)
        })
        .then(resposta => {
            if(resposta.ok){
                this.buscarCliente();
            } else {
                alert('Não foi possível atualizar o cliente!')
            }
        })
        this.fecharModalDetalhar()
    }

    fecharModalIncluir = () => {
        this.setState(
            {
                modalIncluir:false
            }
        )
    }

    abrirModalIncluir = () => {
        this.setState(
            {
                modalIncluir:true,
            }
        )
        this.zerarClienteState()
    }

    fecharModalDetalhar = () => {
        this.setState(
            {
                modalDetalhar:false,
            }
        )
        this.zerarClienteState()
    }

    abrirModalDetalhar = (cliente) => {
        this.setState(
            {
                modalDetalhar:true,
                id: cliente.idCliente,
                nome: cliente.nomeCliente,
                cpf: cliente.cpfCnpj,
                celular: cliente.celularCliente,
                telefone: cliente.telefoneCliente,
                cep: cliente.cep,
                endereco:cliente.endereco,
                numero:cliente.numero,
                bairro:cliente.bairro,
                cidade:cliente.cidade,
                uf:cliente.uf,
                complemento:cliente.complemento,
                input: true,
            }
        )
    }

    atualizaNome = (e) => {
        this.setState(
            {
                nome: e.target.value
            }
        )
    }

    atualizaCpf = (e) => {
        this.setState(
            {
                cpf: e.target.value
            }
        )
    }

    atualizaCelular = (e) => {
        this.setState(
            {
                celular: e.target.value
            }
        )
    }

    atualizaTelefone = (e) => {
        this.setState(
            {
                telefone: e.target.value
            }
        )
    }

    atualizaCep = (e) => {
        this.setState(
            {
                cep: e.target.value
            }
        )
    }

    atualizaEndereco = (e) => {
        this.setState(
            {
                endereco: e.target.value
            }
        )
    }

    atualizaNumero = (e) => {
        this.setState(
            {
                numero: e.target.value
            }
        )
    }

    atualizaBairro = (e) => {
        this.setState(
            {
                bairro: e.target.value
            }
        )
    }

    atualizaCidade = (e) => {
        this.setState(
            {
                cidade: e.target.value
            }
        )
    }

    atualizaUf = (e) => {
        this.setState(
            {
                uf: e.target.value
            }
        )
    }

    atualizaComplemento = (e) => {
        this.setState(
            {
                complemento: e.target.value
            }
        )
    }

    incluir = () => {
        const cliente = {
            nomeCliente: this.state.nome,
            cpfCnpj: this.state.cpf,
            celularCliente: this.state.celular,
            telefoneCliente: this.state.telefone,
            cep: this.state.cep,
            endereco:this.state.endereco,
            numero:this.state.numero,
            bairro:this.state.bairro,
            cidade:this.state.cidade,
            uf:this.state.uf,
            complemento:this.state.complemento
    }

    this.incluirCliente(cliente)
    }

    salvar = () => {
            const cliente = {
                idCliente: this.state.id,
                nomeCliente: this.state.nome,
                cpfCnpj: this.state.cpf,
                celularCliente: this.state.celular,
                telefoneCliente: this.state.telefone,
                cep: this.state.cep,
                endereco:this.state.endereco,
                numero:this.state.numero,
                bairro:this.state.bairro,
                cidade:this.state.cidade,
                uf:this.state.uf,
                complemento:this.state.complemento
            }
            this.atualizarCliente(cliente)
    }

    zerarClienteState = () => {
        this.setState(
            {
            id: 0,
            nome: '',
            cpf: '',
            celular: '',
            telefone: '',
            cep:'',
            endereco:'',
            numero:'',
            bairro:'',
            cidade:'',
            uf:'',
            complemento:''
            }
        )
    }

    modalIncluirCliente = () => {
        return(
            <Modal
                    show={this.state.modalIncluir}
                    onHide={this.fecharModalIncluir}
                    aria-labelledby="example-custom-modal-styling-title"
                    size='xl'
                    >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Incluir Novo Cliente
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                        <Form validator>
                        <Row className="mb-3">
                            <Col xs={8} controlId="formGridNome">
                                <Form.Label>Nome*</Form.Label>
                                <Form.Control value={this.state.nome} onChange={this.atualizaNome}/>
                            </Col>

                            <Col controlId="formGridCpfCnpj">
                                <Form.Label>CPF / CNPJ*</Form.Label>
                                <Form.Control value={this.state.cpf} onChange={this.atualizaCpf}/>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col xs={4} controlId="formGridCel">
                                <Form.Label>Celular*</Form.Label>
                                <Form.Control value={this.state.celular} onChange={this.atualizaCelular}/>
                            </Col>

                            <Col xs={4} controlId="formGridTel">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control value={this.state.telefone} onChange={this.atualizaTelefone}/>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col xs={4} controlId="formGridCep">
                                <Form.Label>Cep</Form.Label>
                                <Form.Control value={this.state.cep} onChange={this.atualizaCep}/>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col controlId="formGridEnd">
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control value={this.state.endereco} onChange={this.atualizaEndereco}/>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col xs={2} controlId="formGridNum">
                                <Form.Label>Nº</Form.Label>
                                <Form.Control value={this.state.numero} onChange={this.atualizaNumero}/>
                            </Col>

                            <Col xs={4} controlId="formGridBairro">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control value={this.state.bairro} onChange={this.atualizaBairro}/>
                            </Col>

                            <Col xs={4} controlId="formGridCidade">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control value={this.state.cidade} onChange={this.atualizaCidade}/>
                            </Col>

                            <Col controlId="formGridUF">
                                <Form.Label>UF</Form.Label>
                                <Form.Select defaultValue={this.state.uf} onChange={this.atualizaUf}>
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
                                <Form.Control value={this.state.complemento} onChange={this.atualizaComplemento}/>
                            </Col>
                        </Row>
                    </Form>
                    </Modal.Body>

                    <Modal.Footer className="footer">
                    <Button className="btnOk" onClick={this.incluir}>Incluir</Button>{' '}
                    </Modal.Footer>
                </Modal>
            )
    }

    modalDetalharCliente = () => {
        return(
            <Modal
                    show={this.state.modalDetalhar}
                    onHide={this.fecharModalDetalhar}
                    aria-labelledby="example-custom-modal-styling-title"
                    size='xl'
                    >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Cliente
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                        <Form>
                        <Row className="mb-3">
                            <Col xs={8} controlId="formGridNome">
                                <Form.Label>Nome* </Form.Label>                             
                                <Form.Control id="input" value = {this.state.nome} disabled={this.state.input} onChange={this.atualizaNome}/>
                            </Col>

                            <Col controlId="formGridCpfCnpj">
                                <Form.Label>CPF / CNPJ*</Form.Label>
                                <Form.Control value={this.state.cpf} disabled={this.state.input} onChange={this.atualizaCpf}/>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col xs={4} controlId="formGridCel">
                                <Form.Label>Celular*</Form.Label>
                                <Form.Control value={this.state.celular} disabled={this.state.input} onChange={this.atualizaCelular}/>
                            </Col>

                            <Col xs={4} controlId="formGridTel">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control value={this.state.telefone} disabled={this.state.input} onChange={this.atualizaTelefone}/>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col xs={4} controlId="formGridCep">
                                <Form.Label>Cep</Form.Label>
                                <Form.Control value={this.state.cep} disabled={this.state.input} onChange={this.atualizaCep}/>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col controlId="formGridEnd">
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control value={this.state.endereco}  disabled={this.state.input} onChange={this.atualizaEndereco}/>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col xs={2} controlId="formGridNum">
                                <Form.Label>Nº</Form.Label>
                                <Form.Control value={this.state.numero}  disabled={this.state.input} onChange={this.atualizaNumero}/>
                            </Col>

                            <Col xs={4} controlId="formGridBairro">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control value={this.state.bairro}  disabled={this.state.input} onChange={this.atualizaBairro}/>
                            </Col>

                            <Col xs={4} controlId="formGridCidade">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control value={this.state.cidade}  disabled={this.state.input} onChange={this.atualizaCidade}/>
                            </Col>

                            <Col controlId="formGridUF">
                                <Form.Label >UF</Form.Label>
                                <Form.Select defaultValue={this.state.uf} disabled={this.state.input} onChange={this.atualizaUf}>
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
                                <Form.Control value={this.state.complemento} disabled={this.state.input} onChange={this.atualizaComplemento}/>
                            </Col>
                        </Row>
                    </Form>
                    </Modal.Body>

                    <Modal.Footer className="footer">
                    <Button disabled = {this.state.input} className="btnOk"  onClick={this.salvar} >Salvar</Button>
                    <Button disabled = {!this.state.input} className="btnOk" onClick={()=>this.setState({input:false})}>Alterar</Button>
                    <Button disabled = {!this.state.input}   className="btnOkDel" onClick={ () => this.deletarCliente(this.state.id)}>Excluir</Button>
                    </Modal.Footer>
                </Modal>
            )
    }
       
    listagemClientes(){
        return(
            <Table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF / CNPJ</th>
                        <th>Celular</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.clientes.map( (cliente) =>
                            <tr onClick={() => this.abrirModalDetalhar(cliente)}>
                                <td> {cliente.idCliente}</td>
                                <td> {cliente.nomeCliente}</td>
                                <td> {cliente.cpfCnpj}</td>
                                <td> {cliente.celularCliente}</td>
                            </tr>
                            )
                        }
                    </tbody>
            </Table>
    )
    }

    handleChange = (e) => {
        if(!e.target.value){
            this.buscarCliente()
            return
        }

        this.buscarClienteEspec(e.target.value)
    }

      
    render(){

        return(
            <div>
            
                <div id="titulo"className="titulo">
                    <h2>{this.state.tituloClasse}</h2>
                    <div class="line"></div>
                </div>

                <div className="pesquisar">
                    <Form.Control className="input-pesquisar" placeholder="Pesquisar" onChange={this.handleChange}/>
                </div>
                
                <Button className="btn-incluir" onClick={this.abrirModalIncluir}>
                    Incluir
                </Button>

                {this.listagemClientes()}

                {this.modalIncluirCliente()}

                {this.modalDetalharCliente()}
            
            </div>
        )
    }

}

export default Clientes;