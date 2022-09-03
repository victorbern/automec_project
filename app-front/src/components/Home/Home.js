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

function Home(){
    return(
        <>
        <div class="card-deck">

                <Card class="card" as={Link} to="/clientes">
                    <div class="card-body">
                        <img src={clientes}/>
                    </div>
                    <div class="card-footer">
                            Clientes
                    </div>
                </Card>

                <Card class="card">
                    <div class="card-body">
                        <img src={veiculos}/>
                    </div>
                    <div class="card-footer">
                            Veículos
                    </div>
                </Card>

                <Card class="card">
                    <div class="card-body">
                        <img src={produtos}/>
                    </div>
                    <div class="card-footer">
                            Produtos
                    </div>
                </Card>

            </div>

            <div class="card-deck">

                <Card class="card">
                    <div class="card-body">
                        <img src={funcionarios}/>
                    </div>
                    <div class="card-footer">
                            Funcionários
                    </div>
                </Card>

                <Card class="card">
                    <div class="card-body">
                        <img src={servicos}/>
                    </div>
                    <div class="card-footer">
                            Serviços
                    </div>
                </Card>

                <Card class="card">
                    <div class="card-body">
                        <img src={os}/>
                    </div>
                    <div class="card-footer">
                            Ordens de Serviços
                    </div>
                </Card>

                </div>

                <div class="card-deck">

                    <Card class="card">
                        <div class="card-body">
                            <img src={vd}/>
                        </div>
                        <div class="card-footer">
                                Venda Direta
                        </div>
                    </Card>

                    <Card class="card">
                        <div class="card-body">
                            <img src={relatorios}/>
                        </div>
                        <div class="card-footer">
                                Relatórios
                        </div>
                    </Card>

                    <Card class="card">
                        <div class="card-body">
                            <img src={pagamento}/>
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