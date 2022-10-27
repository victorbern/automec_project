import React from "react";
import './style.css'
import qs from 'qs'
import Paginator from "../Paginator/Paginator";
import ModalIncluir from "./ModalIncluir";
import ModalDetalhar from "./ModalDetalhar";
import ModalExcluir from "./ModalExcluir";
import Header from "../Header/Header";
import Listagem from "../Listagem/Listagem";

class Funcionarios extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            idFuncionario: 0, nomeFuncionario: '', funcao: '', isAtivo:'Sim', input: false, modalIncluir:false, modalDetalhar:false,
            modalExcluir:false, tituloClasse: 'Funcionários', offset: 0, tableData: [], orgtableData: [], perPage: 10, currentPage: 0, 
            pageCount: 0, sim:true, nao:false,
            column: [
                { heading: 'ID', value: 'idFuncionario' },
                { heading: 'Nome', value: 'nomeFuncionario' },
                { heading: 'Função', value: 'funcao' },
                { heading: 'Ativo', value: 'isAtivo' },
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
        fetch('http://localhost:3000/api/funcionarios/'+valor,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(resposta => resposta.json())
        .then(dados => {
            const funcionarios = dados.result;
            var slice = funcionarios.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState(() => {
                return {
                pageCount: Math.ceil(funcionarios.length / this.state.perPage),
                orgtableData : funcionarios,
                tableData:slice
                }
            });
        });
    }

    deletarFuncionario = (id) => {
        fetch("http://localhost:3000/api/funcionario/"+id, {method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
                
            } else {
                alert("Não foi possível deletar o Funcionário.")
            }
        })
        this.fecharModalExcluir()
        this.fecharModalDetalhar()
    }
    
    incluirFuncionario = (funcionario) => {
        fetch("http://localhost:3000/api/funcionario", {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),},
            body: qs.stringify(funcionario)
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
            } else {
                alert('Não foi possível incluir o funcionário!')
            }
        })
        this.fecharModalIncluir()
    }

    atualizarFuncionario = (funcionario) => {
        fetch("http://localhost:3000/api/funcionario/"+funcionario.idFuncionario, {
            method: 'PUT',
            headers: {'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),},
            body: qs.stringify(funcionario)
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
            } else {
                alert('Não foi possível atualizar o funcionário!')
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
        this.zerarFuncionarioState()
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
        this.zerarFuncionarioState()
    }

    abrirModalDetalhar = (funcionario) => {
        let sim = true;
        let nao = false;
        if(funcionario.isAtivo === 'Não'){
            nao = true;
            sim = false;
        }
        this.setState(
            {
                modalDetalhar:true,
                idFuncionario: funcionario.idFuncionario,
                nomeFuncionario: funcionario.nomeFuncionario,
                funcao: funcionario.funcao,
                isAtivo:funcionario.isAtivo,
                input: true,
                nao: nao,
                sim: sim
            }
        )
    }

    atualizaNomeFuncionario = (e) => {
        this.setState(
            {
                nomeFuncionario: e.target.value
            }
        )
    }

    atualizaFuncao = (e) => {
        this.setState(
            {
                funcao: e.target.value
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

    atualizaSRadio = (e) => {
        this.setState(
            {
                sim: e.target.checked,
                nao: !e.target.checked
            }
        )
    }

    atualizaNRadio = (e) => {
        this.setState(
            {
                nao: e.target.checked,
                sim: !e.target.checked
            }
        )
    }

    incluir = () => {
        let ativo = 'Sim';
        if(this.state.nao === true){
            ativo = 'Não';
        }
        const funcionario = {
            nomeFuncionario: this.state.nomeFuncionario,
            funcao: this.state.funcao,
            isAtivo:ativo,
    }
    this.incluirFuncionario(funcionario)
    }

    salvar = () => {
    let ativo = 'Sim';
    if(this.state.nao === true){
        ativo = 'Não';
    }
    const funcionario = {
        idFuncionario: this.state.idFuncionario,
        nomeFuncionario: this.state.nomeFuncionario,
        funcao: this.state.funcao,
        isAtivo:ativo,
    }
        this.atualizarFuncionario(funcionario)
    }

    zerarFuncionarioState = () => {
        this.setState(
            {
            idFuncionario: 0,
            nomeFuncionario: '',
            funcao: '',
            isAtivo:true,
            sim: true,
            nao: false
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
                atualizaNomeFuncionario={this.atualizaNomeFuncionario} atualizaFuncao={this.atualizaFuncao}
                atualizaSRadio={this.atualizaSRadio} atualizaNRadio={this.atualizaNRadio}
                />
                <ModalDetalhar state={this.state} fecharModalDetalhar={this.fecharModalDetalhar} abrirModalExcluir={this.abrirModalExcluir} 
                atualizaInput={this.atualizaInput} salvar={this.salvar} atualizaNomeFuncionario={this.atualizaNomeFuncionario} 
                atualizaFuncao={this.atualizaFuncao} atualizaSRadio={this.atualizaSRadio} atualizaNRadio={this.atualizaNRadio}
                />
                <ModalExcluir state={this.state} fecharModalExcluir={this.fecharModalExcluir} deletarFuncionario={this.deletarFuncionario} />
                <Paginator state={this.state} handlePageClick={this.handlePageClick}/>
            </div>
        )
    }
}

export default Funcionarios;