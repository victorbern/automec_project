import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';

import './style.css'
import clientes from '../../static/clientes.png'
import veiculos from '../../static/veiculos.png'
import produtos from '../../static/produtos.png'
import funcionarios from '../../static/funcionarios.png'
import servicos from '../../static/servicos.png'
import os from '../../static/os.png'
import vd from '../../static/vd.png'
import relatorios from '../../static/relatorios.png'
import pagamento from '../../static/pagamento.png'

function Home(props){
    
    props.funcNav(true);
    return(
        <>
        <div class="card-deck">

                <Card class="card" as={Link} to="/clientes">
                    <div class="card-body">
                        <img alt='clientes' src={clientes}/>
                    </div>
                    <div class="card-footer">
                            Clientes
                    </div>
                </Card>

                <Card class="card" as={Link} to="/veiculos">
                    <div class="card-body">
                        <img alt='veiculos' src={veiculos}/>
                    </div>
                    <div class="card-footer">
                            Veículos
                    </div>
                </Card>

                <Card class="card" as={Link} to="/produtos">
                    <div class="card-body">
                        <img alt='produtos' src={produtos}/>
                    </div>
                    <div class="card-footer">
                            Produtos
                    </div>
                </Card>

            </div>

            <div class="card-deck">

                <Card class="card" as={Link} to="/funcionarios">
                    <div class="card-body">
                        <img alt='funcionarios' src={funcionarios}/>
                    </div>
                    <div class="card-footer">
                            Funcionários
                    </div>
                </Card>

                <Card class="card" as={Link} to="/servicos">
                    <div class="card-body">
                        <img alt='servicos' src={servicos}/>
                    </div>
                    <div class="card-footer">
                            Serviços
                    </div>
                </Card>

                <Card class="card" as={Link} to="/ordens-servico">
                    <div class="card-body">
                        <img alt='os' src={os}/>
                    </div>
                    <div class="card-footer">
                            Ordens de Serviços
                    </div>
                </Card>

                </div>

                <div class="card-deck">

                    {/* {   <Card class="card">
                        <div class="card-body">
                            <img alt='vd' src={vd}/>
                        </div>
                        <div class="card-footer">
                                Venda Direta
                        </div>
                    </Card> */}
                
                    <Card class="card">
                        <div class="card-body">
                            <img alt='relatorios' src={relatorios}/>
                        </div>
                        <div class="card-footer">
                                Relatórios
                        </div>
                    </Card>

                    <Card class="card" as={Link} to="/pagamentos">
                        <div class="card-body">
                            <img alt='pagamento' src={pagamento}/>
                        </div>
                        <div class="card-footer">
                                Pagamento
                        </div>
                    </Card>

                </div>
        
        </>
    )
}

export default Home;