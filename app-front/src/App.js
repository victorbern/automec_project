import './App.css';
import Home from './components/Home/Home'
import Clientes from './components/Clientes/Clientes'
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom'
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navs from './components/nav/Nav'
import Footer from './components/footer/Footer'


function App() {
  
  return (
    <>
      <BrowserRouter>
      <body>
        <Navs></Navs>

        <div className='container'>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/clientes' element={<Clientes></Clientes>}></Route>
        </Routes>
        </div>
      </body>
      <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
