import React from 'react';
import Logo from './Logo';
import styles from './Navbar.module.css';
import NavbarMenu from './NavbarMenu';

const Navbar = () => {
    return (
        <nav className={styles['navbar']}>
            <Logo />
            <NavbarMenu />
        </nav>
    );
}

export default Navbar;