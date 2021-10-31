import React ,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import Buttons from './Buttons';
import { useAuth } from 'F:/React-Random/travel-web/src/contexts/AuthContexts.js'
import './Navbar.css';


export const Navbar = () => {
    const { currentUser } = useAuth();
    const [ click , setClick ] = useState(false);  
    const [ isbutton , setIsButton ] = useState(true); 

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    // show button depend on Screen-size 
    const showButton = () => {
        if(window.innerWidth <= 960) setIsButton(false);
        else setIsButton(true);
    };

    // whenever resize screen -> show button
    {
        window.addEventListener('resize', showButton); 
        useEffect(() => { showButton() } , []);
    }


    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        TRAVEL <i className="fab fa-suse"></i>
                    </Link>

                    {/* menu-icon only display when screen <= 960 , fullscreen display:'none' */}
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>

                    {/* default: nav menu , switch/active menu base on menu-icon*/}
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                                Products
                            </Link>
                        </li>
                         <li className='nav-item'>
                            <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                                {currentUser ? 'Profile' : 'Login' }
                            </Link>
                        </li>
                        <li>
                            <Link to='/register' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Register
                            </Link>
                        </li>
                    </ul>
                    { isbutton && <Buttons buttonStyle='btn--outline' to='/register'>REGISTER</Buttons> }
                </div>
            </nav>
        </>
    )
}
