import React, {useState, useContext} from "react";
import "./styles.css";
import {Form,Col,Row,Button} from 'react-bootstrap';
import logo from '../../static/automecIcon.png'

import { AuthContext } from "../../contexts/auth";

const LoginPage = (props) => {

    const { login } = useContext (AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log("submit", {email, password});

        login(email, password);
    }

    props.funcNav(false);

    return (
            <div id="login">

                
                <Form onSubmit={handleSubmit} className='cardForm' >
                    
                    <div className="logoLogin"><img alt='logo' src={logo}/> AUTOMEC</div>

                    <Row className="mb-3" bsPrefix="inputLogin">
                        <Col controlId="formGridNome">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control placeholder="Email" type="email" name="email" id="email"  value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Col>
                    </Row>

                    <Row className="mb-3" bsPrefix="inputLogin">
                        <Col controlId="formGridCpfCnpj">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control placeholder="Senha" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </Col>
                    </Row>
                    
                    <Row className="mb-3">
                        <Button type="submit" className="btnOk">Entrar</Button>{' '}
                    </Row>
                </Form>
            </div>
    )
}

export default LoginPage;