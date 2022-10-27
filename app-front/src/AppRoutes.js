import Clientes from './components/Clientes/Clientes'
import Veiculos from './components/Veiculos/Veiculos'
import Produtos from './components/Produtos/Produtos'
import Servicos from './components/Servicos/Servicos'
import Funcionarios from './components/Funcionarios/Funcionarios';
import OrdensServico from './components/OrdensServico/OrdensServico';
import Pagamentos from './components/Pagamentos/Pagamentos';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'
import Relatorio from './components/Relatorio/Relatorio';

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import React, {useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navs from './components/nav/Nav'
import Footer from './components/footer/Footer'
import './App.css';

import { AuthProvider, AuthContext } from './contexts/auth'

const AppRoutes = () => {

  const [showNav, setShowNav] = useState(false);

  const Private = ({children}) => {
    const { authenticated, loading } = useContext(AuthContext);

    if(loading){
      return <div className='loading'>Carregando...</div>
    }

    if(!authenticated){
      return <Navigate to={'/login'} />;
    }
    return children;
  }
  
  return (
    <>
      <Router>

        <AuthProvider>
        <body>
          {  showNav && <Navs /> } 
          <Routes>
            <Route exact path='/login' element={<LoginPage funcNav={setShowNav} />}/>
            <Route exact path='/' element={<Private><HomePage funcNav={setShowNav} /></Private>}/>
            <Route exact path='/clientes' element={<Private><Clientes funcNav={setShowNav} /></Private>}/>
            <Route exact path='/veiculos' element={<Private><Veiculos funcNav={setShowNav} /></Private>}/>
            <Route exact path='/produtos' element={<Private><Produtos funcNav={setShowNav} /></Private>}/>
            <Route exact path='/servicos' element={<Private><Servicos funcNav={setShowNav} /></Private>}/>
            <Route exact path='/funcionarios' element={<Private><Funcionarios funcNav={setShowNav} /></Private>}/>
            <Route exact path='/ordens-servico' element={<Private><OrdensServico funcNav={setShowNav} /></Private>}/>
            <Route exact path='/pagamentos' element={<Private><Pagamentos funcNav={setShowNav} /></Private>}/>
            <Route exact path='/relatorios' element={<Private><Relatorio funcNav={setShowNav} /></Private>}/>
          </Routes>
          </body>
          { showNav && <Footer/>} 
        </AuthProvider>

      </Router>
    </>
  );
}

export default AppRoutes;
