import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'
import logo from '../../static/automecIcon.png'
import './style.css'


function Navs (){
    return(
        <>
        <Navbar className='m-0 p-0' >
            <Container className='m-0 p-0'>
                <Navbar.Brand bsPrefix='logo' as={Link} to="/"> <img src={logo}/> AUTOMEC</Navbar.Brand>
                <Navbar.Toggle />
            </Container>
            
            <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Link as={Link} to="/">Admin</Link>
                    </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
        </>
    )
}

export default Navs;
