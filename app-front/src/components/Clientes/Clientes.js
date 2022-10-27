import React from "react";
import './style.css'
import qs from 'qs'
import Paginator from "../Paginator/Paginator";
import ModalIncluir from "./ModalIncluir";
import ModalDetalhar from "./ModalDetalhar";
import ModalExcluir from "./ModalExcluir";
import Header from "../Header/Header";
import Listagem from "../Listagem/Listagem";

class Clientes extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id: 0, nome: '', cpf: '', celular: '', telefone: '', cep:'', endereco:'', numero:'', bairro:'', cidade:'',
            uf:'', complemento:'', input: false, modalIncluir:false, modalDetalhar:false,modalExcluir:false, tituloClasse: 'Clientes',
            offset: 0, tableData: [], orgtableData: [], perPage: 10, currentPage: 0, pageCount: 0,
            column: [
                { heading: 'ID', value: 'idCliente' },
                { heading: 'Nome', value: 'nomeCliente' },
                { heading: 'CPF / CNPJ', value: 'cpfCnpj' },
                { heading: 'Celular', value: 'celularCliente' }
              ]
        }
        this.handlePageClick = this.handlePageClick.bind(this);
        props.funcNav(true);
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });
    };

    loadMoreData() {
		const data = this.state.orgtableData;
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

        this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
    }

    componentDidMount(){
        this.getData("");
    }

    componentDidUpdate() {
    }

    componentWillUnmount(){
    }

    getData(valor) {
        fetch('http://localhost:3000/api/clientes/'+valor,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }
        )
        .then(resposta => resposta.json())
        .then(dados => {
            const clientes = dados.result;
            var slice = clientes.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState(() => {
                return {
                pageCount: Math.ceil(clientes.length / this.state.perPage),
                orgtableData : clientes,
                tableData:slice
                }
            });
        });
    }

    deletarCliente = (id) => {
        fetch("http://localhost:3000/api/cliente/"+id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
                
            } else {
                // alert("Não foi possível deletar o Cliente.")
                this.alertLogin();
            }
        })

        this.fecharModalExcluir()
        this.fecharModalDetalhar()
    }
    
    incluirCliente = (cliente) => {
        fetch("http://localhost:3000/api/cliente", {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type':'application/x-www-form-urlencoded',
            },
            body: qs.stringify(cliente)
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
            } else {
                alert('Não foi possível incluir o cliente!')
            }
        })
        this.fecharModalIncluir()
    }

    atualizarCliente = (cliente) => {
        fetch("http://localhost:3000/api/cliente/"+cliente.idCliente, {
            method: 'PUT',
            headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),},
            body: qs.stringify(cliente)
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
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

    fecharModalExcluir = () => {
        this.setState(
            {
                modalExcluir:false
            }
        )
    }

    abrirModalExcluir = () => {
        this.setState(
            {
                modalExcluir:true,
            }
        )
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

    atualizaInput = () => {
        this.setState(
            {
                input: false
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

    handleChange = (e) => {
        if(!e.target.value){
        this.getData("");
            return
        }
        this.getData(e.target.value);
    }
      
    render(){
        return(
            <div className="container">
                <Header state={this.state} handleChange={this.handleChange} abrirModalIncluir={this.abrirModalIncluir} />
                <Listagem state={this.state} abrirModalDetalhar={this.abrirModalDetalhar}/>
                <ModalIncluir
                state={this.state} fecharModalIncluir={this.fecharModalIncluir} incluir={this.incluir} atualizaNome={this.atualizaNome}
                atualizaCpf={this.atualizaCpf} atualizaCelular={this.atualizaCelular} atualizaTelefone={this.atualizaTelefone}
                atualizaCep={this.atualizaCep} atualizaEndereco={this.atualizaEndereco}
                atualizaNumero={this.atualizaNumero} atualizaBairro={this.atualizaBairro}
                atualizaCidade={this.atualizaCidade} atualizaUf={this.atualizaUf}
                atualizaComplemento={this.atualizaComplemento}
                />
                <ModalDetalhar
                state={this.state} fecharModalDetalhar={this.fecharModalDetalhar} abrirModalExcluir={this.abrirModalExcluir} 
                atualizaInput={this.atualizaInput} salvar={this.salvar} atualizaNome={this.atualizaNome}
                atualizaCpf={this.atualizaCpf} atualizaCelular={this.atualizaCelular} atualizaTelefone={this.atualizaTelefone}
                atualizaCep={this.atualizaCep} atualizaEndereco={this.atualizaEndereco} atualizaNumero={this.atualizaNumero}
                atualizaBairro={this.atualizaBairro} atualizaCidade={this.atualizaCidade} atualizaUf={this.atualizaUf}
                atualizaComplemento={this.atualizaComplemento}
                />
                <ModalExcluir state={this.state} fecharModalExcluir={this.fecharModalExcluir} deletarCliente={this.deletarCliente} />
                <Paginator state={this.state} handlePageClick={this.handlePageClick}/>
            </div>
        )
    }
}

export default Clientes;