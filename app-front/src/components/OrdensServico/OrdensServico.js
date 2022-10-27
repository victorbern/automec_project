import React from "react";
import './style.css'
import qs from 'qs'
import Paginator from "../Paginator/Paginator";
import ModalIncluir from "./ModalIncluir";
import ModalDetalhar from "./ModalDetalhar";
import ModalExcluir from "./ModalExcluir";
import Header from "../Header/Header";
import Listagem from "../Listagem/Listagem";
// import AlertWarning from "../Alerts/AlertWarning";

class OrdensServico extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            idOrdemServico: 0, total: 0, km: '', isFinalizada:false, isPaga:false, data:'',
            idCliente: '', nomeCliente:'', celularCliente:'',
            placaVeiculo:'', modelo: '', abrirAlert:true,
            codigoBarras:'', descricao: '', precoUnitario:'',precoVenda:'', quantidadeVendida:'', precoTotal:0,
            idServico:'', descricaoServico:'', precoServico:'', observacao:'', idFuncionario:'', nomeFuncionario:'',
            clientes:[], veiculos:[], produtos:[], servicos:[], funcionarios: [],
            produtosVendidos:[], servicosPrestados:[], 
            input: false, modalIncluir:false, modalDetalhar:false, modalExcluir:false,veiculoEscolha:false, clearP:false,clearS:false,
            tituloClasse: 'Ordens de Serviços', offset: 0, tableData: [], orgtableData: [], perPage: 10, currentPage: 0, 
            pageCount: 0, 
            column: [
                { heading: 'Código', value: 'idOrdemServico' },
                { heading: 'Data', value: 'data' },
                { heading: 'Cliente', value: 'cliente.nomeCliente' },
                { heading: 'Veículo', value: 'veiculo.modelo' },
                { heading: 'Placa', value: 'veiculo.placaVeiculo' },
                { heading: 'Total', value: 'total' },
              ]
        }
        this.handlePageClick = this.handlePageClick.bind(this);
        props.funcNav(true);

    }

    atualizaAlert = (a) => {
        this.setState({
            abrirAlert:a
        })
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
        this.getVeiculosPorClientes(this.state.idCliente);
        this.getProdutos("");
        this.getServicos("");
        this.getFuncionarios("");

    }

    componentDidUpdate() {
        this.getVeiculosPorClientes(this.state.idCliente);
        this.atualizaSubTotal();
        this.getProdutos("");
    }

    componentWillUnmount(){
    }

    getData(valor) {
        fetch('http://localhost:3000/api/ordens-servico/'+valor,
        {
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(resposta => resposta.json())
        .then(dados => {
            const ordensServico = dados.result;
            ordensServico.map((os) => {
                let data = new Date((os.data).split("T")[0]);
                os.data = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
            });

            var slice = ordensServico.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState(() => {
                return {
                pageCount: Math.ceil(ordensServico.length / this.state.perPage),
                orgtableData : ordensServico,
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
                clientes: clientes,
                placaVeiculo:'', modelo: '',
                }
            });
        });
    }

    getVeiculosPorClientes(valor){
        fetch('http://localhost:3000/api/veiculo-por-cliente/'+valor,
        {
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(resposta => resposta.json())
        .then(dados => {
            const veiculos = dados.result;
            this.setState(() => {
                return {
                veiculos: veiculos
                }
            });
        });
    }

    getProdutos(valor) {
        fetch('http://localhost:3000/api/produtos/'+valor,
        {
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(resposta => resposta.json())
        .then(dados => {
            const produtos = dados.result;
            this.setState(() => {
                return {
                produtos : produtos
                }
            });
        });
    }

    getServicos(valor) {
        fetch('http://localhost:3000/api/servicos/'+valor,
        {
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(resposta => resposta.json())
        .then(dados => {
            const servicos = dados.result;
            this.setState(() => {
                return {
                servicos : servicos,
                }
            });
        });
    }

    getFuncionarios(valor) {
        fetch('http://localhost:3000/api/funcionarios/'+valor,
        {
            headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(resposta => resposta.json())
        .then(dados => {
            const funcionarios = dados.result;
            this.setState(() => {
                return {
                funcionarios : funcionarios
                }
            });
        });
    }

    deletarOrdemServico = (id) => {
        fetch("http://localhost:3000/api/ordem-servico/"+id, {method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }})
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
                
            } else {
                alert("Não foi possível deletar o Ordem de Serviço.")
            }
        })
        this.fecharModalExcluir()
        this.fecharModalDetalhar()
    }
    
    incluirOrdemServico = (ordemServico) => {
        fetch("http://localhost:3000/api/ordem-servico", {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),},
            body: qs.stringify(ordemServico)
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
            } else {
               // alert('Não foi possível incluir a Ordem de Serviço!')
               this.atualizaAlert(true)
            }
        })
        this.fecharModalIncluir()
    }

    atualizarOrdemServico = (ordemServico) => {
        fetch("http://localhost:3000/api/ordem-servico/"+ordemServico.idOrdemServico, {
            method: 'PUT',
            headers: {'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),},
            body: qs.stringify(ordemServico)
        })
        .then(resposta => {
            if(resposta.ok){
                this.getData("");
            } else {
                alert('Não foi possível atualizar a Ordem de Serviço!')
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
        this.zerarOrdemServicoState()
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
        this.zerarOrdemServicoState()
    }

    abrirModalDetalhar = (ordemServico) => {
        this.setState(
            {
                modalDetalhar:true,
                idOrdemServico: ordemServico.idOrdemServico,
                idCliente: ordemServico.cliente.idCliente,
                nomeCliente: ordemServico.cliente.nomeCliente,
                celularCliente: ordemServico.cliente.celularCliente,
                modelo: ordemServico.veiculo.modelo,
                placaVeiculo: ordemServico.veiculo.placaVeiculo,
                km: ordemServico.km,
                produtosVendidos: ordemServico.produtos,
                servicosPrestados: ordemServico.servicos,
                input: true,
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
                celularCliente: campos[2],
            }
        )
    }

    atualizaCamposACVeiculo = (veiculo) => {      
        const valor = (veiculo.target.value);
        const campos = valor.split(" - ");

        this.setState(() => {
            return {
            placaVeiculo: campos[0],
            modelo: campos[1],
            }
        });
    }

    atualizaVeiculos = () => {      

        this.setState(() => {
            return {
            veiculos:[]
            }
        });
    }

    atualizaCamposACProduto = (produto) => {      
        const valor = (produto.target.value);
        const campos = valor.split(" - ");

        const produtoSelecionado = {
            // idProduto: '',
            codigoBarras: campos[0],
            descricao: campos[1],
            quantidadeVendida: 1,
            precoUnitario: campos[2],
        }

        let inserir = false;

        this.state.produtos.map((p) => {
            if(p.codigoBarras === produtoSelecionado.codigoBarras && 
                p.descricao === produtoSelecionado.descricao && p.precoVenda == produtoSelecionado.precoUnitario){
                    // produtoSelecionado.idProduto = p.idProduto;
                    inserir = true;
            }
        });

        this.state.produtosVendidos.map((p) => {
            if(p.codigoBarras === produtoSelecionado.codigoBarras){
                inserir = false;
            }
        });

        if(inserir) {
            this.state.produtosVendidos.push(produtoSelecionado)
        }

        this.setState(() => {
            return {
                // idProduto: produtoSelecionado.idProduto,
                codigoBarras: campos[0],
                descricao: campos[1],
                quantidadeVendida: 1,
                precoVenda: campos[2],
                clearP:false
                //produtosVendidos: this.state.produtosVendidos.push(produtoSelecionado)
            }
        });
    }

    atualizaCamposACServico = (servico) => {   
        const valor = (servico.target.value);
        const campos = valor.split(" - ");

        const servicoSelecionado = {
            idServico: campos[0],
            descricaoServico: campos[1],
            precoServico: campos[2],
            idFuncionario: ''
        }

        let inserir = false;

        this.state.servicos.map((s) => {
            if(s.idServico == servicoSelecionado.idServico && 
                s.descricaoServico === servicoSelecionado.descricaoServico && s.precoServico == servicoSelecionado.precoServico){
                    inserir = true;
            }
        });

        this.state.servicosPrestados.map((s) => {
            if(s.idServico == servicoSelecionado.idServico){
                inserir = false;
            }
        });

        if(inserir) {
            this.state.servicosPrestados.push(servicoSelecionado)
        }

        this.setState(() => {
            return {
                idServico: campos[0],
                descricaoServico: campos[1],
                precoServico: campos[2],
                clearS:false
            }
        });
    }

    atualizaKm = (e) => {
        this.setState(
            {
                km: e.target.value
            }
        )
    }

    incluir = (totalVendido) => {

        let campoId = '';
        this.state.servicosPrestados.map((s) => {
            campoId = (s.idFuncionario).split(" - ")[0];
            s.idFuncionario = campoId;
        });

        const ordemServico = {           
            idCliente: this.state.idCliente,
            placaVeiculo: this.state.placaVeiculo,
            total: totalVendido,
            km: this.state.km,
            produtos: this.state.produtosVendidos,
            servicos: this.state.servicosPrestados,
        }
    this.incluirOrdemServico(ordemServico)
    }

    salvar = (totalVendido) => {
        let campoId = '';
        
        this.state.servicosPrestados.map((s) => {
            campoId = "" + s.idFuncionario;
            if(campoId.includes("-")){
                campoId = (campoId).split(" - ")[0];
            }
            s.idFuncionario = campoId;
        });

        const ordemServico = {    
            idOrdemServico: this.state.idOrdemServico,       
            idCliente: this.state.idCliente,
            placaVeiculo: this.state.placaVeiculo,
            total: totalVendido,
            km: this.state.km,
            produtos: this.state.produtosVendidos,
            servicos: this.state.servicosPrestados,
        }
            this.atualizarOrdemServico(ordemServico);
    }

    zerarOrdemServicoState = () => {
        this.setState(
            {
            idOrdemServico: 0,
            idCliente: 0,
            nomeCliente: '',
            celularCliente: '',
            modelo: '',
            placaVeiculo: '',
            km: '',
            total: '',
            produtosVendidos: [],
            servicosPrestados: [],
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

    excluirProduto = (produto) => {
        var array = this.state.produtosVendidos;
        var index = array.indexOf(produto); // Let's say it's Bob.
        delete array[index];
        // delete this.state.produtosVendidos[this.state.produtosVendidos.indexOf(produto)];
        // this.setState(() => {
        //     return {
        //         codigoBarras: "",
        //         descricaoProduto: "",
        //         quantidadeVendida: 1,
        //         precoVenda: "",
        //         //produtosVendidos: this.state.produtosVendidos.push(produtoSelecionado)
        //     }
        // });
        this.setState(() => {
            return {
                clearP:true
            }
        });
    }

    excluirServico = (servico) => {
        var array = this.state.servicosPrestados;
        var index = array.indexOf(servico);
        delete array[index];
        
        this.setState(() => {
            return {
                clearS:true
            }
        });
    }


    atualizaSubTotal = () => {

        this.state.produtosVendidos.map((p) => {
                if(p.quantidadeVendida != null && p.precoUnitario != null){
                    p.precoTotal = p.quantidadeVendida * p.precoUnitario;
                    p.precoTotal = (p.precoTotal).toFixed(2)
                }
        });

    }
      
    render(){
        return(
            <div className="container">
                <Header state={this.state} handleChange={this.handleChange} abrirModalIncluir={this.abrirModalIncluir} />
                <Listagem state={this.state} abrirModalDetalhar={this.abrirModalDetalhar}/>
                <ModalIncluir state={this.state} fecharModalIncluir={this.fecharModalIncluir} incluir={this.incluir} 
                atualizaCamposAC={this.atualizaCamposAC} atualizaCamposACVeiculo={this.atualizaCamposACVeiculo} atualizaKm={this.atualizaKm}
                atualizaCamposACProduto={this.atualizaCamposACProduto} atualizaVeiculos={this.atualizaVeiculos} excluirProduto={this.excluirProduto}
                atualizaCamposACServico={this.atualizaCamposACServico} excluirServico={this.excluirServico} atualizaSubTotal={this.atualizaSubTotal}
                />
                <ModalDetalhar state={this.state} fecharModalDetalhar={this.fecharModalDetalhar} abrirModalExcluir={this.abrirModalExcluir} 
                atualizaInput={this.atualizaInput} salvar={this.salvar} 
                atualizaCamposAC={this.atualizaCamposAC} atualizaCamposACVeiculo={this.atualizaCamposACVeiculo} atualizaKm={this.atualizaKm}
                atualizaCamposACProduto={this.atualizaCamposACProduto} atualizaVeiculos={this.atualizaVeiculos} excluirProduto={this.excluirProduto}
                atualizaCamposACServico={this.atualizaCamposACServico} excluirServico={this.excluirServico} 
                />
                <ModalExcluir state={this.state} fecharModalExcluir={this.fecharModalExcluir} deletarOrdemServico={this.deletarOrdemServico} />
                <Paginator state={this.state} handlePageClick={this.handlePageClick}/>
                {/*<AlertWarning state={this.state} atualizaAlert={this.atualizaAlert} />*/}
            </div>
        )
    }
}

export default OrdensServico;