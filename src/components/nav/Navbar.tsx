import Link from 'next/link'
import './navbar.css'
import Logo from './../../../public/assets/img/logo.png'


export default function Navbar(){


    return(


        <>
            <div className='navbarContainer'>
                <div className='logo'>
                    <img src={Logo.src} alt="Logo" style={{ width: 200, height: 180 }} />
                </div>

          

                <div className='navbarSettings'>
                    <ul>
                       <Link href="/">Home</Link>
                       <Link href="/">Collection</Link>
                       <Link href="/">Shop</Link>
                       <Link href="/">Attrapez les tous</Link>
                       <Link href="/">Login</Link>
                       <Link href="/">CART</Link>
                       <Link href="/">Settings</Link>
                       

                    </ul>
                    
                </div>

            </div>
        
        </>
    )
}