import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {Link} from 'react-router-dom'
import usuario from '../../static/user.png'
import logo from '../../static/automecIcon.png'

import './style.css'

import React, {useContext} from "react";

import { AuthContext } from "../../contexts/auth";

function Navs (){
    const { logout, user} = useContext(AuthContext); 

    const handleLogout = () => {
        logout();
    }
    return(
        <>
        <Navbar className='m-0 p-0' >
            <Container className='m-0 p-0'>
                <Navbar.Brand bsPrefix='logo' as={Link} to="/"> <img alt='logo' src={logo}/> AUTOMEC</Navbar.Brand>
                <Navbar.Toggle />
            </Container>
            
            <Container className='me-5 p-0'>
            <Navbar.Collapse className="justify-content-end" >
                    <img alt='userLogo' className='userLogo'src={usuario} />
                    <Navbar.Text >
                    <NavDropdown title={String(user.name)} id="collasible-nav-dropdown" bsPrefix='userNav'>
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    </Navbar.Text>
            </Navbar.Collapse>
            </Container>

        </Navbar>
        </>
    )
}

export default Navs;
