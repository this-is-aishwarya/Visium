import "./Navbar.css"

const Navbar = () => {
    return (
        <header className='navbar'>
            <div className='navbar__title navbar__item'>Visium</div>
            <div className='navbar__item'>Profile</div>
            <div className='navbar__item'>Logout</div>      
        </header>
    )
}

export default Navbar;