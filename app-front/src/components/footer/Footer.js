import logo from '../../static/automecIcon.png'
import './style.css'

function Footer (){
    return(
        <>  
            <footer>
                <p className='logoFooter'><img alt='logo' src={logo}/> AUTOMEC</p>
                <p className="copyright">
                    Automec © 2022
                </p>
            </footer>
        </>
    )
}

export default Footer;