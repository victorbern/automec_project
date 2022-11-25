import React from "react";
import "./style.css";
import qs from "qs";
import Paginator from "../Paginator/Paginator";
import ModalIncluir from "./ModalIncluir";
import ModalDetalhar from "./ModalDetalhar";
import ModalExcluir from "./ModalExcluir";
import Header from "../Header/Header";
import Listagem from "../Listagem/Listagem";
import comprovantePDF from "../Relatorio/Reports/comprovante";
import { Form, Col, Row, Button, Modal } from "react-bootstrap";

class Pagamentos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            idPagamento: 0,
            subtotal: 0,
            total: 0,
            formaPagamento: "",
            desconto: "",
            dataHora: "",
            codigoBarras: "",
            descricao: "",
            precoUnitario: "",
            precoVenda: "",
            quantidadeVendida: "",
            precoTotal: 0,
            idOrdemServico: "",
            nomeCliente: "",
            placaVeiculo: "",
            totalOS: "",
            idPg: 0,
            pagamento: "",
            gerar: false,
            comprovante: [],
            produtos: [],
            ordensServico: [],
            vendaDireta: [],
            produtosVendidos: [],
            OSSelecionadas: [],
            input: false,
            modalIncluir: false,
            modalDetalhar: false,
            modalExcluir: false,
            clearOS: false,
            clearP: false,
            atualizaOS: false,
            tituloClasse: "Pagamentos",
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 10,
            currentPage: 0,
            pageCount: 0,
            column: [
                { heading: "Código", value: "idPagamento" },
                { heading: "Data", value: "dataHora" },
                { heading: "Forma de Pagamento", value: "formaPagamento" },
                { heading: "Desconto", value: "desconto" },
                { heading: "Total", value: "total" },
            ],
        };
        this.handlePageClick = this.handlePageClick.bind(this);
        props.funcNav(true);
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState(
            {
                currentPage: selectedPage,
                offset: offset,
            },
            () => {
                this.loadMoreData();
            }
        );
    };

    loadMoreData() {
        const data = this.state.orgtableData;
        const slice = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
        );

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tableData: slice,
        });
    }

    componentDidMount() {
        this.getData("");
        this.getProdutos("");
        this.getOdensServico("");
    }

    componentDidUpdate() {
        // this.getData("");
        this.atualizaSubTotal();
        if (this.state.atualizaOS) {
            this.getOdensServico("");
        }
        if (this.state.codigoBarras != "") {
            this.getProdutos("");
        }
        // if(this.state.gerar){
        //     comprovantePDF(this.state.comprovante)
        // }
    }

    componentWillUnmount() {
        this.getData("");
    }

    getData(valor) {
        fetch("/api/api/pagamentos/" + valor, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((resposta) => resposta.json())
            .then((dados) => {
                const pagamentos = dados.result;
                pagamentos.map((pg) => {
                    let data = new Date(pg.dataHora.split("T")[0]);
                    pg.dataHora = data.toLocaleDateString("pt-BR", {
                        timeZone: "UTC",
                    });
                });
                var slice = pagamentos.slice(
                    this.state.offset,
                    this.state.offset + this.state.perPage
                );
                this.setState(() => {
                    return {
                        pageCount: Math.ceil(
                            pagamentos.length / this.state.perPage
                        ),
                        orgtableData: pagamentos,
                        tableData: slice,
                    };
                });
            });
    }

    getOdensServico(valor) {
        fetch("/api/api/ordens-servico/" + valor, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((resposta) => resposta.json())
            .then((dados) => {
                const ordensServico = dados.result;
                ordensServico.map((os) => {
                    let data = new Date(os.data.split("T")[0]);
                    os.data = data.toLocaleDateString("pt-BR", {
                        timeZone: "UTC",
                    });
                });
                this.setState(() => {
                    return {
                        ordensServico: ordensServico,
                    };
                });
            });
    }

    getProdutos(valor) {
        fetch("/api/api/produtos/" + valor, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((resposta) => resposta.json())
            .then((dados) => {
                const produtos = dados.result;
                this.setState(() => {
                    return {
                        produtos: produtos,
                    };
                });
            });
    }

    getPagamento(id) {
        fetch("/api/api/pagamento/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((resposta) => resposta.json())
            .then((dados) => {
                const pagamento = dados.result;
                this.setState(() => {
                    return {
                        pagamento: pagamento,
                    };
                });
            });
    }

    incluirPagamento = (pagamento) => {
        fetch("/api/api/pagamento", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(pagamento),
        }).then((resposta) => {
            if (resposta.ok) {
                this.getData("");
            } else {
                alert("Não foi possível incluir o Pagamento!");
            }
        });

        this.fecharModalIncluir();
    };

    deletarPagamento = (id) => {
        fetch("/api/api/pagamento/" + id, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((resposta) => {
            if (resposta.ok) {
                this.getData("");
                this.setState(() => {
                    return {
                        atualizaOS: true,
                    };
                });
            } else {
                alert("Não foi possível deletar o Pagamento.");
            }
        });
        this.fecharModalExcluir();
        this.fecharModalDetalhar();
    };

    fecharModalIncluir = () => {
        this.setState({
            modalIncluir: false,
            gerar: true,
        });
    };

    abrirModalIncluir = () => {
        this.setState({
            modalIncluir: true,
        });
        this.zerarPagamentoState();
    };

    fecharModalExcluir = () => {
        this.setState({
            modalExcluir: false,
        });
    };

    abrirModalExcluir = () => {
        this.setState({
            modalExcluir: true,
        });
    };

    fecharModalDetalhar = () => {
        this.setState({
            modalDetalhar: false,
            input: false,
        });
        this.zerarPagamentoState();
    };

    abrirModalDetalhar = (pagamento) => {
        this.setState({
            modalDetalhar: true,
            idPagamento: pagamento.idPagamento,
            formaPagamento: pagamento.formaPagamento,
            desconto: pagamento.desconto,
            OSSelecionadas: pagamento.ordensServico,
            produtosVendidos: pagamento.vendaDireta,
            comprovante: pagamento,
            input: true,
        });
    };

    atualizaInput = () => {
        this.setState({
            input: false,
        });
    };

    atualizaCamposACProduto = (produto) => {
        const valor = produto.target.value;
        const campos = valor.split(" - ");

        const produtoSelecionado = {
            // idProduto: '',
            codigoBarras: campos[0],
            descricao: campos[1],
            quantidadeVendida: 1,
            precoUnitario: campos[2],
        };

        let inserir = false;

        this.state.produtos.map((p) => {
            if (
                p.codigoBarras === produtoSelecionado.codigoBarras &&
                p.descricao === produtoSelecionado.descricao &&
                p.precoVenda == produtoSelecionado.precoUnitario
            ) {
                // produtoSelecionado.idProduto = p.idProduto;
                inserir = true;
            }
        });

        this.state.produtosVendidos.map((p) => {
            if (p.codigoBarras === produtoSelecionado.codigoBarras) {
                inserir = false;
            }
        });

        if (inserir) {
            this.state.produtosVendidos.push(produtoSelecionado);
        }

        this.setState(() => {
            return {
                // idProduto: produtoSelecionado.idProduto,
                codigoBarras: campos[0],
                descricao: campos[1],
                quantidadeVendida: 1,
                precoVenda: campos[2],
                clearP: false,
                //produtosVendidos: this.state.produtosVendidos.push(produtoSelecionado)
            };
        });
    };
    atualizaCamposACOrdensServico = (ordemServico) => {
        // const valor = (ordemServico.target.value);
        // const campos = valor.split(" - ");

        // let cliente = {nomeCliente: campos[1]}
        // let veiculo = {placaVeiculo: campos[2]}

        // const ordemServicoSelecionada = {
        //     idOrdemServico: campos[0]*1,
        //     cliente: cliente,
        //     veiculo:veiculo,
        //     total: campos[3]*1,
        // }

        // // console.log("entro"+ordemServicoSelecionada.idOrdemServico)

        let inserir = true;

        // this.state.ordensServico.map((os) => {
        //     if(os.idOrdemServico === ordemServicoSelecionada.idOrdemServico &&
        //         os.cliente.nomeCliente === ordemServicoSelecionada.cliente.nomeCliente && os.veiculo.placaVeiculo === ordemServicoSelecionada.veiculo.placaVeiculo
        //         && os.total === ordemServicoSelecionada.total){
        //             console.log("entraste")
        //             inserir = true;
        //     }
        // });

        this.state.OSSelecionadas.map((os) => {
            if (os.idOrdemServico == ordemServico.idOrdemServico) {
                inserir = false;
            }
        });

        if (inserir) {
            this.state.OSSelecionadas.push(ordemServico);
        }

        this.setState(() => {
            return {
                idOrdemServico: ordemServico.idOrdemServico,
                nomeCliente: ordemServico.cliente.nomeCliente,
                placaVeiculo: ordemServico.veiculo.placaVeiculo,
                totalOS: ordemServico.total,
                clearOS: false,
            };
        });
    };

    atualizaFormaPagamento = (e) => {
        this.setState({
            formaPagamento: e.target.value,
        });
    };

    atualizaDesconto = (e) => {
        this.setState({
            desconto: e.target.value,
        });
    };

    incluir = (totalVendido) => {
        let vendaDireta = {
            total: 0,
            produtos: this.state.produtosVendidos,
        };
        const pagamento = {
            idPagamento: "",
            formaPagamento: this.state.formaPagamento,
            desconto: this.state.desconto,
            subtotal: 0,
            total: totalVendido,
            ordensServico: this.state.OSSelecionadas,
            vendaDireta: vendaDireta,
        };
        this.incluirPagamento(pagamento);

        // this.setState(
        //     {
        //         gerar: true
        //     }
        // )
    };

    zerarPagamentoState = () => {
        this.setState({
            idPagamento: 0,
            subtotal: 0,
            total: 0,
            formaPagamento: "",
            desconto: "",
            dataHora: "",
            produtosVendidos: [],
            vendaDireta: [],
            OSSelecionadas: [],
        });
    };

    handleChange = (e) => {
        if (!e.target.value) {
            this.getData("");
            return;
        }
        this.getData(e.target.value);
    };

    excluirProduto = (produto) => {
        var array = this.state.produtosVendidos;
        var index = array.indexOf(produto); // Let's say it's Bob.
        delete array[index];

        this.setState(() => {
            return {
                clearP: true,
            };
        });
    };

    excluirOS = (os) => {
        var array = this.state.OSSelecionadas;
        var index = array.indexOf(os); // Let's say it's Bob.
        delete array[index];

        this.setState(() => {
            return {
                clearOS: true,
            };
        });
    };

    atualizaSubTotal = () => {
        this.state.produtosVendidos.map((p) => {
            if (p.quantidadeVendida != null && p.precoUnitario != null) {
                p.precoTotal = p.quantidadeVendida * p.precoUnitario;
                p.precoTotal = p.precoTotal.toFixed(2);
            }
        });
    };

    render() {
        return (
            <div className="container">
                <Header
                    state={this.state}
                    handleChange={this.handleChange}
                    abrirModalIncluir={this.abrirModalIncluir}
                />
                <Listagem
                    state={this.state}
                    abrirModalDetalhar={this.abrirModalDetalhar}
                />
                <ModalIncluir
                    state={this.state}
                    fecharModalIncluir={this.fecharModalIncluir}
                    incluir={this.incluir}
                    atualizaCamposACProduto={this.atualizaCamposACProduto}
                    excluirProduto={this.excluirProduto}
                    atualizaSubTotal={this.atualizaSubTotal}
                    atualizaCamposACOrdensServico={
                        this.atualizaCamposACOrdensServico
                    }
                    excluirOS={this.excluirOS}
                    atualizaFormaPagamento={this.atualizaFormaPagamento}
                    atualizaDesconto={this.atualizaDesconto}
                />
                <ModalDetalhar
                    state={this.state}
                    fecharModalDetalhar={this.fecharModalDetalhar}
                    abrirModalExcluir={this.abrirModalExcluir}
                    atualizaInput={this.atualizaInput}
                    atualizaCamposACProduto={this.atualizaCamposACProduto}
                    excluirProduto={this.excluirProduto}
                    atualizaSubTotal={this.atualizaSubTotal}
                    atualizaCamposACOrdensServico={
                        this.atualizaCamposACOrdensServico
                    }
                    excluirOS={this.excluirOS}
                    atualizaFormaPagamento={this.atualizaFormaPagamento}
                    atualizaDesconto={this.atualizaDesconto}
                />
                <ModalExcluir
                    state={this.state}
                    fecharModalExcluir={this.fecharModalExcluir}
                    deletarPagamento={this.deletarPagamento}
                />
                <Paginator
                    state={this.state}
                    handlePageClick={this.handlePageClick}
                />
            </div>
        );
    }
}

export default Pagamentos;
