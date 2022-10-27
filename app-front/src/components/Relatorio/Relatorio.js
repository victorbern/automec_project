import React, {useEffect, useState} from "react";
import './style.css'
import Paginator from "../Paginator/Paginator";
import ModalDetalhar from "./ModalDetalhar";
import Listagem from "../Listagem/Listagem";
import qs from 'qs'

import clientesPDF from "./Reports/clientes";
import pagamentosPDF from "./Reports/pagamentos";
import produtosPDF from "./Reports/produtos";
import ordensServicoPDF from "./Reports/ordens-servico";

class Relatorio extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            descricao: '', input: false, modalDetalhar:false, tituloClasse: 'Relatórios', dataDe:'', dataAte:'',idRelatorio:'',
            offset: 0, clientes:[], pagamentos:[], produtos:[],os:[],emitir: false, relatorio:{
                dataDe:"2022-10-15 01:23:38", dataAte:"2022-10-22 01:49:59"
            }, tableData: [
               {id: 1, descricao: "Relatório de Pagamentos por espécie"},{id: 2, descricao: "Relatório de Produtos mais vendidos"}, 
               {id: 3, descricao: "Relatório de Ordem de Serviços pagas e não pagas"}
            ], orgtableData: [], perPage: 10, currentPage: 0, pageCount: 0,
            column: [
                { heading: 'Descrição', value: 'descricao' },
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
        // this.getData("");
        // this.getPagamentos();
    }

    componentDidUpdate() {
        // const dateDeStr = new Date(this.state.dataDe).toISOString();
        // const dateAteStr = new Date(this.state.dataAte).toISOString();

        // let relatorio = {
        //     dataDe: dateDeStr,
        //     dataAte: dateAteStr,
        // }
        // this.getData("");
        // if(this.state.emitir) {
        this.getPagamentos();
        // }
        this.getProdutos();
        this.getOs();
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
            this.setState(() => {
                return {
                clientes : clientes,
                }
            });
        });
    }

    getPagamentos() {
        // const data = new Date();
        // const dia = String(data.getDate()).padStart(2, '0');
        // const mes = String(data.getMonth() + 1).padStart(2, '0');
        // const ano = data.getFullYear();
        // let dataAtual = dia + '/' + mes + '/' + ano;

        let dataDe = this.state.dataDe;
        let dataAte = this.state.dataAte;
        // if(!dataDe || !dataAte){
        //     dataDe= dataAtual;
        //     dataAte=dataAtual;

        // }

        fetch("http://localhost:3000/api/relatorio/pagamentos", {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type':'application/x-www-form-urlencoded',
            },
            body: qs.stringify({dataDe: dataDe, dataAte: dataAte})
        })
        .then(resposta => resposta.json())
        .then(dados => {
            const pagamentos = dados.result;
            this.setState(() => {
                return {
                pagamentos: pagamentos,
                }
            });
        });
    }

    getProdutos() {

        let dataDe = this.state.dataDe;
        let dataAte = this.state.dataAte;

        fetch("http://localhost:3000/api/relatorio/produtos", {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type':'application/x-www-form-urlencoded',
            },
            body: qs.stringify({dataDe: dataDe, dataAte: dataAte})
        })
        .then(resposta => resposta.json())
        .then(dados => {
            const produtos = dados.result;
            this.setState(() => {
                return {
                produtos: produtos,
                }
            });
        });
    }

    getOs() {

        let dataDe = this.state.dataDe;
        let dataAte = this.state.dataAte;

        fetch("http://localhost:3000/api/relatorio/ordens-servico", {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type':'application/x-www-form-urlencoded',
            },
            body: qs.stringify({dataDe: dataDe, dataAte: dataAte})
        })
        .then(resposta => resposta.json())
        .then(dados => {
            const os = dados.result;
            this.setState(() => {
                return {
                os: os,
                }
            });
        });
    }

    fecharModalDetalhar = () => {
        this.setState(
            {
                modalDetalhar:false,
            }
        )
        this.zerarRelatorioState()
    }

    abrirModalDetalhar = (r) => {
        this.setState(
            {
                modalDetalhar:true,
                idRelatorio: r.id
            }
        )
    }

    atualizaDataDe = (e) => {
        if(e !== null) {
            if((e.toString().length) > 28){
                this.setState(
                    {
                        dataDe: new Date(e).toISOString(),
                        // dataDe: e,
                    }
                )
            }
        }
    }

    atualizaDataAte = (e) => {
        if(e !== null) {
            if((e.toString().length) > 28){
                this.setState(
                    {
                        dataAte: new Date(e).toISOString(),
                        // dataAte: e,
                    }
                )
            }
        }
    }

    atualizaInput = () => {
        this.setState(
            {
                input: false
            }
        )
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

    atualizaData = (relatorio) => {
        this.setState(() => {
            return {
                relatorio: relatorio,
            }
        });

    }

    emitir = () => {
        // alert(this.state.dataDe)
        // this.setState(
        //     {
        //         emitir: true
        //     }
        // )

        // let dataDe = this.state.dataDe;
        // let dataAte = this.state.dataAte;
        // let dataDe = this.state.dataDe;
        // let dataAte = this.state.dataAte;
        // if(!dataDe || !dataAte){
        //     dataDe= dataAtual;
        //     dataAte=dataAtual;

        // }

            // fetch("http://localhost:3000/api/relatorio/pagamentos", {
            //     method: 'POST',
            //     headers: {
            //     'Authorization': 'Bearer ' + localStorage.getItem('token'),
            //     'Content-Type':'application/x-www-form-urlencoded',
            //     },
            //     body: qs.stringify({dataDe, dataAte})
            // })
            // .then( resposta => resposta.json())
            // .then( dados => {
            //     const pagamentos = dados.result;
            //     pagamentosPDF(pagamentos);
            // });
        // pagamentosPDF(this.state.dataDe,this.state.dataAte);

       
        // this.componentDidUpdate(
        //   this.getPagamentos();
        // )

//        if(this.state.idRelatorio == 1){
  //          pagamentosPDF(this.state.pagamentos);
    //    }

        switch (this.state.idRelatorio) {
            case 1:
                pagamentosPDF(this.state.pagamentos);
                break;
            case 2:
                produtosPDF(this.state.produtos);
                break;
            case 3:
                ordensServicoPDF(this.state.os);
                break;
          }

        // }
        // clientesPDF(this.state.clientes);
    }

    zerarRelatorioState = () => {
        this.setState(
            {
            dataAte: '',
            dataDe: '',
            idRelatorio: ''
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
                <div id="titulo"className="titulo">
                    <h2>{this.state.tituloClasse}</h2>
                    <div class="line"></div>
                </div>
                <Listagem state={this.state} abrirModalDetalhar={this.abrirModalDetalhar}/>
                <ModalDetalhar
                state={this.state} fecharModalDetalhar={this.fecharModalDetalhar} atualizaDataDe={this.atualizaDataDe}
                atualizaDataAte={this.atualizaDataAte} emitir={this.emitir}
                />
                <Paginator state={this.state} handlePageClick={this.handlePageClick}/>
            </div>
        )
    }
}

export default Relatorio;