import React from "react";
import './style.css'
import qs from 'qs'
import Paginator from "../Paginator/Paginator";
import ModalIncluir from "./ModalIncluir";
import ModalDetalhar from "./ModalDetalhar";
import ModalExcluir from "./ModalExcluir";
import ModalMovimentar from "./ModalMovimentar";
import Header from "../Header/Header";
import Listagem from "../Listagem/Listagem";

class Produtos extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            /*idProduto: 0,*/ codigoBarras: '', descricao: '', valorCusto: 0, quantidadeEstoque: 0, precoVenda: 0,
            input: false, modalIncluir:false, modalDetalhar:false, modalExcluir:false, modalMovimentar: false,
            movimento:'', entradaRadio:true, saidaRadio:false,tituloClasse: 'Produtos', offset: 0, 
            tableData: [], orgtableData: [], perPage: 10, currentPage: 0, 
            pageCount: 0, 
            column: [
                { heading: 'Código de Barras', value: 'codigoBarras' },
                { heading: 'Descrição', value: 'descricao' },
                { heading: 'Preço', value: 'precoVenda' },
                { heading: 'Estoque', value: 'quantidadeEstoque' },
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
        fetch('http://localhost:3000/api/produtos/'+valor,
        {
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(resposta => resposta.json())
        .then(dados => {
            const produtos = dados.result;
            var slice = produtos.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState(() => {
                return {
                pageCount: Math.ceil(produtos.length / this.state.perPage),
                orgtableData : produtos,
                tableData:slice
                }
            });
        });
    }

    deletarProduto = (id) => {
        fetch("http://localhost:3000/api/produto/"+id, {method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }})
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
                
            } else {
                alert("Não foi possível deletar o Produto.")
            }
        })
        this.fecharModalExcluir()
        this.fecharModalDetalhar()
    }
    
    incluirProduto = (produto) => {
        fetch("http://localhost:3000/api/produto", {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),},
            body: qs.stringify(produto)
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
            } else {
                alert('Não foi possível incluir o produto!')
            }
        })
        this.fecharModalIncluir()
    }

    atualizarProduto = (produto) => {
        fetch("http://localhost:3000/api/produto/"+produto.codigoBarras, {
            method: 'PUT',
            headers: {'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),},
            body: qs.stringify(produto)
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
            } else {
                alert('Não foi possível atualizar o produto!')
            }
        })
        this.fecharModalDetalhar()
    }

    atualizarEstoque = (produto) => {
        fetch("http://localhost:3000/api/alterar-estoque/"+produto.codigoBarras, {
            method: 'PUT',
            headers: {'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),},
            body: qs.stringify(produto)
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
            } else {
                alert('Não foi possível atualizar o estoque!')
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
        this.zerarState()
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

    fecharModalMovimentar = () => {
        this.setState(
            {
                modalMovimentar:false,
                movimento:'',
                entradaRadio:false,
                saidaRadio:false
            }
        )
    }

    abrirModalMovimentar = () => {
        this.setState(
            {
                modalMovimentar:true,
            }
        )
    }

    fecharModalDetalhar = () => {
        this.setState(
            {
                modalDetalhar:false,
            }
        )
        this.zerarState()
    }

    abrirModalDetalhar = (produto) => {
        this.setState(
            {
                modalDetalhar:true,
                // idProduto: produto.idProduto,
                codigoBarras: produto.codigoBarras,
                descricao: produto.descricao, 
                valorCusto: produto.valorCusto, 
                quantidadeEstoque: produto.quantidadeEstoque, 
                precoVenda: produto.precoVenda,
                input: true,
            }
        )
    }

    atualizaCodigoBarras = (e) => {
        this.setState(
            {
                codigoBarras: e.target.value
            }
        )
    }

    atualizaDescricao = (e) => {
        this.setState(
            {
                descricao: e.target.value
            }
        )
    }

    atualizaValorCusto = (e) => {
        this.setState(
            {
                valorCusto: e.target.value
            }
        )
    }

    atualizaQuantidadeEstoque = (e) => {
        this.setState(
            {
                quantidadeEstoque: e.target.value
            }
        )
    }

    atualizPrecoVenda = (e) => {
        this.setState(
            {
                precoVenda: e.target.value
            }
        )
    }

    atualizaMovimento = (e) => {
        this.setState(
            {
                movimento: e.target.value
            }
        )
    }

    atualizaEntradaRadio = (e) => {
        this.setState(
            {
                entradaRadio: e.target.checked,
                saidaRadio: !e.target.checked
            }
        )
    }

    atualizaSaidaRadio = (e) => {
        this.setState(
            {
                saidaRadio: e.target.checked,
                entradaRadio: !e.target.checked
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
        const produto = {
            codigoBarras: this.state.codigoBarras,
            descricao: this.state.descricao, 
            valorCusto: this.state.valorCusto, 
            quantidadeEstoque: this.state.quantidadeEstoque, 
            precoVenda: this.state.precoVenda
        }
        this.incluirProduto(produto)
    }

    salvar = () => {
        const produto = {
            // idProduto: this.state.idProduto,
            codigoBarras: this.state.codigoBarras,
            descricao: this.state.descricao, 
            valorCusto: this.state.valorCusto, 
            quantidadeEstoque: this.state.quantidadeEstoque, 
            precoVenda: this.state.precoVenda
        }
        this.atualizarProduto(produto)
    }

    movimentarProduto = () => {
        let movimento = this.state.movimento;

        if(this.state.saidaRadio === true){
            movimento = movimento * -1;
        }
        
        const produto = {
            // idProduto: this.state.idProduto,
            codigoBarras: this.state.codigoBarras,
            valorAlteracao: movimento
        }

        this.atualizarEstoque(produto)
    }

    zerarState = () => {
        this.setState(
            {

                codigoBarras: '', 
                descricao: '',
                valorCusto: 0, 
                quantidadeEstoque: 0, 
                precoVenda: 0
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
                atualizaCodigoBarras={this.atualizaCodigoBarras} atualizaDescricao={this.atualizaDescricao}
                atualizaValorCusto={this.atualizaValorCusto} atualizaQuantidadeEstoque={this.atualizaQuantidadeEstoque}
                atualizPrecoVenda={this.atualizPrecoVenda}
                />
                <ModalDetalhar state={this.state} fecharModalDetalhar={this.fecharModalDetalhar} abrirModalExcluir={this.abrirModalExcluir} 
                atualizaInput={this.atualizaInput} salvar={this.salvar} atualizaCodigoBarras={this.atualizaCodigoBarras} 
                atualizaDescricao={this.atualizaDescricao} atualizaValorCusto={this.atualizaValorCusto} 
                atualizaQuantidadeEstoque={this.atualizaQuantidadeEstoque} atualizPrecoVenda={this.atualizPrecoVenda}
                abrirModalMovimentar={this.abrirModalMovimentar} 
                />
                <ModalMovimentar state={this.state} fecharModalMovimentar={this.fecharModalMovimentar} movimentar={this.movimentar}
                atualizaMovimento={this.atualizaMovimento} movimentarProduto={this.movimentarProduto}
                atualizaEntradaRadio={this.atualizaEntradaRadio} atualizaSaidaRadio={this.atualizaSaidaRadio}
                />
                <ModalExcluir state={this.state} fecharModalExcluir={this.fecharModalExcluir} deletarProduto={this.deletarProduto} />
                <Paginator state={this.state} handlePageClick={this.handlePageClick}/>
            </div>
        )
    }
}

export default Produtos;