import React from "react";
import {Form, Button} from 'react-bootstrap';

export default function Header(props){
    return(
        <>
        <div id="titulo"className="titulo">
            <h2>{props.state.tituloClasse}</h2>
            <div class="line"></div>
        </div>

        <div className="pesquisar">
            <Form.Control className="input-pesquisar" placeholder="Pesquisar" onChange={props.handleChange}/>
        </div>

        <Button className="btn-incluir" onClick={props.abrirModalIncluir}>
            Incluir
        </Button>
        </>
    )
}