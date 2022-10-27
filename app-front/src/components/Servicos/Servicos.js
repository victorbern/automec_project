import React from "react";
import './style.css'
import qs from 'qs'
import Paginator from "../Paginator/Paginator";
import ModalIncluir from "./ModalIncluir";
import ModalDetalhar from "./ModalDetalhar";
import ModalExcluir from "./ModalExcluir";
import Header from "../Header/Header";
import Listagem from "../Listagem/Listagem";

class Servicos extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            idServico: 0, descricaoServico: '', precoServico: '', input: false, modalIncluir:false, modalDetalhar:false,
            modalExcluir:false, tituloClasse: 'Serviços', offset: 0, tableData: [], orgtableData: [], perPage: 10, currentPage: 0, 
            pageCount: 0, 
            column: [
                { heading: 'ID', value: 'idServico' },
                { heading: 'Descrição', value: 'descricaoServico' },
                { heading: 'Preço', value: 'precoServico' },
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
        fetch('http://localhost:3000/api/servicos/'+valor,
        {
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(resposta => resposta.json())
        .then(dados => {
            const servicos = dados.result;
            var slice = servicos.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState(() => {
                return {
                pageCount: Math.ceil(servicos.length / this.state.perPage),
                orgtableData : servicos,
                tableData:slice
                }
            });
        });
    }

    deletarServico = (id) => {
        fetch("http://localhost:3000/api/servico/"+id, {method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }})
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
                
            } else {
                alert("Não foi possível deletar o Serviço.")
            }
        })
        this.fecharModalExcluir()
        this.fecharModalDetalhar()
    }
    
    incluirServico = (servico) => {
        fetch("http://localhost:3000/api/servico", {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),},
            body: qs.stringify(servico)
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
            } else {
                alert('Não foi possível incluir o serviço!')
            }
        })
        this.fecharModalIncluir()
    }

    atualizarServico = (servico) => {
        fetch("http://localhost:3000/api/servico/"+servico.idServico, {
            method: 'PUT',
            headers: {'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),},
            body: qs.stringify(servico)
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
            } else {
                alert('Não foi possível atualizar o serviço!')
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
        this.zerarServicoState()
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
        this.zerarServicoState()
    }

    abrirModalDetalhar = (servico) => {
        this.setState(
            {
                modalDetalhar:true,
                idServico: servico.idServico,
                descricaoServico: servico.descricaoServico,
                precoServico: servico.precoServico,
                input: true,
            }
        )
    }

    atualizaDescricaoServico = (e) => {
        this.setState(
            {
                descricaoServico: e.target.value
            }
        )
    }

    atualizaPrecoServico = (e) => {
        this.setState(
            {
                precoServico: e.target.value
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
        const servico = {
            descricaoServico: this.state.descricaoServico,
            precoServico: this.state.precoServico
    }
    this.incluirServico(servico)
    }

    salvar = () => {
            const servico = {
                idServico: this.state.idServico,
                descricaoServico: this.state.descricaoServico,
                precoServico: this.state.precoServico
            }
            this.atualizarServico(servico)
    }

    zerarServicoState = () => {
        this.setState(
            {
            idServico: 0,
            descricaoServico: '',
            precoServico: ''
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
                <ModalIncluir state={this.state} fecharModalIncluir={this.fecharModalIncluir} incluir={this.incluir} 
                atualizaDescricaoServico={this.atualizaDescricaoServico} atualizaPrecoServico={this.atualizaPrecoServico}
                />
                <ModalDetalhar state={this.state} fecharModalDetalhar={this.fecharModalDetalhar} abrirModalExcluir={this.abrirModalExcluir} 
                atualizaInput={this.atualizaInput} salvar={this.salvar} atualizaDescricaoServico={this.atualizaDescricaoServico} 
                atualizaPrecoServico={this.atualizaPrecoServico}
                />
                <ModalExcluir state={this.state} fecharModalExcluir={this.fecharModalExcluir} deletarServico={this.deletarServico} />
                <Paginator state={this.state} handlePageClick={this.handlePageClick}/>
            </div>
        )
    }
}

export default Servicos;