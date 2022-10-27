import React from "react";
import './style.css'
import qs from 'qs'
import Paginator from "../Paginator/Paginator";
import Header from "../Header/Header";
import Listagem from "../Listagem/Listagem";
import ModalDetalhar from "./ModalDetalhar";
import ModalExcluir from "./ModalExcluir";
import ModalIncluir from "./ModalIncluir";

class Veiculos extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            placa: '',
            marca: '',
            modelo: '',
            ano: '',
            capacidadeOleo: '',
            cor: '',
            idCliente:'',
            nomeCliente: '',
            celularCliente:'',
            input: false,
            modalIncluir:false,
            modalDetalhar:false,
            modalExcluir:false,
            tituloClasse: 'Veículos',
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 10,
            currentPage: 0,
            clientes: [],
            pageCount: 0,
            column: [
                { heading: 'Placa', value: 'placaVeiculo' },
                { heading: 'Marca', value: 'marca' },
                { heading: 'Modelo', value: 'modelo' },
                { heading: 'Capacidade de Óleo', value: 'capacidadeOleo' }
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
        this.getClientes("");
    }

    componentDidUpdate() {
    }

    componentWillUnmount(){
    }

    getData(valor) {
        fetch('http://localhost:3000/api/veiculos/'+valor,
        {
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(resposta => resposta.json())
        .then(dados => {
            const veiculos = dados.result;
            var slice = veiculos.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState(() => {
                return {
                pageCount: Math.ceil(veiculos.length / this.state.perPage),
                orgtableData : veiculos,
                tableData:slice
                }
            });
        });
    }

    getClientes(valor){
        fetch('http://localhost:3000/api/clientes/'+valor,
        {
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(resposta => resposta.json())
        .then(dados => {
            const clientes = dados.result;
            this.setState(() => {
                return {
                clientes: clientes
                }
            });
        });
    }

    deletarVeiculo = (placaVeiculo) => {
        fetch("http://localhost:3000/api/veiculo/"+placaVeiculo, {method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }})
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
            } else {
                alert("Não foi possível deletar o Veículo.")
            }
        })
        this.fecharModalExcluir()
        this.fecharModalDetalhar()
    }

    incluirVeiculo = (veiculo) => {
        fetch("http://localhost:3000/api/veiculo", {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),},
            body: qs.stringify(veiculo)
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
            } else {
                alert('Não foi possível incluir o Veiculo!')
            }
        })
        this.fecharModalIncluir()
    }

    atualizarVeiculo = (veiculo) => {
        fetch("http://localhost:3000/api/veiculo/"+veiculo.placaVeiculo, {
            method: 'PUT',
            headers: {'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),},
            body: qs.stringify(veiculo)
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
            } else {
                alert('Não foi possível atualizar o Veiculo!')
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
        this.zerarVeiculoState()

    }

    abrirModalIncluir = () => {
        this.setState(
            {
                modalIncluir:true,
            }
        )
        this.zerarVeiculoState()
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
                input: false
            }
        )
        this.zerarVeiculoState()
    }

    abrirModalDetalhar = (veiculo) => {
        this.setState(
            {
                modalDetalhar:true,
                placa: veiculo.placaVeiculo,
                marca: veiculo.marca,
                modelo: veiculo.modelo,
                ano: veiculo.ano,
                capacidadeOleo: veiculo.capacidadeOleo,
                cor: veiculo.cor,
                idCliente:veiculo.veiculo_idCliente,
                nomeCliente: veiculo.nomeCliente,
                celularCliente: veiculo.celularCliente,
                input: true,
            }
        )
    }

    atualizaPlaca = (e) => {
        this.setState(
            {
                placa: e.target.value
            }
        )
    }

    atualizaMarca = (e) => {
        this.setState(
            {
                marca: e.target.value
            }
        )
    }

    atualizaModelo = (e) => {
        this.setState(
            {
                modelo: e.target.value
            }
        )
    }

    atualizaAno = (e) => {
        this.setState(
            {
                ano: e.target.value
            }
        )
    }

    atualizaCapacidadeOleo = (e) => {
        this.setState(
            {
                capacidadeOleo: e.target.value
            }
        )
    }

    atualizaCor = (e) => {
        this.setState(
            {
                cor: e.target.value
            }
        )
    }

    atualizaVeiculo_idCliente = (e) => {
        this.setState( () => 
            {
                return{
                    idCliente: e
                }
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

    atualizaCamposAC = (cliente) => {      
        const valor = (cliente.target.value);
        const campos = valor.split(" - ");
        this.setState(
            {
                idCliente: campos[0],
                nomeCliente: campos[1],
                celularCliente: campos[2]
            }
        )
    }

    incluir = () => {
        const veiculo = {
                placaVeiculo: this.state.placa,
                marca: this.state.marca,
                modelo: this.state.modelo,
                ano: this.state.ano,
                capacidadeOleo: this.state.capacidadeOleo,
                cor: this.state.cor,
                veiculo_idCliente:this.state.idCliente,
    }
    this.incluirVeiculo(veiculo)
    }

    salvar = () => {
        const veiculo = {
            placaVeiculo: this.state.placa,
            marca: this.state.marca,
            modelo: this.state.modelo,
            ano: this.state.ano,
            capacidadeOleo: this.state.capacidadeOleo,
            cor: this.state.cor,
            veiculo_idCliente:this.state.idCliente,
}
            this.atualizarVeiculo(veiculo)
    }

    zerarVeiculoState = () => {
        this.setState(
            {
            placa: '',
            marca: '',
            modelo: '',
            ano: null,
            capacidadeOleo: null,
            cor: '',
            nomeCliente: '',
            celularCliente: '',
            idCliente:0,
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
                <ModalIncluir state={this.state} fecharModalIncluir={this.fecharModalIncluir}
                incluir={this.incluir} atualizaPlaca={this.atualizaPlaca} atualizaMarca={this.atualizaMarca}
                atualizaModelo={this.atualizaModelo} atualizaAno={this.atualizaAno}
                atualizaCapacidadeOleo={this.atualizaCapacidadeOleo} atualizaCor={this.atualizaCor}
                atualizaCamposAC={this.atualizaCamposAC} />
                <ModalDetalhar  state={this.state} fecharModalDetalhar={this.fecharModalDetalhar}
                salvar={this.salvar} atualizaPlaca={this.atualizaPlaca} 
                atualizaMarca={this.atualizaMarca} atualizaModelo={this.atualizaModelo}
                atualizaAno={this.atualizaAno} atualizaCapacidadeOleo={this.atualizaCapacidadeOleo}
                atualizaCor={this.atualizaCor} atualizaCamposAC={this.atualizaCamposAC}
                abrirModalExcluir={this.abrirModalExcluir} atualizaInput={this.atualizaInput}  />
                <ModalExcluir state={this.state} fecharModalExcluir={this.fecharModalExcluir} deletarVeiculo={this.deletarVeiculo} />
                <Paginator state={this.state} handlePageClick={this.handlePageClick}/>
            </div>
        )
    }

}

export default Veiculos;